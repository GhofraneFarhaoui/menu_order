import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(body: {
        username: string;
        password: string;
        role: string;
    }): Promise<import("./entities/user.entity").User>;
}
