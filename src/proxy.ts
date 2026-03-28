import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

  const { pathname } = request.nextUrl


  const token = await getToken({ req: request })
// check if the request is for an auth page
  // using includes is more flexible and easier to maintain if we add more auth pages in the future

  const isAuthPage = ['/login', '/register', "/forget-pass"].includes(pathname);
  // return boolean


  // const isAuthPage = pathname=='/login' || pathname=='/register' ||   ;

  
// if user is authenticated and on auth page, redirect to products page
if (token && isAuthPage)
  return NextResponse.redirect(new URL('/products', request.url))


  // if user is not authenticated and not on auth page, redirect to login page
  if (!token && !isAuthPage)
    return NextResponse.redirect(new URL('/login', request.url))


// if user is authenticated and not on auth page, allow access to the requested page
  return NextResponse.next()
}
// configure the proxy to only apply to the specified paths
export const config = {
  matcher: [ '/login', '/register', '/cart'],
}