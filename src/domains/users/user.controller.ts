import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserSchema, GetUserSchema, UpdateUserSchema } from "./user.schema";
import { Types } from "mongoose";

@Controller("user")
export class UserController{
    constructor( private readonly userService:UserService){}
    
    
    @Post()
    @HttpCode(201)
    async createUser(@Body() createUserDto:CreateUserSchema){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @HttpCode(200)
    async getAllUser(@Body() getUserDto:GetUserSchema){
        return this.userService.getAllUser(getUserDto);
    }

    @Get(":_id")
    @HttpCode(200)
    async getUser(@Param("_id") _id:Types.ObjectId){
        return this.userService.getUser(_id);
    }

    @Put(":_id")
    @HttpCode(200)
    async updateUser(@Body() updateUserDto:UpdateUserSchema){
        return this.userService.updateUser(updateUserDto);
    }

    @Delete(":_id")
    @HttpCode(200)
    async deleteUser(@Param("_id") _id:Types.ObjectId){
        return this.userService.deleteUser(_id);
    }
}