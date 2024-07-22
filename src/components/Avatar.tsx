import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: any;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 8 }) => {
    return (
        <Image className={` rounded-tl-lg`} src={src} alt={alt} width={size} height={size}/>
    );
};

export default Avatar;
