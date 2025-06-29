import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "./actions/authAction";

const protectedRoutes = ["/dashboard", "/all-user", "/trips"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = request.cookies.get("travel_kro")?.value;
  const isClientVisitingProtectedPath = protectedRoutes.some(
    (item) => item === url.pathname
  );
  // If not authenticated and accessing a protected route, redirect to /sign-in
  if (!token && isClientVisitingProtectedPath) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
  //having token then checking role and redirecting to respective path.
  if (token && url.pathname.startsWith("/sign-in")) {
    console.log("logpout", token, url.pathname);
    const res = await getUserRole();
    if (res) {
      url.pathname = res.role === "user" ? "/" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/all-user", "/trips", "/sign-in", "/"],
};
