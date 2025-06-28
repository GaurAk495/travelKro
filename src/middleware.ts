import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/actions/authServer";

// Middleware function
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log(request);
  // Example: Check for a cookie named `auth-token`
  const token = request.cookies.get("a_session_685c299d0028711ee1c3")?.value;

  // If not authenticated and accessing a protected route, redirect to /sign-in
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
  console.log(url, token);
  if (token && url.pathname.startsWith("/sign-in")) {
    const res = await getUser();
    if (res) {
      url.pathname = res.role == "user" ? "/" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Otherwise, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};
