"use client";

import { FunctionComponent, useCallback } from "react";
import Image from "next/image";
import Heading from "../heading";
import ImageUpload, { DropArea } from "../inputs/image-upload";
import IconButton from "../icon-button";
import { HiMinus } from "react-icons/hi";
import { useDropzone } from "react-dropzone";

type UploadedFile = File & { preview: string };

interface ImagesStepProps {
  files: UploadedFile[];
  setValue(files: UploadedFile[]): void;
}

const ImagesStep: FunctionComponent<ImagesStepProps> = ({
  files,
  setValue,
}) => {
  const handleImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = files.concat(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setValue(updatedFiles);
    },
    [files, setValue]
  );

  const handleImageRemove = useCallback(
    (file: UploadedFile) => {
      const fileIndex = files.findIndex((f) => f.preview === file.preview);
      const updatedFiles = files.slice();
      updatedFiles.splice(fileIndex, 1);
      setValue(updatedFiles);
    },
    [files, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    noClick: true,
    onDrop: handleImageDrop,
  });

  return (
    <>
      <Heading
        title="Add some photos of your apartment"
        subtitle="You'll need 3 photos to get started. You can add more or make changes later."
        titleStyle={{
          marginTop: 100,
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      {files.length > 0 ? (
        <div
          {...getRootProps({
            className: `relative grid grid-cols-2 grid-rows-[repeat(3,_minmax(200px,_1fr))] gap-5 ${
              isDragActive ? "border-4" : ""
            }`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive && <DropArea />}
          {files.map((file, index) => (
            <div className="relative" key={index}>
              <Image
                className="w-full h-[200px] object-cover"
                width={300}
                height={300}
                src={file.preview}
                alt="apartment photo"
              />
              <div className="absolute right-3 top-3">
                <IconButton
                  icon={HiMinus}
                  iconSize={18}
                  buttonSize={30}
                  onClick={() => handleImageRemove(file)}
                />
              </div>
            </div>
          ))}
          <ImageUpload type="button" onImageDrop={handleImageDrop} />
        </div>
      ) : (
        <ImageUpload type="dropzone" onImageDrop={handleImageDrop} />
      )}
    </>
  );
};

export default ImagesStep;
