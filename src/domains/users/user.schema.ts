import * as z from 'zod';
import { ECurrentStatus } from './user.interface';
import { isValidObjectId, Types } from 'mongoose';

export const createUserSchema = z.object({
    mobile: z.string().trim().min(10, "Mobile number must be at least 10 digits long"),
});

export const updateUserSchema = z.object({
    _id: z.string().refine(isValidObjectId, "Invalid ObjectId").transform((id) => new Types.ObjectId(id)),
    name: z.string().trim().min(3, "Name must be at least 3 characters long").optional(),
    email: z.string().trim().email("Invalid email address").optional(),
    avatar: z.string().trim().optional(),
});

export const getAllUserSchema = z.object({
    currentStatus: z.enum(ECurrentStatus).optional(),
    search: z.string().trim().optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional(),
}).refine((data)=>{
    if(data.page && !data.limit){
        data.limit = 10;
    }
    if(data.limit && !data.page){
        data.page = 1;
    }
    return true;
})

export const idSchema = z.object({
    _id: z.string().refine(isValidObjectId, "Invalid ObjectId").transform((id) => new Types.ObjectId(id)),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type GetAllUserSchema = z.infer<typeof getAllUserSchema>;
export type IdSchema = z.infer<typeof idSchema>;
