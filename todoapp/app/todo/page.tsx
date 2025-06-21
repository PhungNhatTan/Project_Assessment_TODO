import getCurrentUser from "@/app/actions/getCurrentUser";
import NoteList from "@/app/clientcomponent/todos/NoteList";

export default async function Todo() {
    const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
    const fetchData = await (await fetch(`${baseUrl}/api/todo`)).json();
    console.log(fetchData);
    const currentUser = await getCurrentUser();
    return (
        <NoteList currentUser={currentUser} />
    )
}