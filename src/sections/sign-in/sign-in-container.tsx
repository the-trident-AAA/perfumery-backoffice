import type React from "react";
import Image from "next/image";
import SignInFormContainer from "./form/sign-in-form-container";

interface Props {
  logoText: string;
  imageSrc: string;
}

export default function SignInContainer({ logoText, imageSrc }: Props) {
  return (
    <div className="flex w-full h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-10">
        <div className="flex items-center mb-16">
          <div className="bg-black text-white p-2 rounded mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="15" y1="9" y2="9" />
              <line x1="9" x2="15" y1="15" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-medium">{logoText}</span>
        </div>

        <SignInFormContainer />
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <Image
          src={imageSrc || "public/images/place-holder.jpg"}
          alt="Login image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
