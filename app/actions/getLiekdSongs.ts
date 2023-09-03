import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
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

  const {
    data : {
      session
    }
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq('user_id', session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return []
  }

  if(!data) {
    return []
  }

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;

//createClientComponentClient<Database>({, })
