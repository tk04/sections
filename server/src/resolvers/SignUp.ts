import { context, GoogleIdToken } from "../types/types";
import { User } from "../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
import jwt from "jsonwebtoken";

@Resolver(User)
export class SignUpResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
  @Query(() => User)
  me(@Ctx() { req, prisma }: context) {
    // return prisma.user.findFirst({
    //   where: {
    //     googleId: google_id,
    //   },
    // });
  }

  @Mutation(() => User)
  async signUp(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma }: context
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

    if (data && data.data && data.data.id_token) {
      const { id_token } = data.data;
      const token_data = jwt.decode(id_token) as GoogleIdToken;
      const user = await prisma.user.findFirst({
        where: {
          googleId: token_data.sub,
        },
      });
      if (user) {
        return user;
      } else {
        const user = await prisma.user.create({
          data: {
            name: token_data.name,
            email: token_data.email,
            picture: token_data.picture,
            googleId: token_data.sub,
          },
        });
        return user;
      }
    } else {
      throw new Error("Error");
    }
  }
}
