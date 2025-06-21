'use client';

import { Note, User } from "../generated/prisma";

interface TodoRowProps {
    data: Note,
    title?: string,
    description?: string,
    assign?: string,
    author?: string,
    dueDate?: Date,
    status?: number,
    currentUser?: User,
}

enum statusExpl {
    Pending,
    'In Progress',
    Done,
}

const TodoRow: React.FC<TodoRowProps> = ({
    data
}) => {

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="hidden">{data.id}</div>
            <div className="col-span-1 p-2">{data.title}</div>
            <div className="col-span-2 p-2">{data.description}</div>
            <div className="col-span-1 p-2">{data.assignId}</div>
            <div className="col-span-1 p-2">{data.creatorId}</div>
            <div className="col-span-2 p-2">{new Date(data.dueDate).toDateString()}</div>
            <div className="col-span-1 p-2">{statusExpl[data.status]}</div>
        </div>
    );
}

export default TodoRow;