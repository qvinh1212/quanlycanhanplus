import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

function getPrivateKey() {
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getAdminApp(): App {
  const existingApp = getApps().at(0);
  if (existingApp) return existingApp;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    });
  }

  if (!projectId) {
    throw new Error("Firebase Admin is not configured. Add NEXT_PUBLIC_FIREBASE_PROJECT_ID to .env.local.");
  }

  return initializeApp({ projectId });
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
