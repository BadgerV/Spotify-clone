import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title : string): Promise<Song[]> => {
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
  
  if(!title) {
    const allSongs = await getSongs();
    return allSongs;
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike('title', `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsByTitle;

//createClientComponentClient<Database>({, })
