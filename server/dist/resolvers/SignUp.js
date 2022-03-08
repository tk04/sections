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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpResolver = void 0;
const TwitterLogin_1 = require("./../utils/TwitterLogin");
const argon2_1 = __importDefault(require("argon2"));
const user_1 = require("../entities/user");
const type_graphql_1 = require("type-graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const setToken_1 = require("../utils/setToken");
const GoogleLogin_1 = require("../utils/GoogleLogin");
let SignupInput = class SignupInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignupInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignupInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SignupInput.prototype, "password", void 0);
SignupInput = __decorate([
    (0, type_graphql_1.InputType)()
], SignupInput);
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let SignUpResolver = class SignUpResolver {
    hello() {
        return "Hello World";
    }
    async me({ req, prisma }) {
        const token = req.cookies.token;
        if (token) {
            const { userId } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        }
    }
    async signup(input, { prisma, res }) {
        try {
            const user = await prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email.toLowerCase(),
                    password: await argon2_1.default.hash(input.password),
                },
            });
            (0, setToken_1.setToken)(user.id, res);
            return user;
        }
        catch (e) {
            throw new Error("Could not create user");
        }
    }
    async login(input, { res, prisma }) {
        const user = await prisma.user.findFirst({
            where: { email: input.email.toLowerCase() },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password) {
            const valid = await argon2_1.default.verify(user.password, input.password);
            console.log("VAILD? ", valid);
            if (!valid) {
                throw new Error("Could not login user");
            }
            else {
                (0, setToken_1.setToken)(user.id, res);
                return user;
            }
        }
        else {
            throw new Error("Could not login user");
        }
    }
    async signInWithGoogle(code, { prisma, res }) {
        const user = await (0, GoogleLogin_1.GoogleLogin)(code, prisma).catch((e) => {
            throw new Error(e.meesage);
        });
        (0, setToken_1.setToken)(user.id, res);
        return user;
    }
    async signInWithTwitter(code, { prisma, res }) {
        const user = await (0, TwitterLogin_1.TwitterLogin)(code, prisma).catch((e) => {
            throw new Error(e.message);
        });
        (0, setToken_1.setToken)(user.id, res);
        return user;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SignUpResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("input", () => SignupInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupInput, Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "signup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("input", () => LoginInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("code", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "signInWithGoogle", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("code", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "signInWithTwitter", null);
SignUpResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], SignUpResolver);
exports.SignUpResolver = SignUpResolver;
