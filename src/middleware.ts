import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/actions/authServer";

const protectedRoutes = ["/dashboard", "/all-user", "/trips"];
// Middleware function
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Example: Check for a cookie named `auth-token`
  const token = request.cookies.get("travel_kro")?.value;
  const isClientVisitingProtectedPath = protectedRoutes.some(
    (item) => item === url.pathname
  );
  // If not authenticated and accessing a protected route, redirect to /sign-in
  if (!token && isClientVisitingProtectedPath) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
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
