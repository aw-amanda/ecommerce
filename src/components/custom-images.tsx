import Image from "next/image";
import { ComponentProps } from "react";

interface CustomImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
    src: string;
}

export default function CustomImage({ src, ...props }: CustomImageProps) {
    const getImagePath = (path: string) => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        
        if (process.env.NODE_ENV === 'production') {
            return `/ecommerce/${cleanPath}`;
        }
        
        return `/${cleanPath}`;
    };

    return <Image src={getImagePath(src)} {...props} />;
}