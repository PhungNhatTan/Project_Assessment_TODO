import Image from "next/image";
import getAuthorTODO from "./actions/getAuthorTODO";
import getCurrentUser from "./actions/getCurrentUser";
import TemplateBox from "./clientcomponent/TemplatBox";
import TodoRow from "./clientcomponent/TodoRow";
import { Note } from "./generated/prisma";

export default async function Home() {
    const currentUser = await getCurrentUser();
    let authorTODOs = null;

    if (currentUser) {
        authorTODOs = await getAuthorTODO(currentUser);
    }

    return (
        <> </>
        // <TemplateBox>
        //         <div className="p-8 flex flex-row gap-10">
        //             <div className="mt-5 grid grid-cols-12">
        //                 <div className="col-span-8 ">
        //                     <div className="p-1">
        //                         <div className="grid grid-cols-8 gap-4">
        //                             <div className="col-span-1 p-2">Title</div>
        //                             <div className="col-span-2 p-2">Description</div>
        //                             <div className="col-span-1 p-2">Assigned</div>
        //                             <div className="col-span-1 p-2">Author</div>
        //                             <div className="col-span-2 p-2">Due Date</div>
        //                             <div className="col-span-1 p-2">Status</div>
        //                         </div>
        //                     </div>
        //                     {authorTODOs?.map((item: Note) => {
        //                         return (
        //                             <div key={item.id} className="p-1">
        //                                 <TodoRow
        //                                     data={item}
        //                                 />
        //                             </div>
        //                         )
        //                     })}
        //                 </div>
        //                 <div className="col-span-4">

        //                 </div>
        //             </div>
        //         </div>
        //     </TemplateBox>

    );
}
