import { NextResponse } from "next/server";

export function middleware(req) {

  const autorizado = req.cookies.get("autorizado")?.value
  const dashboard = req.cookies.get("dashboard")?.value

  if(!autorizado && req.nextUrl.pathname.startsWith("/menu")){
    return NextResponse.redirect(new URL('/negado', req.url))
  }

  if(!dashboard && req.nextUrl.pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
} 

export const config = {
  matcher: ["/", "/menu", "/dashboard", "/dashboard/:path"]
}