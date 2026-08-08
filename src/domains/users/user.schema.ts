import * as z from 'zod';
import { ECurrentStatus } from './user.interface';
import { Types } from 'mongoose';

export const createUserSchema = z.object({
    mobile: z.string().min(10, "Mobile number must be at least 10 digits long"),
});

export const updateUserSchema = z.object({
    _id: z.string().transform((id) => new Types.ObjectId(id)),
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    email: z.string().email("Invalid email address").optional(),
    avatar: z.string().optional(),
});

export const getUserSchema = z.object({
    currentStatus: z.enum(ECurrentStatus).optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
}).refine((data)=>{
    if(data.page && !data.limit){
        data.limit = 10;
    }
    if(data.limit && !data.page){
        data.page = 1;
    }
    return true;
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type GetUserSchema = z.infer<typeof getUserSchema>;
