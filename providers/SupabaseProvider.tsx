"use client";

import { Database } from "@/types_db";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>({supabaseKey : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbXRwYXdveW94YXZkdWtncHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwMTI4MzUsImV4cCI6MjAwODU4ODgzNX0.NQ1C812FwVq3xZxHrng9cl1-5AuYjcfBF3oHTyhEbx4", supabaseUrl : "https://oqmtpawoyoxavdukgpws.supabase.co"})
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
  )
};


export default SupabaseProvider;