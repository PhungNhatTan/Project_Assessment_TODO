'use client';

import React, { useCallback, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = (
    {
        isOpen,
        onClose,
        onSubmit,
        title,
        body,
        footer,
        actionLabel,
        disabled,
        secondaryAction,
        secondaryActionLabel
    }
) => {
    const [, setShowModal] = React.useState(isOpen);

    useEffect(() => { setShowModal(isOpen) }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => { onClose(); }, 300);
    }, [disabled, onClose]);

    const handleSubmmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="flex justify-center items-center fixed inset-0 z-50 bg-neutral-800/70">
                <div
                    className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 2xl:w-1/4 h-full md:h-auto">
                    {/* */}
                    <div
                        className="
                            h-full
                            ${showModal ? 'opacity-100' : 'opacity-0'}
                            ${showModal ? 'translate-y-0' : 'translate-y-full'}">
                        <div
                            className="relative flex flex-col w-full translate h-full border-0 bg-white shadow-lg outline-none focus:outline-none">
                            {/* Header */}
                            <div
                                className="flex items-center rounded-t-lg p-6 justify-center relative border-b-[1px]">
                                <button
                                    className="p-2 border-0 hover:opacity-70 transition absolute left-9">
                                    <IoMdClose size={18} onClick={handleClose} />
                                </button>
                                <div
                                    className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* Body */}
                            <div
                                className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* Footer */}
                            <div
                                className="flex flex-col gap-2 p-6">
                                <div
                                    className="flex flex-row gap-4 w-full items-center">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button outline onClick={handleSecondaryAction} type="button" label={secondaryActionLabel} disabled={disabled}/>
                                    )}
                                    <Button onClick={handleSubmmit} type="button" label={actionLabel} disabled={disabled} />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;