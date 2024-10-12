import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(username: string, password: string, role: string): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
}
