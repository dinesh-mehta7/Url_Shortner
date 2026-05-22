// can add sonner from shadcn ui after link created

import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {user} = UrlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    if (user?.id) {
      fnUrls();
    }
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="bg-[#0f172a] border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-300">
              Links Created
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-white">
              {urls?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#0f172a] border border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-300">
              Total Clicks
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-white">
              {clicks?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          My Links
        </h1>

        <CreateLink />
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search your links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 h-11"
        />

        <Filter
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Error */}
      {error && <Error message={error?.message} />}

      {/* Links */}
      <div className="flex flex-col gap-4">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard
            key={i}
            url={url}
            fetchUrls={fnUrls}
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;