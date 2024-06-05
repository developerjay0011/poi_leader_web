
import { USER_TYPE, USER_VERIFY, TOKEN_KEY, TAB_ACCESS, LEADER_ID } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { APIRoutes, AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';

export async function middleware(request: NextRequest) {
  let user_types = request.cookies.getAll()
  let token = user_types?.find((x: any) => x.name === TOKEN_KEY)?.value || '';
  let isuserverify = user_types?.find((x: any) => x.name === USER_VERIFY)?.value || '';
  let user_type = user_types?.find((x: any) => x.name === USER_TYPE)?.value || '';
  let tabs = request.cookies.get(TAB_ACCESS)?.value ? request.cookies.get(TAB_ACCESS)?.value : [] as any
  let pathname = request.nextUrl.pathname
  const routeList = Object.values(ProtectedRoutes);
  const employeerouteList = Object.values(EmployeeProtectedRoutes);
  const authRouteList = Object.values(AuthRoutes);
  const searchParams = request.nextUrl.searchParams
  const isnotification = searchParams.get('isnotification') || ""
  const notificationid = searchParams.get('notificationid') || ""
  if (isuserverify != "true" && !token && (routeList.includes(pathname) || employeerouteList.includes(pathname))) {
    const response = NextResponse.redirect(new URL(AuthRoutes.mlogin, request.url));
    return response;
  }
  if (isnotification && user_type) {
    const leaderid = request.cookies.get(LEADER_ID)?.value || ''
    if (leaderid && isnotification == "unread" && notificationid) { ReadLeaderNotification(token, notificationid, leaderid) }
    pathname = user_type === "leader" ? pathname : setRoute(pathname, isnotification, user_type);
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname; // Update pathname only
    newUrl.searchParams.set('notification', isnotification);
    newUrl.searchParams.delete('isnotification');
    return NextResponse.redirect(newUrl);
  }
  if (isuserverify == "true" && token && (authRouteList.includes(pathname) || pathname.includes('/employee-access') || (tabs.includes(pathname) && pathname != '/user' && pathname != '/user/profile')) && user_type == "leader") {
    const response = NextResponse.redirect(new URL(ProtectedRoutes.user, request.url));
    return response;
  }
  if (isuserverify == "true" && token && (authRouteList.includes(pathname) || pathname.includes('/user') || (tabs.includes(pathname) && pathname != '/employee-access')) && user_type == "employee") {
    const response = NextResponse.redirect(new URL(EmployeeProtectedRoutes.employee, request.url));
    return response;
  }
}


const setRoute = (pathname: any, isnotification: any, user_type: any) => {
  let path = pathname;
  if (isnotification && user_type !== "leader") {
    path = pathname.replace(/\/user/g, '/employee-access');
  }
  return path;
}


const ReadLeaderNotification = (token: any, notificationid: any, leaderid: any) => {
  try {
    var data = { "id": notificationid, "leaderid": leaderid }
    fetch(process.env.NEXT_PUBLIC_BASE_URL + APIRoutes.ReadLeaderNotification, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token && `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.error(error);
  }
}