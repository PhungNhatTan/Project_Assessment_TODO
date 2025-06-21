'use client';

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItems from "./MenuItem";
import { User } from "@/app/generated/prisma";
import { signOut } from 'next-auth/react';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useNoteModal from "@/app/hooks/useNoteModal";
import { useRouter } from "next/navigation";


interface UserDropProp {
    currentUser?: User | null;
}

const UserDrop: React.FC<UserDropProp> = ({
    currentUser
}) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const noteModal = useNoteModal();

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, []);

    const onNote = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        noteModal.onOpen();
    }, [loginModal]);

    const viewNote = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        router.push('/api/todo')
    }, [loginModal])

    return (
        <div
            className="relative">
            <div
                className="flex flex-row item-center gap-3">
                <div
                    onClick={onNote}
                    className="hidden md:block hover:bg-neutral-100 py-3 px-4 rounded-full transition cursor-pointer">
                    Create new TODO note
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
                        {currentUser ? (
                            <>
                                <MenuItems
                                    onClick={viewNote}
                                    label="Your Notes"
                                />
                                <MenuItems
                                    onClick={onNote}
                                    label="Create new TODO note"
                                />
                                <hr />
                                <MenuItems
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItems
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItems
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default UserDrop;