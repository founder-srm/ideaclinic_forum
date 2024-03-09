import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  // const password = String(formData.get('password'))
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const {error} = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: 'localhost:3000/auth/callback',
    }
  })

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/login?sign-up?error=${error.message}`, {
      status: 301,
    })
  }

  return NextResponse.redirect(`${requestUrl.origin}/checkemail`, {
    status: 301,
  })
}