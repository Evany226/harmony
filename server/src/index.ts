/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import friendsRouter from "./controllers/friends";
import friendRequestsRouter from "./controllers/friendRequests";
import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import express, { Request, Response, NextFunction } from "express";

//https://clerk.com/docs/backend-requests/handling/nodejs
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  "/",
  ClerkExpressRequireAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  (req: RequireAuthProp<Request>, res) => {
    // Your route handler logic
    res.json(req.auth.userId);
  }
);

app.use("/api/friends", friendsRouter);

app.use("/api/friend-requests", friendRequestsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(401).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);
