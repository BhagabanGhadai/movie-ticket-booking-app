import { BaseRepository } from "./index";
import { Model, ClientSession, PipelineStage } from "mongoose";

describe("BaseRepository Transactions", () => {
    let repository: BaseRepository<{ name: string }>;
    
    const mockModel = {
        db: {
            startSession: jest.fn().mockResolvedValue({
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                abortTransaction: jest.fn(),
                endSession: jest.fn(),
            }),
        },
        create: jest.fn().mockImplementation((docs: unknown) => {
            return Promise.resolve(docs);
        }),
        findOne: jest.fn().mockReturnValue({
            session: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue({ name: "test-user" }),
        }),
        find: jest.fn().mockReturnValue({
            session: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue([{ name: "test-user" }]),
        }),
        findOneAndUpdate: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue({ name: "updated-user" }),
        }),
        findOneAndDelete: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue({ name: "deleted-user" }),
        }),
        deleteMany: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue({ deletedCount: 1 }),
        }),
        countDocuments: jest.fn().mockResolvedValue(5),
        aggregate: jest.fn().mockReturnValue({
            session: jest.fn().mockReturnThis(),
            then: jest.fn().mockImplementation((resolve: (value: unknown) => void) => resolve([{ _id: "1", count: 5 }])),
        }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new BaseRepository<{ name: string }>(mockModel as unknown as Model<{ name: string }>);
    });

    it("should start a session via startSession method", async () => {
        const session = await repository.startSession();
        expect(mockModel.db.startSession).toHaveBeenCalled();
        expect(session).toBeDefined();
    });

    it("should pass session to create method", async () => {
        const mockSession = {} as unknown as ClientSession;
        const data = { name: "test" };
        await repository.create(data, { session: mockSession });
        expect(mockModel.create).toHaveBeenCalledWith([data], { session: mockSession });
    });

    it("should pass session to getOne method", async () => {
        const mockSession = {} as unknown as ClientSession;
        const filter = { name: "test" };
        const result = await repository.getOne(filter, { session: mockSession });
        expect(mockModel.findOne).toHaveBeenCalledWith(filter);
        expect(result).toEqual({ name: "test-user" });
    });

    it("should pass session to getAll method", async () => {
        const mockSession = {} as unknown as ClientSession;
        const filter = { name: "test" };
        const result = await repository.getAll(filter, { session: mockSession });
        expect(mockModel.find).toHaveBeenCalledWith(filter);
        expect(result).toEqual([{ name: "test-user" }]);
    });

    it("should pass session to updateOne method", async () => {
        const mockSession = {} as unknown as ClientSession;
        const filter = { name: "test" };
        const update = { name: "updated" };
        const result = await repository.updateOne(filter, update, { session: mockSession });
        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(filter, update, { new: true, session: mockSession });
        expect(result).toEqual({ name: "updated-user" });
    });

    it("should pass session to aggregate method", async () => {
        const mockSession = {} as unknown as ClientSession;
        const pipeline: PipelineStage[] = [{ $match: { name: "test" } }];
        await repository.aggregate(pipeline, { session: mockSession });
        expect(mockModel.aggregate).toHaveBeenCalledWith(pipeline);
    });
});
