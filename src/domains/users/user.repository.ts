import { BaseRepository } from "src/core/repositories";
import { User } from "./entities/user";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel(User.name) model:Model<User>) {
        super(model);
    }
}