import { User } from "@supabase/auth-helpers-nextjs";

import { Subscription, UserDetails } from "@/types";
import {
  useSessionContext,
  useUser as useSuperUser,
} from "@supabase/auth-helpers-react";

import { createContext, useEffect, useState } from "react";
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  propName: string | any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUse,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSuperUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSuubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase.from("subscription").select("*, prices(*, products(*))").('status',['trailing', 'active']).single();

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && subscription) {
            setIsLoadingData(true);

        }
    } , [])
};
