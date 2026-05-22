// import Login from "@/components/login";
// import Signup from "@/components/signup";
// import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
// import {UrlState} from "@/context";
// import {useEffect} from "react";
// import {useNavigate, useSearchParams} from "react-router-dom";
// import {loginWithGoogle} from "@/db/apiAuth";

// function Auth() {
//   let [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const {isAuthenticated, loading} = UrlState();
//   const longLink = searchParams.get("createNew");

//   useEffect(() => {
//     if (isAuthenticated && !loading)
//       navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
//   }, [isAuthenticated, loading, navigate]);

//   return (
//     <div className="mt-36 flex flex-col items-center gap-10">
//       <h1 className="text-5xl font-extrabold">
//         {searchParams.get("createNew")
//           ? "Hold up! Let's login first.."
//           : "Login / Signup"}
//       </h1>
//       <Tabs defaultValue="login" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="login">Login</TabsTrigger>
//           <TabsTrigger value="signup">Signup</TabsTrigger>
//         </TabsList>
//         <TabsContent value="login">
//           <Login />
//         </TabsContent>
//         <TabsContent value="signup">
//           <Signup />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default Auth;

import Login from "@/components/login";
import Signup from "@/components/signup";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {Button} from "@/components/ui/button";

import {UrlState} from "@/context";

import {useEffect} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {loginWithGoogle} from "@/db/apiAuth";

import useFetch from "@/hooks/use-fetch";

import {BeatLoader} from "react-spinners";

function Auth() {
  let [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState();

  const longLink = searchParams.get("createNew");

  // GOOGLE LOGIN
  const {
    fn: fnGoogleLogin,
    loading: googleLoading,
  } = useFetch(loginWithGoogle);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(
        `/dashboard?${
          longLink ? `createNew=${longLink}` : ""
        }`
      );
    }
  }, [
    isAuthenticated,
    loading,
    navigate,
    longLink,
  ]);

  return (
    <div className="mt-10 flex flex-col items-center gap-10 px-4">
      <h1 className="text-5xl font-extrabold text-center">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : "Login / Signup"}
      </h1>

      <Tabs
        defaultValue="login"
        className="w-full max-w-[400px]"
      >
        {/* TABS */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">
            Login
          </TabsTrigger>

          <TabsTrigger value="signup">
            Signup
          </TabsTrigger>
        </TabsList>

        {/* LOGIN */}
        <TabsContent value="login">
          <Login />
        </TabsContent>

        {/* SIGNUP */}
        <TabsContent value="signup">
          <Signup />
        </TabsContent>

        {/* DIVIDER */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-700" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* GOOGLE BUTTON */}
        <Button
          variant="outline"
          className="w-full"
          onClick={fnGoogleLogin}
        >
          {googleLoading ? (
            <BeatLoader
              size={8}
              color="#000"
            />
          ) : (
            "Continue with Google"
          )}
        </Button>
      </Tabs>
    </div>
  );
}

export default Auth;