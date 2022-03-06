import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field()
  name: string;
  @Field()
  title: string;
  @Field()
  age: number;
  constructor(name: string, title: string, age: number) {
    this.name = name;
    this.title = title;
    this.age = age;
  }
}
