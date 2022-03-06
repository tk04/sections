import { context, GoogleIdToken } from "../types/types";
import { User } from "../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
import jwt from "jsonwebtoken";
import "dotenv/config";
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
    const data = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      data: `code=${code}&client_id=${
        process.env.GOOGLE_CLIENT_ID
      }&client_secret=${
        process.env.GOOGLE_CLIENT_SECRET
      }&redirect_uri=${"http://localhost:3000/cb"}&grant_type=authorization_code`,
    }).catch((e) => console.log(e));
    let user;
    if (data && data.data && data.data.id_token) {
      const { id_token } = data.data;
      const token_data = jwt.decode(id_token) as GoogleIdToken;
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
      const token = jwt.sign({ userId: user!.id }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      });
      return user;
    } else {
      throw new Error("Error");
    }
  }
}
