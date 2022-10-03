import withAuth from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      console.log("hello");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token && token.email === process.env.ADMINISTRATOR) {
          console.log(token);

          return true;
        }
        return true;
      },
    },
  }
);
export const config = {
  matcher: ["/admin"],
};
