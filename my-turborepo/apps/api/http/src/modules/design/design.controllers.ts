import { responsePayloadI } from "@repo/shared-constants/dist/interface";
import {
  createAvatarZ,
  createElementZ,
} from "@repo/zod-schema/dist/zod-schema/src/index.js";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { createAvatar, createElement } from "./design.services.js";

export const createAvatarHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  console.info("createAvatarHandler Request Incoming.....");
  let responsePayload: responsePayloadI;

  try {
    const safeParsed = createAvatarZ.safeParse(req.body);

    if (!safeParsed.success) {
      console.error("Request payload schema safe-parsed failed");
      responsePayload = {
        status: "error",
        message: "Invalid request",
        error: { details: [safeParsed.error] },
      };
      return res.status(400).json(responsePayload);
    }
    console.info("Request payload schema safe-parsed successfully");

    const { isSuccess, data } = await createAvatar({
      img: safeParsed.data.img,
      title: safeParsed.data.title,
    });

    if (!isSuccess) {
      throw {};
    }

    responsePayload = {
      status: "success",
      message: "Avatar created successfully",
      data: { ...data },
    };
    return res.status(200).json(responsePayload);
  } catch (err) {
    console.log("inside catch");
    console.error(err);
    responsePayload = { status: "error", message: "Something went wrong" };
    return res.status(500).json(responsePayload);
  }
};

export const createElementHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  console.info("createElementHandler Request Incoming.....");
  let responsePayload: responsePayloadI;

  try {
    const safeParsed = createElementZ.safeParse(req.body);

    if (!safeParsed.success) {
      console.error("Request payload schema safe-parsed failed");
      responsePayload = {
        status: "error",
        message: "Invalid request",
        error: { details: [safeParsed.error] },
      };
      return res.status(400).json(responsePayload);
    }
    console.info("Request payload schema safe-parsed successfully");

    const { isSuccess, data } = await createElement({
      ...safeParsed.data,
    });

    if (!isSuccess) {
      throw {};
    }

    responsePayload = {
      status: "success",
      message: "Element created successfully",
      data: { ...data },
    };
    return res.status(200).json(responsePayload);
  } catch (err) {
    console.log("inside catch");
    console.error(err);
    responsePayload = { status: "error", message: "Something went wrong" };
    return res.status(500).json(responsePayload);
  }
};
