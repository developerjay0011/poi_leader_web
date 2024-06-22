'use client'
import React, { useEffect } from 'react';
import { useState } from "react";
import Image, { ImageProps } from 'next/image';
import NoImg from '@/assets/No_image_available1.png'

interface CustomImageProps extends ImageProps {
  alt: string;
  className?: string
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, className, ...props }) => {
  const [imageError, setImageError] = useState(!src ? true : false);

  useEffect(() => {
    setImageError(!src ? true : false)
  }, [src]);

  // Customize the image wrapper here if needed
  return (
    <Image
      {...props}
      src={imageError ? NoImg : src}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) setImageError(true)
      }}
      onError={(event) => setImageError(true)}
      onEmptied={() => setImageError(true)}
      loading="eager"
      className={className}
    // className={imageError ? `${className} !object-contain !bg-[grey]` : className}
    />
  );
};

export default CustomImage;