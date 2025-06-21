import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getAuthorTODO from "@/app/actions/getAuthorTODO";

export async function GET(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (currentUser) {
        const listTODO = await getAuthorTODO(currentUser);
        return NextResponse.json(listTODO);
    }
}

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        assignId,
        dueDate,
        status
    } = body;

    const requiredKey = ['title', 'dueDate'];

    Object.keys(body).forEach((requiredKey) => {
        if (!body[requiredKey]) {
            NextResponse.error()
        }
    });

    const finalAssignId = assignId || currentUser.username;

    const TODO = await prisma.note.create({
        data: {
            title,
            description,
            creator: {
                connect: { username: currentUser.username }
            },
            assign: {
                connect: { username: finalAssignId }
            },
            dueDate,
            status
        }
    });

    return NextResponse.json(TODO);
}