import { TwitterLogin } from "./../utils/TwitterLogin";
import { context, GoogleIdToken } from "../types/types";
import argon2 from "argon2";
import { User } from "../entities/user";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

import jwt from "jsonwebtoken";
import "dotenv/config";
import { setToken } from "../utils/setToken";
import { GoogleLogin } from "../utils/GoogleLogin";

@InputType()
class SignupInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

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
  async signup(
    @Arg("input", () => SignupInput) input: SignupInput,
    @Ctx() { prisma, res }: context
  ) {
    try {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email.toLowerCase(),
          password: await argon2.hash(input.password),
        },
      });
      setToken(user.id, res);
      return user;
    } catch (e) {
      throw new Error("Could not create user");
    }
  }
  @Mutation(() => User)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput,
    @Ctx() { res, prisma }: context
  ) {
    const user = await prisma.user.findFirst({
      where: { email: input.email.toLowerCase() },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.password) {
      const valid = await argon2.verify(user.password!, input.password);
      console.log("VAILD? ", valid);
      if (!valid) {
        throw new Error("Could not login user");
      } else {
        setToken(user.id, res);
        return user;
      }
    } else {
      throw new Error("Could not login user");
    }
  }

  @Mutation(() => User)
  async signInWithGoogle(
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
