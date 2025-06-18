'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const Router = useRouter();
    return (
        <Image alt="TODO Management" className="hidden md:block cursor-pointer"
        height={200} width={200} src="/image/Logo.png"/>
    );
}

export default Logo;