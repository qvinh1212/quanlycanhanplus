import { NextResponse } from "next/server";

import { getFirebaseAdminAuth, getFirebaseAdminDb } from "@/lib/firebase/admin";

function maskEmail(value?: string) {
  if (!value) return null;
  const [name, domain] = value.split("@");
  return `${name.slice(0, 6)}...@${domain}`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown Firebase Admin error";
}

export async function GET(request: Request) {
  const debugToken = process.env.FIREBASE_DEBUG_TOKEN;
  const requestToken = new URL(request.url).searchParams.get("token");

  if (!debugToken) {
    return NextResponse.json(
      { ok: false, code: "DEBUG_TOKEN_NOT_CONFIGURED", message: "FIREBASE_DEBUG_TOKEN is missing" },
      { status: 401 },
    );
  }

  if (requestToken !== debugToken) {
    return NextResponse.json(
      { ok: false, code: "DEBUG_TOKEN_INVALID", message: "Invalid debug token" },
      { status: 401 },
    );
  }

  const diagnostics = {
    env: {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? null,
      hasClientEmail: Boolean(process.env.FIREBASE_ADMIN_CLIENT_EMAIL),
      clientEmailPreview: maskEmail(process.env.FIREBASE_ADMIN_CLIENT_EMAIL),
      hasPrivateKey: Boolean(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
      privateKeyStartsCorrectly: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.startsWith("-----BEGIN PRIVATE KEY-----") ?? false,
      privateKeyContainsEscapedNewlines: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.includes("\\n") ?? false,
    },
    auth: { ok: false, message: null as string | null },
    firestore: { ok: false, message: null as string | null },
  };

  try {
    await getFirebaseAdminAuth().listUsers(1);
    diagnostics.auth.ok = true;
  } catch (error) {
    diagnostics.auth.message = getErrorMessage(error);
  }

  try {
    await getFirebaseAdminDb().collection("__diagnostics").doc("admin-sdk").set(
      {
        checkedAt: new Date().toISOString(),
      },
      { merge: true },
    );
    diagnostics.firestore.ok = true;
  } catch (error) {
    diagnostics.firestore.message = getErrorMessage(error);
  }

  return NextResponse.json({ ok: diagnostics.auth.ok && diagnostics.firestore.ok, diagnostics });
}
