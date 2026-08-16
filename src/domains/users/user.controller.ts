import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserSchema, CreateUserSchema, GetAllUserSchema, UpdateUserSchema,getAllUserSchema,updateUserSchema, idSchema, IdSchema} from "./user.schema";
import { ZodValidationPipe } from "src/core/pipes";
import { UserDocument } from "./user.entity";

@Controller("user")
export class UserController{
    constructor( private readonly userService:UserService){}
    
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe<CreateUserSchema>(createUserSchema))
    async createUser(@Body() createUserDto:CreateUserSchema):Promise<UserDocument>{
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe<GetAllUserSchema>(getAllUserSchema))
    async getAllUser(@Body() getUserDto:GetAllUserSchema):Promise<UserDocument[]>{
        return this.userService.getAllUser(getUserDto);
    }

    @Get(":_id")
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe<IdSchema>(idSchema))
    async getUser(@Param() idDto: IdSchema):Promise<UserDocument | null>{
        return this.userService.getUser(idDto);
    }

    @Patch()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe<UpdateUserSchema>(updateUserSchema))
    async updateUser(@Body() updateUserDto:UpdateUserSchema):Promise<UserDocument | null>{
        return this.userService.updateUser(updateUserDto);
    }

    @Delete(":_id")
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe<IdSchema>(idSchema))
    async deleteUser(@Param() idDto: IdSchema):Promise<UserDocument | null>{
        return this.userService.deleteUser(idDto);
    }
}