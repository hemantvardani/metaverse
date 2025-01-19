import { getPrismaClient } from "@repo/orm/dist";
import { responsePayloadI } from "@repo/shared-constants/dist/interface";
import { ERole } from "@repo/shared-constants/dist/enum.js";

import { NextFunction, Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import { JWT_SECRET_KEY } from "../constants/index.constants.js";

/**
 *
 * @param req - headers {authorization:`Bearer ${token}`}
 * @param res
 * @param next
 * @returns
 */
export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    console.log("inside authorizeAdmin middleware");
    const headers = req.headers;
    const authToken: boolean = Boolean(
      headers?.authorization?.startsWith("Bearer "),
    );

    let responsePayload: responsePayloadI;

    if (authToken) {
      const token = headers.authorization?.split(" ")[1] ?? "";
      const decodedInfo: JwtPayload = verify(
        token,
        JWT_SECRET_KEY,
      ) as JwtPayload;

      const prismaClient = getPrismaClient();

      console.log("querying uuid", decodedInfo.uuid);

      const user = await prismaClient.user.findFirst({
        where: { uuid: decodedInfo.uuid },
      });
      if (!user) {
        responsePayload = { status: "error", message: "Bad request" };
        return res.status(400).json(responsePayload);
      }

      if (user.role != ERole.ADMIN) {
        responsePayload = { status: "error", message: "User not authorized" };
        console.log("user.role != ERole.ADMIN");
        return res.status(403).json(responsePayload);
      }

      req.headers = { ...req.headers, ...decodedInfo };

      next();
    } else {
      responsePayload = { status: "error", message: "User unauthenticated" };
      console.log("User unauthenticated");
      return res.status(401).json(responsePayload);
    }
  } catch {
    return res.status(500).send();
  }
};

/**
 *
 * @param req - headers {authorization:`Bearer ${token}`}
 * @param res
 * @param next
 * @returns
 */
export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    console.log("inside authenticated middleware");

    const headers = req.headers;
    const authToken: boolean = Boolean(
      headers?.authorization?.startsWith("Bearer "),
    );
    let responsePayload: responsePayloadI;
    if (authToken) {
      const token = headers.authorization?.split(" ")[1] ?? "";
      const decodedInfo: JwtPayload = verify(
        token,
        JWT_SECRET_KEY,
      ) as JwtPayload;
      const prismaClient = getPrismaClient();

      console.log("querying uuid ", decodedInfo.uuid);
      await prismaClient.user.findFirstOrThrow({
        where: { uuid: decodedInfo.uuid },
      });

      req.headers = { ...req.headers, ...decodedInfo };

      next();
    } else {
      responsePayload = { status: "error", message: "User unauthenticated" };
      console.log("User unauthenticated");
      return res.status(401).json(responsePayload);
    }
  } catch {
    return res.status(500).send();
  }
};
