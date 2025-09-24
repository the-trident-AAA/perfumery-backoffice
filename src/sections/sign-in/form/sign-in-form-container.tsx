"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Credentials, credentialsSchema } from "./schemas/credentials-schema";
import { Button } from "@/components/ui/button";
import SignInForm from "./sign-in-form";
import useSignIn from "./hooks/use-sign-in";
import { toast } from "react-toastify";
import { paths } from "@/routes/path";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { useSession } from "next-auth/react";

export default function SignInFormContainer() {
  const { data: session, status } = useSession();
  const { signIn, loading: submitLoading, error } = useSignIn();

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Inicio de sesión realizado con éxito");
      window.location.href = paths.home.root;
    }
  }, [session, status]);

  const form = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      firstCredential: "",
      password: "",
    },
  });

  function onSubmit(credentials: Credentials) {
    signIn(credentials);
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-4 justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold">
          Inicia sesión con su cuenta administrativa
        </h1>
        <p className="text-gray-500">
          Ingrese el correo electrónico asociado a su cuenta
        </p>
        {error && <AlertDestructive description={error} />}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <SignInForm />
          <Button
            type="submit"
            variant={"secondary"}
            className="w-full"
            disabled={submitLoading}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
