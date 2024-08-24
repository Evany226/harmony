/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import cors from "cors";
import friendsRouter from "./routes/friendRoutes";
import requestRouter from "./routes/requestRoute";

import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import express, { Request } from "express";

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
app.use("/api/requests", requestRouter);

const PORT = 3001;

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);
