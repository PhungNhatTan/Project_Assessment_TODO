'use client';

import { Note, User } from "@/app/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TemplateBox from "../TemplatBox";
import TodoRow from "../TodoRow";

interface NoteListProps {
    currentUser?: User | null,
}

const NoteList: React.FC<NoteListProps> = ({
    currentUser
}) => {
    const [data, setData] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('/api/todo');
                setData(response.data);
            } catch (error) {
                toast.error((error as Error)?.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <TemplateBox>
            <div className="p-8 flex flex-row gap-10">
                <div className="mt-5 grid grid-cols-12">
                    <div className="col-span-8 ">
                        <div className="p-1">
                            <div className="grid grid-cols-8 gap-4">
                                <div className="col-span-1 p-2">Title</div>
                                <div className="col-span-2 p-2">Description</div>
                                <div className="col-span-1 p-2">Assigned</div>
                                <div className="col-span-1 p-2">Author</div>
                                <div className="col-span-2 p-2">Due Date</div>
                                <div className="col-span-1 p-2">Status</div>
                            </div>
                        </div>
                        {!isLoading && currentUser && data?.map((item: Note) => {
                            return (
                                <div key={item.id} className="p-1">
                                    <TodoRow
                                        data={item}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-span-4">

                    </div>
                </div>
            </div>
        </TemplateBox>
    );
}

export default NoteList;