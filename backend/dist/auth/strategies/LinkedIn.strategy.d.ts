import { Strategy } from 'passport-linkedin-oauth2';
type VerifyCallback = (error: any, user?: any, info?: any) => void;
declare const LinkedInStrategy_base: new (...args: any[]) => Strategy;
export declare class LinkedInStrategy extends LinkedInStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
