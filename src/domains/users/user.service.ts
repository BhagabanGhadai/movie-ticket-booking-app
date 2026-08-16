import { Types } from "mongoose";
import { UserRepository } from "./user.repository";
import { CreateUserSchema, GetAllUserSchema, IdSchema, UpdateUserSchema } from "./user.schema";
import { UserDocument } from "./user.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserHelper } from "./user.helper";

@Injectable()
export class UserService{
    constructor(private readonly userRepository:UserRepository,private readonly userHelper:UserHelper){}

    async createUser(createUserDto:CreateUserSchema):Promise<UserDocument>{
        const checkUser = await this.userRepository.getOne({mobile:createUserDto.mobile})
        if(checkUser){
            throw new BadRequestException("User already exists")
        }
        const payload=await this.userHelper.generateUserPayload(createUserDto)
        return await this.userRepository.create(payload)
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

    async getUserByMobile(mobile:string):Promise<UserDocument | null>{
        return await this.userRepository.getOne({mobile})
    }
}