import prisma from '@/app/libs/prismadb';
import { User } from '../generated/prisma';

export default async function getAssignTODO(currentUser: User) {
    try {
        const TODOs = await prisma.note.findMany({
            where: {
                assignId: currentUser.username as string,
            }
        });

        if (!TODOs) return null;

        return TODOs;
    } catch (error) { console.log(error) }
}