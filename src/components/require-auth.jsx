import {Navigate} from "react-router-dom";
import {UrlState} from "@/context";
import {BarLoader} from "react-spinners";

function RequireAuth({children}) {
  const {loading, isAuthenticated} = UrlState();

  // Still checking auth
  if (loading) {
    return (
      <div className="w-full mt-4">
        <BarLoader
          width={"100%"}
          color="#36d7b7"
        />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Authenticated
  return children;
}

export default RequireAuth;