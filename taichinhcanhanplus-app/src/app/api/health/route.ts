import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/health",
    checkedAt: new Date().toISOString(),
    app: "taichinhcanhanplus-app",
  });
}
