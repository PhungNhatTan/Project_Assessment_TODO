import prisma from '@/app/libs/prismadb';

export default async function getUsers() {
    try {
        const Users = await prisma.user.findMany();

        if (!Users) return null;

        return Users;
    } catch (error: any) { return null; }
}