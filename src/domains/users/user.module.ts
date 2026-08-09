import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers:[UserController],
    providers:[UserRepository,UserService],
    exports:[UserRepository,UserService]
})
export class UserModule {}