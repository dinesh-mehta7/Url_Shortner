import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import { loginWithGoogle } from "@/db/apiAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";

import { useNavigate, useSearchParams } from "react-router-dom";

import { signup } from "@/db/apiAuth";

import { BeatLoader } from "react-spinners";

import useFetch from "@/hooks/use-fetch";

import { UrlState } from "@/context";

const Signup = () => {
  let [searchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const { fetchUser } = UrlState();
  const {
    fn: fnGoogleLogin,
    loading: googleLoading,
  } = useFetch(loginWithGoogle);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    loading,
    error,
    fn: fnSignup,
    data,
  } = useFetch(signup, formData);

  useEffect(() => {
    if (data && !error) {
      navigate(
        `/dashboard?${longLink ? `createNew=${longLink}` : ""
        }`
      );
    }
  }, [data, error, navigate, longLink]);

  const handleSignup = async () => {
    setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),

        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),

        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),

        profile_pic: Yup.mixed().required(
          "Profile picture is required"
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      // signup
      await fnSignup();

      // IMPORTANT FIX
      await fetchUser();

      // redirect
      navigate(
        `/dashboard?${longLink ? `createNew=${longLink}` : ""
        }`
      );
    } catch (error) {
      const newErrors = {};

      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({
          api: error.message,
        });
      }
    }
  };

  return (
    <Card className="bg-[#020817] border border-slate-800 text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Signup
        </CardTitle>

        <CardDescription className="text-slate-400">
          Create a new account if you haven&rsquo;t already
        </CardDescription>

        {error && <Error message={error?.message} />}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* NAME */}
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>

        {errors.name && <Error message={errors.name} />}

        {/* EMAIL */}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>

        {errors.email && <Error message={errors.email} />}

        {/* PASSWORD */}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>

        {errors.password && <Error message={errors.password} />}

        {/* FILE INPUT */}
        <div className="space-y-2">
          <label
            htmlFor="profile_pic"
            className="
              flex
              items-center
              justify-center
              w-full
              h-32
              border-2
              border-dashed
              border-slate-700
              rounded-xl
              cursor-pointer
              bg-slate-900
              hover:bg-slate-800
              transition
            "
          >
            <div className="text-center">
              <p className="text-sm text-slate-300">
                Click to upload profile picture
              </p>

              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, JPEG
              </p>

              {formData.profile_pic && (
                <p className="text-green-400 mt-2 text-sm">
                  {formData.profile_pic.name}
                </p>
              )}
            </div>
          </label>

          <input
            id="profile_pic"
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {errors.profile_pic && (
          <Error message={errors.profile_pic} />
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSignup}
          className="w-full"
        >
          {loading ? (
            <BeatLoader
              size={10}
              color="#36d7b7"
            />
          ) : (
            "Create Account"
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={fnGoogleLogin}
        >
          {googleLoading ? (
            <BeatLoader size={8} color="#000" />
          ) : (
            "Continue with Google"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;