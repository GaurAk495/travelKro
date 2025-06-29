import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("travel_kro");
  return NextResponse.redirect(new URL("/sign-in", req.url));
}
