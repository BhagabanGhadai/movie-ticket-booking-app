import { BaseRepository } from "src/core/repositories";
import { User, UserDocument } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) model:Model<UserDocument>) {
        super(model);
    }
}