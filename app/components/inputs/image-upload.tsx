"use client";

import { FunctionComponent } from "react";
import { IoMdImages } from "react-icons/io";
import { TfiPlus } from "react-icons/tfi";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  type: "dropzone" | "button";
  onImageDrop: (files: File[]) => void;
}

const ImageUpload: FunctionComponent<ImageUploadProps> = ({
  type,
  onImageDrop,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    noClick: type === "dropzone",
    noDrag: type === "button",
    noDragEventsBubbling: type === "button",
    onDrop: onImageDrop,
  });

  if (type === "button") {
    return (
      <div
        {...getRootProps({
          className: `flex flex-col items-center justify-center gap-1.5 w-full h-full min-h-[200px] text-neutral-500 border border-dashed cursor-pointer`,
        })}
      >
        <TfiPlus size={30} />
        <p className="text-sm">Add more</p>
      </div>
    );
  }

  return (
    <div
      {...getRootProps({
        className: `relative flex flex-col items-center justify-center gap-1 w-full h-[500px] mt-5 text-neutral-700 ${
          isDragActive ? "" : "border"
        } border-dashed border-neutral-400`,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <DropArea />
      ) : (
        <>
          <IoMdImages size={50} />
          <p className="text-xl font-semibold mt-2">Drag your photos here</p>
          <p className="font-light">Choose at least 5 photos</p>
          <UploadButton />
        </>
      )}
    </div>
  );
};

export default ImageUpload;

export const DropArea = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center border-2 border-black bg-neutral-50 z-10">
      <IoMdImages size={50} />
      <p className="text-xl font-semibold mt-3">Drop to upload</p>
    </div>
  );
};

const UploadButton = () => {
  const { getRootProps } = useDropzone({ noDragEventsBubbling: true });
  return (
    <div
      {...getRootProps({
        className:
          "absolute bottom-10 left-0 right-0 flex items-center justify-center",
      })}
    >
      <button className="border-none underline hover:text-black">
        Upload from your device
      </button>
    </div>
  );
};
