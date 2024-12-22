import { NextFunction } from "express";

export const authorizeAdmin = (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
): void => {
  next();
};

export const authenticated = (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
): void => {
  next();
};
