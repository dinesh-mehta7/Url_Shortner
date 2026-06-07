import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UrlState } from "@/context";

import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";

import useFetch from "@/hooks/use-fetch";

import {
  Copy,
  Download,
  LinkIcon,
  Trash,
} from "lucide-react";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  BarLoader,
  BeatLoader,
} from "react-spinners";

const LinkPage = () => {
  const navigate = useNavigate();

  const { user } = UrlState();

  const { id } = useParams();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {
    id,
    user_id: user?.id,
  });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const {
    loading: loadingDelete,
    fn: fnDelete,
  } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) {
      fnStats();
    }
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  const link = url?.custom_url
    ? url?.custom_url
    : url?.short_url;

  const shortLink = `${window.location.origin}/${link}`;

  const downloadImage = async () => {
    try {
      const response = await fetch(url?.qr);

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      anchor.href = blobUrl;
      anchor.download = `${url?.title || "qr-code"}.png`;

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {(loading || loadingStats) && (
        <BarLoader
          className="mb-6"
          width={"100%"}
          color="#36d7b7"
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <Card className="lg:w-[40%] bg-[#0f172a] border border-gray-800">
          <CardContent className="p-6 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold break-words">
                {url?.title}
              </h1>
            </div>

            {/* Short URL */}
            <a
              href={shortLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-xl md:text-2xl font-bold hover:underline break-all"
            >
              {shortLink}
            </a>

            {/* Original URL */}
            <a
              href={url?.original_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2 text-gray-300 hover:underline break-all"
            >
              <LinkIcon size={18} className="mt-1 shrink-0" />

              <span>{url?.original_url}</span>
            </a>

            {/* Created At */}
            <p className="text-sm text-gray-400">
              Created on{" "}
              {new Date(url?.created_at).toLocaleString()}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="secondary"
                onClick={() =>
                  navigator.clipboard.writeText(shortLink)
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>

              <Button
                variant="secondary"
                onClick={downloadImage}
              >
                <Download className="mr-2 h-4 w-4" />
                QR
              </Button>

              <Button
                variant="destructive"
                disabled={loadingDelete}
                onClick={() =>
                  fnDelete().then(() => {
                    navigate("/dashboard");
                  })
                }
              >
                {loadingDelete ? (
                  <BeatLoader size={5} color="white" />
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
            </div>

            {/* QR */}
            <div className="flex justify-center">
              <img
                src={url?.qr}
                alt="QR Code"
                className="w-60 rounded-xl border border-gray-700 p-3 bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* RIGHT SECTION */}
        <Card className="lg:w-[60%] bg-[#0f172a] border border-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Statistics
            </CardTitle>
          </CardHeader>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-8">
              {/* Total Clicks */}
              <Card className="bg-[#111827] border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Total Clicks
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-4xl font-bold">
                    {stats?.length}
                  </p>
                </CardContent>
              </Card>

              {/* Location */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">
                  Location Data
                </h2>

                <Location stats={stats} />
              </div>

              {/* Devices */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">
                  Device Info
                </h2>

                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-gray-400">
              {loadingStats
                ? "Loading Statistics..."
                : "No statistics yet"}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LinkPage;