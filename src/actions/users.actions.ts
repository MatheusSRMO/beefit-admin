"use server";

import { revalidatePath } from "next/cache";

import { handleError, handleStringfy } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

// CREATE
export async function createUser(user: CreateUserParams) {
    const prisma = new PrismaClient();
    try {
        const newUser = await prisma.user.create({
            data: user,
        });

        return handleStringfy(newUser);
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// READ
export async function getUserById(userId: number) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new Error("User not found");

        return handleStringfy(user);
    } catch (error) {
        handleError(error);
    } finally {
        await prisma.$disconnect();
    }
}

// // UPDATE
// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//     try {
//         const prisma = new PrismaClient();

//         // const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
//         //   new: true,
//         // });

//         const userToUpdate = await prisma.user.findUnique({
//             where: { clerkId: clerkId },
//         });

//         const updatedUser = await prisma.user.update({
//             where: {
//                 clerkId: clerkId,
//             },
//             data: user,
//         });

//         if (!updatedUser) throw new Error("User update failed");

//         return JSON.parse(JSON.stringify(updatedUser));
//     } catch (error) {
//         handleError(error);
//     }
// }

// // DELETE
// export async function deleteUser(clerkId: string) {
//   try {
//     const prisma = new PrismaClient();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// // USE CREDITS
// export async function updateCredits(userId: string, creditFee: number) {
//   try {
//     const prisma = new PrismaClient();

//     const updatedUserCredits = await User.findOneAndUpdate(
//       { _id: userId },
//       { $inc: { creditBalance: creditFee }},
//       { new: true }
//     )

//     if(!updatedUserCredits) throw new Error("User credits update failed");

//     return JSON.parse(JSON.stringify(updatedUserCredits));
//   } catch (error) {
//     handleError(error);
//   }
// }
