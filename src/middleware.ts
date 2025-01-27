import { USER_TYPE, TOKEN_KEY, LEADER_ID } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { APIRoutes, AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';

export async function middleware(request: NextRequest) {
  const routeList = [...Object.values(ProtectedRoutes), ...Object.values(EmployeeProtectedRoutes)]
  let pathname = request.nextUrl.pathname

  const userDetails = request.cookies.getAll();

  const token = userDetails?.find((x: any) => x.name === TOKEN_KEY)?.value || '';
  const userType = userDetails?.find((x: any) => x.name === USER_TYPE)?.value || '';

  const searchParams = request.nextUrl.searchParams;

  if (!token && (routeList.includes(pathname) || routeList.includes(pathname))) {
    return NextResponse.redirect(new URL(AuthRoutes.mlogin, request.url));
  }

  const isNotification = searchParams.get('isnotification') || "";

  if (isNotification && token) {
    const notificationId = searchParams.get('notificationid') || "";
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


