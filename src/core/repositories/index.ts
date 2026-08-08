import { QueryFilter, Model, UpdateWriteOpResult, DeleteResult } from "mongoose";

export class BaseRepository<T> {
    constructor(
        private readonly model:Model<T>,
    ){
        this.model = model
    }

    async create(data:Partial<T>):Promise<T>{
        const result = await this.model.create(data);
        return result;
    }

    async getOne(filter: QueryFilter<T>):Promise<T|null>{
        const result = await this.model.findOne(filter).lean();
        return result;
    }

    async getAll(filter: QueryFilter<T>):Promise<T[]>{
        const result = await this.model.find(filter).lean();
        return result;
    }

    async updateOne(filter: QueryFilter<T>,update:Partial<T>,options?:any):Promise<T|null>{
        const result = await this.model.findOneAndUpdate(filter,update,{new:true,...options}).lean();
        return result;
    }

    async updateMany(filter: QueryFilter<T>,update:Partial<T>,options?:any):Promise<UpdateWriteOpResult>{
        const result = await this.model.updateMany(filter,update,options).lean();
        return result;
    }

    async hardDelete(filter: QueryFilter<T>):Promise<T|null>{
        const result = await this.model.findOneAndDelete(filter).lean();
        return result;
    }

    async softDelete(filter: QueryFilter<T>):Promise<T|null>{
        const result = await this.model.findOneAndUpdate(filter,{
            currentStatus:"delete",
            deletedAt:new Date()
        }).lean();
        return result;
    }

    async deleteMany(filter: QueryFilter<T>):Promise<DeleteResult>{
        const result = await this.model.deleteMany(filter).lean();
        return result;
    }

    async countDocuments(filter: QueryFilter<T>):Promise<number>{
        const result = await this.model.countDocuments(filter);
        return result;
    }

    async aggregate(pipeline:any[]):Promise<T[]>{
        const result = await this.model.aggregate(pipeline);
        return result;
    }   
}