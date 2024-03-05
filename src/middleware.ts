import { TOKEN_KEY, USER_TYPE, USER_VERIFY } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';

export function middleware(request: NextRequest) {
  let token = request.cookies.get(TOKEN_KEY)?.value || '';
  let isuserverify = request.cookies.get(USER_VERIFY)?.value || '';
  let user_type = request.cookies.get(USER_TYPE)?.value || '';
  let pathname = request.nextUrl.pathname;


  const routeList = Object.values(ProtectedRoutes);
  const authRouteList = Object.values(AuthRoutes);

  if (isuserverify != "true" && !token && routeList.includes(pathname)) {
    const response = NextResponse.redirect(new URL(`/`, request.url));
    return response;
  }
  if (isuserverify == "true" && token && authRouteList.includes(pathname)) {
    // if (user_type != "leader") {
    //   const response = NextResponse.redirect(new URL(EmployeeProtectedRoutes.user, request.url));
    //   return response;
    // } else {
    const response = NextResponse.redirect(new URL(ProtectedRoutes.user, request.url));
    return response;
    // }
  }
}
