import { Request, Response, NextFunction } from "express";
import { IActiveUser } from "./types";

export interface AuthenticatedRequest extends Request {
  session: any;
  user?: IActiveUser;
}

export const activeUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
