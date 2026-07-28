"use client";

import { ImageUploadProps } from "@/shared/ui/types/imageUpload";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

const uploadPreset = "pva3y05v";

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      const info = result.info;
      if (typeof info === "string" || !info?.secure_url) {
        return;
      }

      onChange(info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
