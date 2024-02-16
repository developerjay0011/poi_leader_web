import { TOKEN_KEY } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { AuthRoutes, ProtectedRoutes } from './constants/routes';

export function middleware(request: NextRequest) {
  let token = request.cookies.get(TOKEN_KEY)?.value || '';
  let pathname = request.nextUrl.pathname;

  const routeList = Object.values(ProtectedRoutes);
  const authRouteList = Object.values(AuthRoutes);

  if (!token && routeList.includes(pathname)) {
    const response = NextResponse.redirect(new URL(`/`, request.url));
    return response;
  }
  if(token && authRouteList.includes(pathname)) {
    const response = NextResponse.redirect(new URL(ProtectedRoutes.user, request.url));
    return response;
  }
}
