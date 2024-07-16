// src/types/express-session.d.ts
import "express-session";

declare module "express-session" {
  interface SessionData {
    user: { [key: string]: any };
  }
}
