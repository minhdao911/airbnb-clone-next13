"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useAuthModal from "../../hooks/use-auth-modal";
import { toast } from "react-hot-toast";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import Button from "../button";
import { useTranslation } from "@/i18n/client";
import useLocale from "@/app/hooks/use-locale";
import { useRouter } from "next-nprogress-bar";

const AuthModal = () => {
  const router = useRouter();
  const authModal = useAuthModal();

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "common");

  const isRegister = authModal.type === "register";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
          toast.success("Successfully registered");
          reset();
          authModal.onOpen("login");
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
        title={t("authModal.welcome")}
        subtitle={
          isRegister
            ? t("authModal.createAccount")
            : t("authModal.loginToAccount")
        }
      />
      <Input
        id="email"
        label={t("authModal.inputs.email")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {isRegister && (
        <Input
          id="name"
          label={t("authModal.inputs.name")}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      )}
      <Input
        id="password"
        label={t("authModal.inputs.password")}
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
          label={t("authModal.actionButtons.google")}
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />
        <Button
          type="outline"
          label={t("authModal.actionButtons.github")}
          icon={AiFillGithub}
          onClick={() => signIn("github")}
        />
        {isRegister ? (
          <div className="flex flex-row items-center justify-center gap-2 text-sm text-neutral-500">
            <div>{t("authModal.subActionButtons.hasAccount")}</div>
            <div
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                authModal.onOpen("login");
              }}
            >
              {t("authModal.subActionButtons.login")}
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-2 text-sm text-neutral-500">
            <div>{t("authModal.subActionButtons.firstTimeUse")}</div>
            <div
              className="text-neutral-800 cursor-pointer hover:underline"
              onClick={() => {
                authModal.onOpen("register");
              }}
            >
              {t("authModal.createAccount")}
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
