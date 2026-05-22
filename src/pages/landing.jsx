import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();

    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-8">
      {/* HERO */}
      <h2 className="my-10 sm:my-14 text-4xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold tracking-tight leading-tight max-w-5xl">
        The only 
        <span className="text-blue-400"> URL Shortener </span><br />

        <span className="relative inline-block">
          you&rsquo;ll ever need!

          <img
            src="/giphy (1).gif"
            alt="👇"
            className="absolute -right-16 -bottom-3 hidden lg:block w-16 h-16 object-contain animate-bounce"
          />
        </span>

        <img
          src="/giphy (1).gif"
          alt="👇"
          className="inline-block lg:hidden w-10 h-10 ml-2 align-middle"
        />
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleShorten}
        className="flex flex-col sm:flex-row w-full max-w-3xl gap-3 mt-2"
      >
        <Input
          type="url"
          placeholder="Enter your loooong URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-14 flex-1 px-5 text-base"
        />

        <Button
          type="submit"
          variant="destructive"
          className="h-14 px-8 text-base font-semibold"
        >
          Shorten!
        </Button>
      </form>

      {/* FAQ */}
      <div className="w-full max-w-4xl mt-14">
        <Accordion type="multiple" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border border-gray-800 rounded-xl px-5"
          >
            <AccordionTrigger className="text-left text-lg">
              How does the Trimrr URL shortener works?
            </AccordionTrigger>

            <AccordionContent className="text-gray-400 leading-relaxed">
              When you enter a long URL, our system generates a shorter version
              of that URL. This shortened URL redirects to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border border-gray-800 rounded-xl px-5"
          >
            <AccordionTrigger className="text-left text-lg">
              Do I need an account to use the app?
            </AccordionTrigger>

            <AccordionContent className="text-gray-400 leading-relaxed">
              Yes. Creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border border-gray-800 rounded-xl px-5"
          >
            <AccordionTrigger className="text-left text-lg">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>

            <AccordionContent className="text-gray-400 leading-relaxed">
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;