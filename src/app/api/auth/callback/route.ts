import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const supabase = await createRouteHandlerClient({ cookies });
  const { event, session } = await request.json();

  if (event === 'SIGNED_IN' && session) {
    // This updates cookies so SSR/middleware can read the user
    await supabase.auth.setSession(session)
  }

  return NextResponse.json({ success: true });
}
