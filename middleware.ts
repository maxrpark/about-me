import withAuth from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  //
  function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // This logic is only applied to /admin
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token && token.email === process.env.ADMINISTRATOR) {
          return true;
        }
        return false;
      },
    },
  }
);
export const config = {
  matcher: ["/admin"],
};
