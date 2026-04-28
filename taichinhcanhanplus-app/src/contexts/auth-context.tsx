"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ensureCurrentUserWorkspace } from "@/lib/api/workspace";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

interface AuthContextValue {
  user: User | null;
  isConfigured: boolean;
  isLoading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, displayName?: string): Promise<void>;
  logOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isConfigured = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(isConfigured);

  useEffect(() => {
    if (!isConfigured) {
      return undefined;
    }

    const prepareUserWorkspace = async (nextUser: User) => {
      await ensureCurrentUserWorkspace({
        id: nextUser.uid,
        email: nextUser.email ?? "",
        displayName: nextUser.displayName ?? nextUser.email?.split("@").at(0) ?? "Người dùng",
      });
    };

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setIsLoading(false);
        return;
      }

      void prepareUserWorkspace(nextUser).finally(() => {
        setIsLoading(false);
      });
    });

    return unsubscribe;
  }, [isConfigured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isConfigured,
      isLoading,
      async signIn(email, password) {
        const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
        await ensureCurrentUserWorkspace({
          id: credential.user.uid,
          email: credential.user.email ?? email,
          displayName: credential.user.displayName ?? email.split("@").at(0) ?? "Người dùng",
        });
      },
      async signUp(email, password, displayName) {
        const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
        if (displayName) {
          await updateProfile(credential.user, { displayName });
        }
        await ensureCurrentUserWorkspace({
          id: credential.user.uid,
          email: credential.user.email ?? email,
          displayName: displayName ?? email.split("@").at(0) ?? "Người dùng",
        });
      },
      async logOut() {
        await signOut(getFirebaseAuth());
      },
    }),
    [isConfigured, isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
