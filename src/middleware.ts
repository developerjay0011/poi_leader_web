import { USER_TYPE, USER_VERIFY, TOKEN_KEY, TAB_ACCESS, LEADER_ID } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { APIRoutes, AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';

export async function middleware(request: NextRequest) {
  const userTypes = request.cookies.getAll();
  const token = userTypes?.find((x: any) => x.name === TOKEN_KEY)?.value || '';
  const isUserVerify = userTypes?.find((x: any) => x.name === USER_VERIFY)?.value || '';
  const userType = userTypes?.find((x: any) => x.name === USER_TYPE)?.value || '';
  const tabs = request.cookies.get(TAB_ACCESS)?.value ? request.cookies.get(TAB_ACCESS)?.value : [] as any
  let pathname = request.nextUrl.pathname as string
  const routeList = Object.values(ProtectedRoutes);
  const employeeRouteList = Object.values(EmployeeProtectedRoutes);
  const authRouteList = Object.values(AuthRoutes);
  const searchParams = request.nextUrl.searchParams;
  const isNotification = searchParams.get('isnotification') || "";
  const notificationId = searchParams.get('notificationid') || "";

  // Redirect unverified users to login page if they try to access protected routes
  if (isUserVerify !== "true" && !token && (routeList.includes(pathname) || employeeRouteList.includes(pathname))) {
    return NextResponse.redirect(new URL(AuthRoutes.mlogin, request.url));
  }

  // Handle notification logic
  if (isNotification && userType) {
    const leaderId = request.cookies.get(LEADER_ID)?.value || '';
    if (leaderId && isNotification === "unread" && notificationId) {
      await readLeaderNotification(token, notificationId, leaderId);
    }
    pathname = userType === "leader" ? pathname : setRoute(pathname, isNotification, userType);
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname;
    newUrl.searchParams.set('notification', isNotification);
    newUrl.searchParams.delete('isnotification');
    return NextResponse.redirect(newUrl);
  }

  // Redirect verified users based on their role and accessed routes
  if (isUserVerify === "true" && token) {
    if ((authRouteList.includes(pathname) || pathname.includes('/employee-access') || (tabs.includes(pathname) && pathname !== '/user' && pathname !== '/user/profile')) && userType === "leader") {
      return NextResponse.redirect(new URL(ProtectedRoutes.user, request.url));
    }
    if ((authRouteList.includes(pathname) || pathname.includes('/user') || (tabs.includes(pathname) && pathname !== '/employee-access')) && userType === "employee") {
      return NextResponse.redirect(new URL(EmployeeProtectedRoutes.employee, request.url));
    }
  }
}

const setRoute = (pathname: string, isNotification: string, userType: string): string => {
  if (isNotification && userType !== "leader") {
    return pathname.replace(/\/user/g, '/employee-access');
  }
  return pathname;
}

const readLeaderNotification = async (token: string, notificationId: string, leaderId: string) => {
  try {
    const data = { id: notificationId, leaderid: leaderId };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${APIRoutes.ReadLeaderNotification}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
}



