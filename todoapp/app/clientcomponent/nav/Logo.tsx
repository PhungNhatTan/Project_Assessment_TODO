'use client';

import Image from "next/image";

const Logo = () => {
    return (
        <Image alt="TODO Management" className="hidden md:block cursor-pointer"
        height={200} width={200} src="/image/Logo.png"/>
    );
}

export default Logo;