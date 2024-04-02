
import { USER_TYPE, USER_VERIFY, TOKEN_KEY, EMPLOYEE_ID, TAB_ACCESS, DEFAULT_CONTENT_TYPE } from '@/constants/common';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { APIRoutes, AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';
import { fetchEmployeeAccessTabs } from './redux_store/accesstab/tabApi';
import { accessAction } from './redux_store/accesstab/tabSlice';
import axios from 'axios';
import { insertVariables } from './config/insert-variables';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  let user_types = request.cookies.getAll()
  let token = user_types?.find((x: any) => x.name === TOKEN_KEY)?.value || '';
  let isuserverify = user_types?.find((x: any) => x.name === USER_VERIFY)?.value || '';
  let user_type = user_types?.find((x: any) => x.name === USER_TYPE)?.value || '';
  let tabs = request.cookies.get(TAB_ACCESS)?.value ? request.cookies.get(TAB_ACCESS)?.value : [] as any

  let pathname = request.nextUrl.pathname;
  const routeList = Object.values(ProtectedRoutes);
  const employeerouteList = Object.values(EmployeeProtectedRoutes);
  const authRouteList = Object.values(AuthRoutes);

  if (isuserverify != "true" && !token && ((routeList.includes(pathname) && user_type == "leader") || (employeerouteList.includes(pathname) && user_type == "employee"))) {
    const response = NextResponse.redirect(new URL(`/`, request.url));
    return response;
  }
  if (isuserverify == "true" && token && (authRouteList.includes(pathname) || pathname.includes('/employee-access') || (tabs.includes(pathname) && pathname != '/user')) && user_type == "leader") {
    const response = NextResponse.redirect(new URL(ProtectedRoutes.user, request.url));
    return response;
  }
  if (isuserverify == "true" && token && (authRouteList.includes(pathname) || pathname.includes('/user') || (tabs.includes(pathname) && pathname != '/employee-access')) && user_type == "employee") {
    const response = NextResponse.redirect(new URL(EmployeeProtectedRoutes.employee, request.url));
    return response;
  }
}
