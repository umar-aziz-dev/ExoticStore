import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Skeleton } from "@/Components/ui/skeleton";

import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ProductImageView({
  setimageurl,
  imageview,
  setimageview,
  isloading,
  isEditId,
}) {
  const inputref = useRef();

  // Select images
  const handleImageFilechange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setimageview((prev) => [...prev, ...files]);
    }
  };

  // Drag over
  const handleDrag = (e) => {
    e.preventDefault();
  };

  // Drop images
  const handledrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setimageview((prev) => [...prev, ...files]);
    }
  };

  // Remove image
  const removeimage = (index) => {
    setimageview((prev) => prev.filter((_, i) => i !== index));

    if (inputref.current) {
      inputref.current.value = "";
    }
  };

  // Upload images to Cloudinary
const UploadOnCloudinary = async () => {
  try {
    const data = new FormData();
    imageview.forEach((file) => data.append("images", file));

    const result = await axios.post(
      "/api/seller/api/upload", // must match backend
      data
    );

    if (result?.data?.success) {
      setimageurl(result.data.data); // array of URLs
    }
  } catch (error) {
    console.log("Error occurred while uploading images", error);
  }
};

  // Auto upload when images selected
  useEffect(() => {
    if (imageview?.length > 0 && !isEditId) {
      UploadOnCloudinary();
    }
  }, [imageview, isEditId]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Images
      </Label>

      <div
        className={`border-2 border-black p-4 rounded-lg border-dashed mb-4
        ${isEditId ? "opacity-60 pointer-events-none" : ""}`}
        onDragOver={!isEditId ? handleDrag : undefined}
        onDrop={!isEditId ? handledrop : undefined}
      >
        <Input
          id="image-upload"
          type="file"
          multiple
          className="hidden"
          ref={inputref}
          onChange={handleImageFilechange}
          disabled={isEditId}
        />

        <Label
          htmlFor={isEditId ? undefined : "image-upload"}
          className={`flex flex-col items-center justify-center gap-2
          ${isEditId ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
          <span>Drag & Drop or Click to Upload Images</span>
        </Label>
      </div>

      {/* Image List */}
      {isloading ? (
        <Skeleton className="h-10 bg-gray-100" />
      ) : (
        <div className="flex flex-col gap-3">
          {imageview?.map((img, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="w-6 h-6" />
                <p className="text-sm truncate max-w-[180px]">
                  {img.name}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeimage(index)}
                disabled={isEditId}
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}