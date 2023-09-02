import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(
    {
      req,
      res,
    },
    {
      supabaseKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbXRwYXdveW94YXZkdWtncHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwMTI4MzUsImV4cCI6MjAwODU4ODgzNX0.NQ1C812FwVq3xZxHrng9cl1-5AuYjcfBF3oHTyhEbx4",
      supabaseUrl: "https://oqmtpawoyoxavdukgpws.supabase.co",
    }
  );

  await supabase.auth.getSession();
  return res;
}
