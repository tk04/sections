import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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
  req: Request;
  res: Response;
}
