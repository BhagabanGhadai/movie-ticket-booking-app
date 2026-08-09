import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserSchema, CreateUserSchema, GetAllUserSchema, UpdateUserSchema,getAllUserSchema,updateUserSchema} from "./user.schema";
import { Types } from "mongoose";
import { ZodValidationPipe } from "src/core/pipes";

@Controller("user")
export class UserController{
    constructor( private readonly userService:UserService){}
    
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async createUser(@Body() createUserDto:CreateUserSchema){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(getAllUserSchema))
    async getAllUser(@Body() getUserDto:GetAllUserSchema){
        return this.userService.getAllUser(getUserDto);
    }

    @Get(":_id")
    @HttpCode(200)
    async getUser(@Param("_id") _id:Types.ObjectId){
        return this.userService.getUser(_id);
    }

    @Put(":_id")
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    async updateUser(@Body() updateUserDto:UpdateUserSchema){
        return this.userService.updateUser(updateUserDto);
    }

    @Delete(":_id")
    @HttpCode(200)
    async deleteUser(@Param("_id") _id:Types.ObjectId){
        return this.userService.deleteUser(_id);
    }
}