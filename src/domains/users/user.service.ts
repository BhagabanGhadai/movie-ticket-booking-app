import { UserRepository } from "./user.repository";

export class UserService{
    private readonly userRepository:UserRepository;

    constructor(userRepository:UserRepository){
        this.userRepository=userRepository;
    }
    
}