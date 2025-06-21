import getCurrentUser from "@/app/actions/getCurrentUser";
import NoteList from "@/app/clientcomponent/todos/NoteList";

export default async function Todo() {
    const data = await (await fetch('/api/todo')).json();
    const currentUser = await getCurrentUser();
    return (
        <NoteList currentUser={currentUser}/>
    )
}