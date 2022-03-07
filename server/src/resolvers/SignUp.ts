import { TwitterLogin } from "./../utils/TwitterLogin";
import { context, GoogleIdToken } from "../types/types";
import { User } from "../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { setToken } from "../utils/setToken";
import { GoogleLogin } from "../utils/GoogleLogin";
@Resolver(User)
export class SignUpResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, prisma }: context) {
    const token = req.cookies.token;
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (user) {
        return user;
      } else {
        return null;
      }
    }
  }

  @Mutation(() => User)
  async signUp(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma, res }: context
  ) {
    const user = await GoogleLogin(code, prisma).catch((e) => {
      throw new Error(e.meesage);
    });
    setToken(user!.id, res);
    return user;
  }

  @Mutation(() => User)
  async signInWithTwitter(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma, res }: context
  ) {
    const user = await TwitterLogin(code, prisma).catch((e) => {
      throw new Error(e.message);
    });
    setToken(user!.id, res);
    return user;
  }
}
