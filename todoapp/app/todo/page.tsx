import getCurrentUser from "@/app/actions/getCurrentUser";
import NoteList from "@/app/clientcomponent/todos/NoteList";

export default async function Todo() {
    const fetchData = await (await fetch("/api/todo")).json();
    console.log(fetchData);
    const currentUser = await getCurrentUser();
    return (
        <NoteList currentUser={currentUser} />
    )
}