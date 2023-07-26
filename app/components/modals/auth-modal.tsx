"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useAuthModal from "../../hooks/use-auth-modal";
import { toast } from "react-hot-toast";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import Button from "../button";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const router = useRouter();
  const authModal = useAuthModal();
  const isRegister = authModal.type === "register";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (isRegister) {
      axios
        .post(`/api/register`, data)
        .then(() => {
          authModal.onClose();
        })
        .catch((error) => {
          toast.error("Something went wrong.");
        })
        .finally(() => setIsLoading(false));
    } else {
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          authModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle={isRegister ? "Create an account" : "Login to your account"}
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {isRegister && (
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      )}
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-6">
      <div className="relative mb-5">
        <hr />
        <p className="text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-neutral-500 bg-white">
          or
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          type="outline"
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />
        <Button
          type="outline"
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
        {isRegister ? (
          <div className="flex flex-row items-center justify-center gap-2 text-sm text-neutral-500">
            <div>Already have an account?</div>
            <div
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                authModal.onOpen("login");
              }}
            >
              Log in
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2 text-sm text-neutral-500">
            <div>First time using Airbnb?</div>
            <div
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                authModal.onOpen("register");
              }}
            >
              Create an account
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={authModal.isOpen}
      title="Log in or sign up"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
      onClose={authModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AuthModal;
