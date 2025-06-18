'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItems from "./MenuItem";

const UserDrop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, []);

    return (
        <div
            className="relative">
            <div
                className="flex flex-row item-center gap-3">
                <div
                    onClick={() => { }}
                    className="hidden md:block hover:bg-neutral-100 py-3 px-4 rounded-full transition cursor-pointer">
                    placeholder
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 border-[1px] border-neutral-200 flex flex-row item-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                </div>
            </div>
            {isOpen && (
                <div
                    className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div
                        className="flex flex-col cursor-pointer">
                        <>
                            <MenuItems
                                onClick={() => { }}
                                label="Log-in"
                            />
                            <MenuItems
                                onClick={() => { }}
                                label="Sign up"
                            />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDrop;