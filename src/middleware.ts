import { USER_TYPE, TOKEN_KEY, LEADER_ID } from '@/constants/common';
import { NextRequest, NextResponse } from 'next/server';
import { APIRoutes, AuthRoutes, EmployeeProtectedRoutes, ProtectedRoutes } from './constants/routes';

// Define protected routes
const PROTECTED_ROUTES = [...Object.values(ProtectedRoutes), ...Object.values(EmployeeProtectedRoutes)]

// Define public routes that don't need authentication
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/auth',
  '/api',
  '/_next',
  '/static',
  '/images',
  '/favicon.ico'
]

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

    // Skip middleware for public routes
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    const userDetails = request.cookies.getAll()
    const token = userDetails?.find((x) => x.name === TOKEN_KEY)?.value
    const userType = userDetails?.find((x) => x.name === USER_TYPE)?.value || ''
    const searchParams = request.nextUrl.searchParams

    // Check authentication for protected routes
    if (!token && PROTECTED_ROUTES.includes(pathname)) {
      console.log('Authentication required')
      return NextResponse.redirect(new URL(AuthRoutes.mlogin, request.url))
    }

    // Handle notifications
    const isNotification = searchParams.get('isnotification')
    if (isNotification && token) {
      return handleNotification(request, token, userType, pathname, isNotification)
    }

    // Default route for authenticated users at root
    if (token && pathname === '/' && userType === "leader") {
      if (userType === "leader") {
        return NextResponse.redirect(new URL(ProtectedRoutes.user, request.url))
      }
      return NextResponse.redirect(new URL(EmployeeProtectedRoutes.employee, request.url))
    }

    // Allow all other requests to proceed
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware Error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

async function handleNotification(
  request: NextRequest,
  token: string,
  userType: string,
  pathname: string,
  isNotification: string
) {
  const notificationId = request.nextUrl.searchParams.get('notificationid')
  const leaderId = request.cookies.get(LEADER_ID)?.value

  // Mark notification as read if needed
  if (leaderId && isNotification === "unread" && notificationId) {
    await readLeaderNotification(token, notificationId, leaderId)
  }

  // Update pathname based on user type
  const updatedPathname = userType === "leader" ? pathname : setRoute(pathname, isNotification, userType)

  // Create new URL with updated parameters
  const newUrl = new URL(request.url)
  newUrl.pathname = updatedPathname
  newUrl.searchParams.set('notification', isNotification)
  newUrl.searchParams.delete('isnotification')

  return NextResponse.redirect(newUrl)
}

function setRoute(pathname: string, isNotification: string, userType: string): string {
  if (isNotification && userType !== "leader") {
    return pathname.replace(/\/user/g, '/employee-access')
  }
  return pathname
}

async function readLeaderNotification(token: string, notificationId: string, leaderId: string) {
  try {
    const data = { id: notificationId, leaderid: leaderId }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${APIRoutes.ReadLeaderNotification}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to mark notification as read')
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Match all routes except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
