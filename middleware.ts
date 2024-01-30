import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

// if user is signed in and the current path is / redirect the user to /account
  if (user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/Account', request.url))
  }

  if (user && request.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/Account', request.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  

  return response
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - / (root route)
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!_next/static|_next/image|favicon.ico|^/$).*)',
    ],
  }