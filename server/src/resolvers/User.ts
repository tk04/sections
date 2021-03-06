import argon2 from "argon2";
import "dotenv/config";
import jwt from "jsonwebtoken";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/user";
import { auth } from "../middleware/auth";
import { context } from "../types/types";
import { GoogleLogin } from "../utils/GoogleLogin";
import { setToken } from "../utils/setToken";
import { TwitterLogin } from "../utils/TwitterLogin";

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
class updateInput {
  @Field()
  name: string;
  @Field()
  email: string;
}
@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class UserError {
  @Field()
  path: string;
  @Field()
  message: string;
}
@ObjectType()
class FullUser extends User {
  @Field()
  twitter: boolean;
  @Field()
  google: boolean;
}
const UserResponse = createUnionType({
  name: "UserResponse",
  types: () => [FullUser, UserError],
  resolveType: (value) => {
    if ("email" in value || "name" in value) return FullUser;
    if ("path" in value) return UserError;
  },
});
@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
  @Query(() => FullUser, { nullable: true })
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

      // response.google = !!user.googleId;
      if (user) {
        const response: FullUser = {
          ...user,
          twitter: !!user.twitterId,
          google: !!user.googleId,
        };

        return response;
      } else {
        return null;
      }
    }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(auth)
  async updateMe(
    @Ctx() { prisma, req }: context,
    @Arg("input") input: updateInput
  ) {
    try {
      const user = await prisma.user.update({
        where: { id: req!.user!.id },
        data: input,
      });
      const response: FullUser = {
        ...user,
        twitter: !!user.twitterId,
        google: !!user.googleId,
      };

      return response;
    } catch (e) {
      return {
        path: "update",
        message: "Could not update user",
      } as UserError;
    }
  }

  @Mutation(() => UserResponse)
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
      return {
        path: "email",
        message: "Email already in use: try a different email",
      } as UserError;
    }
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput,
    @Ctx() { res, prisma }: context
  ) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: input.email.toLowerCase() },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password) {
        const valid = await argon2.verify(user.password!, input.password);

        if (!valid) {
          throw new Error("Could not login user");
        } else {
          setToken(user.id, res);
          const response: FullUser = {
            ...user,
            twitter: !!user.twitterId,
            google: !!user.googleId,
          };
          return response;
        }
      } else {
        throw new Error("Could not login user");
      }
    } catch (e) {
      return {
        path: "login",
        message: "Could not login user",
      } as UserError;
    }
  }

  @Mutation(() => UserResponse)
  async signInWithGoogle(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma, res }: context
  ) {
    try {
      const user = await GoogleLogin(code, prisma);
      setToken(user!.id, res);
      const response: FullUser = {
        ...user,
        twitter: !!user.twitterId,
        google: !!user.googleId,
      };
      return response;
    } catch (e) {
      return {
        path: "Google Login",
        message: "Could not authenticate with Google",
      };
    }
  }

  @Mutation(() => UserResponse)
  async signInWithTwitter(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma, res }: context
  ) {
    try {
      const user = await TwitterLogin(code, prisma).catch((e) => {
        throw new Error(e.message);
      });
      setToken(user!.id, res);
      if (user) {
        const response: FullUser = {
          ...user,
          twitter: !!user.twitterId,
          google: !!user.googleId,
        };
        return response;
      } else {
        throw new Error("user not found");
      }
    } catch (e) {
      return {
        path: "Twitter Login",
        message: "Could not authenticate with Twitter",
      };
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { res }: context) {
    res.clearCookie("token", {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      domain:
        process.env.NODE_ENV === "production"
          ? "sections1.vercel.app"
          : undefined,
    });
    return true;
  }
}
