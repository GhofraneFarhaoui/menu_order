import { AuthService } from './auth.service';
declare const LinkedInStrategy_base: new (...args: any[]) => any;
export declare class LinkedInStrategy extends LinkedInStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<void>;
}
export {};
