import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function getPrivateKey() {
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getRequiredAdminConfig() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = getPrivateKey();
  const missing = [
    ["FIREBASE_ADMIN_PROJECT_ID", projectId],
    ["FIREBASE_ADMIN_CLIENT_EMAIL", clientEmail],
    ["FIREBASE_ADMIN_PRIVATE_KEY", privateKey],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Firebase Admin is not configured. Missing: ${missing.join(", ")}`);
  }

  return {
    projectId: projectId as string,
    clientEmail: clientEmail as string,
    privateKey: privateKey as string,
  };
}

function getAdminApp(): App {
  const existingApp = getApps().at(0);
  if (existingApp) return existingApp;

  const { projectId, clientEmail, privateKey } = getRequiredAdminConfig();

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getFirebaseAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}
