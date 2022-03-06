import { PrismaClient } from "@prisma/client";

export interface GoogleIdToken {
  iss: string;
  azp: string;
  sub: string;
  picture: string;
  email: string;
  given_name: string;
  name: string;
  email_verified: boolean;
}

export interface context {
  prisma: PrismaClient;
}
