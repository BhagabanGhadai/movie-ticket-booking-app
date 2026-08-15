import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetAllUserSchema, IdSchema, UpdateUserSchema } from "./user.schema";
import { UserDocument } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(private readonly userRepository:UserRepository){}

    async createUser(createUserDto:CreateUserSchema):Promise<UserDocument>{
        return await this.userRepository.create(createUserDto)
    }

    async getAllUser(getUserDto:GetAllUserSchema):Promise<UserDocument[]>{
        return await this.userRepository.getAll(getUserDto)
    }

    async getUser(idDto:IdSchema):Promise<UserDocument | null>{
        return await this.userRepository.getOne(idDto)
    }

    async updateUser(updateUserDto:UpdateUserSchema):Promise<UserDocument | null>{
        return await this.userRepository.updateOne({_id:updateUserDto._id},updateUserDto)
    }

    async deleteUser(idDto:IdSchema):Promise<UserDocument | null>{
        return await this.userRepository.softDelete(idDto);
    }
}