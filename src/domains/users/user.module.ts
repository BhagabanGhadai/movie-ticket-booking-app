import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    providers:[UserRepository,UserService,UserController],
    exports:[UserRepository]
})
export class UserModule {}