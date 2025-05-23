import { auth } from "@/auth";
import { isProtectedRoute, paths } from "./routes/path";

export default auth((req) => {
  if (!req.auth && isProtectedRoute(req.nextUrl.pathname)) {
    const newUrl = new URL(paths.sign_in.root, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
