import React, { useState, useEffect, FC } from 'react';
interface InputProps {
  width?: string
  height?: string
}
export const Simmering: FC<InputProps> = ({ height, width }) => {
  const [simmerAnimation, setSimmerAnimation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSimmerAnimation((prevAnimation) => (prevAnimation + 1) % 100);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const shimmerStyle = {
    background: `linear-gradient(to right, ${'#e0e0e0'} ${simmerAnimation}%, ${"#f5f5f5"} ${(simmerAnimation + 10) % 100}%)`,
    borderRadius: '4px',
    animation: `shimmer 1.5s ease-in-out infinite alternate`,
  };

  return <div style={{ width, height, ...shimmerStyle }} />;
}