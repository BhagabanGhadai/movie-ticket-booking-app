import { 
    QueryFilter, 
    Model, 
    UpdateWriteOpResult, 
    DeleteResult, 
    ClientSession,
    SaveOptions,
    QueryOptions,
    PipelineStage,
    AggregateOptions
} from "mongoose";

export class BaseRepository<T> {
    constructor(
        private readonly model: Model<T>,
    ) {
        this.model = model;
    }

    async startSession(): Promise<ClientSession> {
        return await this.model.db.startSession();
    }

    async create(data: Partial<T>, options?: SaveOptions): Promise<T> {
        const createMethod = this.model.create as unknown as (docs: unknown[], options?: SaveOptions) => Promise<T[]>;
        const result = await createMethod([data], options);
        return result[0];
    }

    async getOne(filter: QueryFilter<T>, options?: QueryOptions): Promise<T | null> {
        let query = this.model.findOne(filter);
        if (options?.session) {
            query = query.session(options.session);
        }
        const result = await query.lean();
        return result as T | null;
    }

    async getAll(filter: QueryFilter<T>, options?: QueryOptions): Promise<T[]> {
        let query = this.model.find(filter);
        if (options?.session) {
            query = query.session(options.session);
        }
        const result = await query.lean();
        return result as T[];
    }

    async updateOne(filter: QueryFilter<T>, update: Partial<T>, options?: QueryOptions): Promise<T | null> {
        const result = await this.model.findOneAndUpdate(filter, update, { new: true, ...options }).lean();
        return result as T | null;
    }

    async updateMany(filter: QueryFilter<T>, update: Partial<T>, options?: QueryOptions): Promise<UpdateWriteOpResult> {
        const result = await this.model.updateMany(filter, update, options as unknown as Record<string, unknown>).lean();
        return result;
    }

    async hardDelete(filter: QueryFilter<T>, options?: QueryOptions): Promise<T | null> {
        const result = await this.model.findOneAndDelete(filter, options).lean();
        return result as T | null;
    }

    async softDelete(filter: QueryFilter<T>, options?: QueryOptions): Promise<T | null> {
        const result = await this.model.findOneAndUpdate(
            filter, 
            {
                currentStatus: "delete",
                deletedAt: new Date()
            } as unknown as Partial<T>, 
            { new: true, ...options }
        ).lean();
        return result as T | null;
    }

    async deleteMany(filter: QueryFilter<T>, options?: QueryOptions): Promise<DeleteResult> {
        const result = await this.model.deleteMany(filter, options as unknown as Record<string, unknown>).lean();
        return result;
    }

    async countDocuments(filter: QueryFilter<T>, options?: QueryOptions): Promise<number> {
        const result = await this.model.countDocuments(filter, options as unknown as Record<string, unknown>);
        return result;
    }

    async aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<T[]> {
        let aggregation = this.model.aggregate(pipeline);
        if (options?.session) {
            aggregation = aggregation.session(options.session);
        }
        const result = await aggregation;
        return result;
    }
}