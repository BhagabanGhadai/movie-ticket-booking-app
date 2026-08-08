import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetUserSchema, UpdateUserSchema } from "./user.schema";

export class UserService{
    constructor(private readonly userRepository:UserRepository){}
    
    async createUser(createUserSchema:CreateUserSchema){

    }

    async getAllUser(getUserSchema:GetUserSchema){

    }

    async getUser(_id:Types.ObjectId){
        
    }

    async updateUser(updateUserSchema:UpdateUserSchema){
        
    }

    async deleteUser(_id:Types.ObjectId){
        
    }
}