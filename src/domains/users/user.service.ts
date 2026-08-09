import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetAllUserSchema, UpdateUserSchema } from "./user.schema";

export class UserService{
    constructor(private readonly userRepository:UserRepository){}
    
    async createUser(createUserSchema:CreateUserSchema){

    }

    async getAllUser(getUserSchema:GetAllUserSchema){

    }

    async getUser(_id:Types.ObjectId){
        
    }

    async updateUser(updateUserSchema:UpdateUserSchema){
        
    }

    async deleteUser(_id:Types.ObjectId){
        
    }
}