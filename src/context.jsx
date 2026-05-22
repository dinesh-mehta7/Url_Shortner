/* eslint-disable react/prop-types */

import {createContext, useContext, useEffect, useState} from "react";
import supabase from "./db/supabase";

const UrlContext = createContext();

const UrlProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get existing session
    const getUser = async () => {
      const {
        data: {session},
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  return (
    <UrlContext.Provider value={{user, loading, isAuthenticated}}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;