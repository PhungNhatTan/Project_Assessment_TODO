'use client';

import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useNoteModal from "@/app/hooks/useNoteModal";
import Input from "../inputs/Input";
import { useState } from "react";
import Select from "react-select";
import { User } from "@/app/generated/prisma";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NoteModalProps {
    currentUser?: User | null,
    userList: User[]
};

const NoteModal: React.FC<NoteModalProps> = ({
    currentUser,
    userList
}) => {
    const noteModal = useNoteModal();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, },
        setValue,
        reset,
        control
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: '',
            assign: currentUser?.username,
            dueDate: new Date(),
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/todo', data)
            .then(() => {
                toast.success('TODO created');
                router.refresh();
                reset();
            }).catch(() => {
                toast.error('Something went wrong');
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const idList = userList.map(user => ({
        label: user.username,
        value: user.username
    }));

    const bodyContent = (
        <div className="flex flex-col gap-8">
            <Input
                id="title"
                label="Title"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id="description"
                label="Description"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Controller
                name="assign"
                control={control}
                render={({ field }) => {
                    const selectedOption = idList.find(opt => opt.value === field.value);

                    return (
                        <Select
                            options={idList}
                            value={selectedOption}
                            onChange={(option) => field.onChange(option?.value)}
                            isClearable
                            placeholder="Assign to"
                            isDisabled={isLoading}
                        />
                    );
                }}
            />
            <div className="flex flex-row gap-8 justify-between">
                <div className="font-semibold">Due date:</div>
                <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            disabled={isLoading}
                        />
                    )}
                />
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={noteModal.isOpen}
            onClose={noteModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Add"
            title="Create new TODO note"
            body={bodyContent}
        />
    );
}

export default NoteModal;