// hooks/useImagePreview.ts
import { useCallback, useEffect, useRef, useState } from "react";

export const useImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createPreview = useCallback(
    (file: File | null) => {
      // Clean up previous URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    },
    [previewUrl]
  );

  const clearPreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const deleteImage = useCallback(
    (onChange: (value: any) => void) => {
      // Clear form value
      onChange(undefined);

      // Clear preview
      clearPreview();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [clearPreview]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return { previewUrl, createPreview, clearPreview, deleteImage, fileInputRef };
};
