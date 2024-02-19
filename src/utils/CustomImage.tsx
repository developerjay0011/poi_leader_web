'use client'
import React, { useEffect } from 'react';
import { useState } from "react";
import Image, { ImageProps } from 'next/image';
import NoImg from '@/assets/No_image_available.png'

interface CustomImageProps extends ImageProps {
  alt: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...props }) => {
  const [imageError, setImageError] = useState(!src ? true : false);

  useEffect(() => {
    setImageError(!src ? true : false)
  }, [src]);

  // Customize the image wrapper here if needed
  return (
    <Image
      {...props}
      src={ imageError ? NoImg : src }
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) setImageError(true)
      }}
      onError={(event) => setImageError(true)}
      onEmptied={() => setImageError(true) }
    />
  );
};

export default CustomImage;