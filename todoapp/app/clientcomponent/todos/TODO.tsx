'use client';

import { Note, User } from "@/app/generated/prisma";

interface TODOProps {
    currentUser?: User | null;
    TODO: Note;
}

const TODO: React.FC<TODOProps> = ({
    currentUser,
    TODO
}) => {
    return (
        <div className="flex flex-col gap-2">
            {}
        </div>
    );
}

export default TODO;