import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req: NextRequest) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/gastos/:path*", "/chat/:path*", "/perfil/:path*", "/api/gastos/:path*", "/api/salario/:path*", "/api/chat/:path*", "/api/resumen/:path*"],
};
