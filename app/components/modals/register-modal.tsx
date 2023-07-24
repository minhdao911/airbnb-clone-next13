"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/use-register-modal";
import { toast } from "react-hot-toast";
import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import Button from "../button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
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

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
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
          onClick={() => {}}
        />
        <Button
          type="outline"
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => {}}
        />
        <div className="flex flex-row items-center justify-center gap-2 text-sm text-neutral-500">
          <div>Already have an account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Log in or sign up"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
