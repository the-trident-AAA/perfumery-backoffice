import type React from "react";
import Image from "next/image";
import SignInFormContainer from "./form/sign-in-form-container";
import AppLogo from "@/components/app-logo/app-logo";

export default function SignInContainer() {
  return (
    <div className="flex w-full h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center flex-col gap-4 p-10">
        <AppLogo withText={false} avatarClassName="h-42 w-42" />
        <SignInFormContainer />
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <Image
          src={"/images/place-holder.jpg"}
          alt="Login image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
