import { context, GoogleIdToken } from "../types/types";
import { User } from "../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { setToken } from "../utils/setToken";
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
      setToken(user!.id, res);
      return user;
    } else {
      throw new Error("Error");
    }
  }

  @Mutation(() => User)
  async signInWithTwitter(
    @Arg("code", () => String) code: string,
    @Ctx() { prisma, res }: context
  ) {
    const data = await axios({
      method: "POST",
      url: "https://api.twitter.com/2/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/twitter_cb&code_verifier=challenge&client_id=${process.env.TWITTER_CLIENT_ID}`,
    });
    if (data.data) {
      console.log(data.data);
      const userInfo = await axios({
        method: "GET",
        url: "https://api.twitter.com/2/users/me?user.fields=profile_image_url,name,verified,public_metrics",
        headers: {
          Authorization: `Bearer ${data.data.access_token}`,
        },
      });
      console.log("PUBLIC_METRICS: ", userInfo.data.data.public_metrics);
      let user = await prisma.user.findFirst({
        where: { twitterId: userInfo.data.data.id },
      });
      if (user) {
      } else {
        user = await prisma.user.create({
          data: {
            name: userInfo.data.data.name,
            email: userInfo.data.data.email,
            picture: userInfo.data.data.profile_image_url,
            twitterId: userInfo.data.data.id,
            twitterAccessToken: data.data.access_token,
          },
        });
      }
      setToken(user!.id, res);
      return user;
    } else {
      throw new Error("Could not authenticate with Twitter");
    }
  }
}
