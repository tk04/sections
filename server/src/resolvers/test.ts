import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Recipe } from "../entities/test";

@Resolver(Recipe)
export class TestResolver {
  @FieldResolver()
  name(@Root() root: Recipe) {
    console.log("ROOT: ", root);

    return "FIELD RESOLVER YAY";
  }

  @Query(() => Recipe)
  test() {
    return { name: "tk", age: 20, title: "title" };
  }
}
