import { Request, Response, RequestHandler, NextFunction } from "express";
import { compare, hash } from "bcrypt";

export const testFunc: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const hashed = await hash("hello", 5);
  console.log(hashed);

  console.log(await compare("hello", hashed));
  console.log(await compare("Hello", hashed));

  return res.status(200).json({});
};
