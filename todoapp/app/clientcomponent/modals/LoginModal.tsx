'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "./Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, } } = useForm<FieldValues>({
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);


        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error('Something went wrong');
            }
        });
    }

    const bodyContent = (
        <div
            className="flex flex-col gap-4 justify-items-center items-center">
            <Heading title="Welcome" center />
            <Input
                id="identifier"
                label="Username or Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                type="button"
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { }} />
            <Button
                outline
                type="button"
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { }} />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;