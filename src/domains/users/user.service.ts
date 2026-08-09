import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetAllUserSchema, IdSchema, UpdateUserSchema } from "./user.schema";

export class UserService{
    constructor(private readonly userRepository:UserRepository){}

    async createUser(createUserDto:CreateUserSchema){
        return await this.userRepository.create(createUserDto)
    }

    async getAllUser(getUserDto:GetAllUserSchema){
        return await this.userRepository.getAll(getUserDto)
    }

    async getUser(idDto:IdSchema){
        return await this.userRepository.getOne(idDto)
    }

    async updateUser(updateUserDto:UpdateUserSchema){
        return await this.userRepository.updateOne({_id:updateUserDto._id},updateUserDto)
    }

    async deleteUser(idDto:IdSchema){
        return await this.userRepository.softDelete(idDto);
    }
}