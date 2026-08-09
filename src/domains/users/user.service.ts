import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetAllUserSchema, IdSchema, UpdateUserSchema } from "./user.schema";

export class UserService{
    constructor(private readonly userRepository:UserRepository){}
    
    async createUser(createUserSchema:CreateUserSchema){

    }

    async getAllUser(getUserSchema:GetAllUserSchema){

    }

    async getUser(idDto:IdSchema){
        return await this.userRepository.getOne(idDto)
    }

    async updateUser(updateUserSchema:UpdateUserSchema){
        
    }

    async deleteUser(idDto:IdSchema){
        return await this.userRepository.softDelete(idDto);
    }
}