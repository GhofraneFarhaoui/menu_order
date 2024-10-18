import { Strategy } from 'passport-google-oauth20';
type VerifyCallback = (error: any, user?: any, info?: any) => void;
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
