import { Arg, Mutation } from "type-graphql";
import axios from "axios";
import jwt from "jsonwebtoken";
export class SignUpResolver {
  @Mutation(() => Boolean)
  async signUp(@Arg("code", () => String) code: string) {
    const data = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      data: `code=${code}&client_id=${
        process.env.GOOGLE_CLIENT_ID
      }&client_secret=${
        process.env.GOOGLE_CLIENT_SECRET
      }&redirect_uri=${"http://localhost:3000/cb"}&grant_type=authorization_code`,
    }).catch((e) => console.log(e));

    if (data) {
      console.log("DATA: ", data.data);
      const { id_token } = data.data;
      const token_data = jwt.decode(id_token);
      console.log("DECODED TOKEN: ", token_data);
    }
    return true;
  }
}
