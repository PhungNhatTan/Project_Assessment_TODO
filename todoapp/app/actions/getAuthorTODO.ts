import prisma from '@/app/libs/prismadb';
import { User } from '../generated/prisma';

export default async function getAuthorTODO(currentUser: User) {
    try {
        const TODOs = await prisma.note.findMany({
            where: {
                creatorId: currentUser.username as string,
            },
            orderBy: {
                id: 'desc'
            }
        });

        if (!TODOs) return null;

        return TODOs;
    } catch (error: any) { return null; }
}