import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserHelper } from "./user.helper";

@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers:[UserController],
    providers:[UserRepository,UserService,UserHelper],
    exports:[UserRepository,UserService,UserHelper]
})
export class UserModule {}