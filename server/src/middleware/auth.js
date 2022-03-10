"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async ({ context }, next) => {
    const { prisma, req } = context;
    const token = req.cookies.token;
    if (token) {
        try {
            const userId = jsonwebtoken_1.default.decode(token)
                .userId;
            const user = await prisma.user.findFirst({ where: { id: userId } });
            if (!user) {
                throw new Error("User not found");
            }
            req.user = user;
        }
        catch (e) {
            throw new Error("Must be logged in");
        }
        //   const user = await
    }
};
