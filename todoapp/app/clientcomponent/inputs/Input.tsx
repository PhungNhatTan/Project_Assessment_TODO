'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    formatPrice?: boolean;
    errors: FieldErrors;
    register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = (
    {
        id,
        label,
        type = 'text',
        required,
        disabled,
        formatPrice,
        errors,
        register
    }
) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-600 abosolute left-2 top-5" />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-0 disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-2' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}`} />
            <label
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    ${formatPrice ? 'left-9' : 'left-4'}
                    ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
                    `}>
                {label}
            </label>
        </div>
    )
}

export default Input;