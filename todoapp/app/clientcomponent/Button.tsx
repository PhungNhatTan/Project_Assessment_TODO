'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type: "button" | "submit" | "reset";
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    type = "button",
    outline,
    small,
    icon: Icon
}) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
            ${outline ? 'bg-blue-200' : 'bg-neutral-900'} 
            ${outline ? 'text-black' : 'text-white'} 
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}`}>
            {Icon && (
                <Icon size={24} className="absolute left-4 top-3"/>
            )}
            {label}
        </button>
    );
}

export default Button;