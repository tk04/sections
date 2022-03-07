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
const user_1 = require("../entities/user");
const type_graphql_1 = require("type-graphql");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
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
    async signUp(code, { prisma, res }) {
        const data = await (0, axios_1.default)({
            url: "https://oauth2.googleapis.com/token",
            method: "POST",
            data: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${"http://localhost:3000/cb"}&grant_type=authorization_code`,
        }).catch((e) => console.log(e));
        let user;
        if (data && data.data && data.data.id_token) {
            const { id_token } = data.data;
            const token_data = jsonwebtoken_1.default.decode(id_token);
            user = await prisma.user.findFirst({
                where: {
                    googleId: token_data.sub,
                },
            });
            if (!user) {
                const user = await prisma.user.create({
                    data: {
                        name: token_data.name,
                        email: token_data.email,
                        picture: token_data.picture,
                        googleId: token_data.sub,
                    },
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });
            return user;
        }
        else {
            throw new Error("Error");
        }
    }
    async signInWithTwitter(code, { prisma }) {
        const data = await (0, axios_1.default)({
            method: "POST",
            url: "https://api.twitter.com/2/oauth2/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: `code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/twitter_cb&code_verifier=challenge&client_id=${process.env.TWITTER_CLIENT_ID}`,
        });
        if (data.data) {
            console.log(data.data);
            const userInfo = await (0, axios_1.default)({
                method: "GET",
                url: "https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,verified",
                headers: {
                    Authorization: `Bearer ${data.data.access_token}`,
                },
            });
            console.log(userInfo);
            const user = await prisma.user.create({
                data: {
                    name: userInfo.data.data.name,
                    email: userInfo.data.data.email,
                    picture: userInfo.data.data.profile_image_url,
                    twitterId: userInfo.data.data.id,
                },
            });
            console.log(user);
        }
        return true;
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
    __param(0, (0, type_graphql_1.Arg)("code", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "signUp", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
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
