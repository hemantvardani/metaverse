import { responsePayloadI } from "@repo/shared-constants/dist/interface.js";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { getAllElementsList } from "./element.services.js";

/**
 *
 * @param req
 * @param res data{ elements }
 * @param next
 */
export const fetchElementListHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  console.info("fetchElementListHandler Request Incoming.....");
  let responsePayload: responsePayloadI;

  try {
    const availableElements = await getAllElementsList();
    responsePayload = {
      status: "success",
      message: "Elements list successfully fetched",
      data: { elements: availableElements },
    };
    return res.status(200).json(responsePayload);
  } catch {
    console.log("inside catch");
    return res.status(500).send();
  }
};
