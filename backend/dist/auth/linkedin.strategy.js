"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedInStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const auth_service_1 = require("./auth.service");
let LinkedInStrategy = class LinkedInStrategy extends (0, passport_1.PassportStrategy)(passport_linkedin_oauth2_1.Strategy, 'linkedin') {
    constructor(authService) {
        super({
            clientID: 'LINKEDIN_CLIENT_ID',
            clientSecret: 'LINKEDIN_CLIENT_SECRET',
            callbackURL: 'http://localhost:3000/auth/linkedin/callback',
            scope: ['r_emailaddress', 'r_liteprofile'],
        });
        this.authService = authService;
    }
    validate(accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, emails } = profile;
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
            };
            const validatedUser = yield this.authService.validateOAuthUser(user);
            done(null, validatedUser);
        });
    }
};
LinkedInStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LinkedInStrategy);
exports.LinkedInStrategy = LinkedInStrategy;
