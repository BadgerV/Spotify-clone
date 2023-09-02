import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient(
    {
      cookies: cookies,
    },
    {
      supabaseKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xbXRwYXdveW94YXZkdWtncHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMwMTI4MzUsImV4cCI6MjAwODU4ODgzNX0.NQ1C812FwVq3xZxHrng9cl1-5AuYjcfBF3oHTyhEbx4",
      supabaseUrl: "https://oqmtpawoyoxavdukgpws.supabase.co",
    }
  );

  const {data : sessionData, error : sessionError} = await supabase.auth.getSession();

  if(sessionError) {
    console.log(sessionError.message)
    return []
  }

const {data, error} = await supabase.from('songs').select('*').eq('user_id', sessionData.session?.user.id).order('created_at', {ascending : false})

if(error) {
  console.log(error.message)
}

return (data as any || [])
};

export default getSongsByUserId;

//createClientComponentClient<Database>({, })
