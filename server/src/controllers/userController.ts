/* eslint-disable @typescript-eslint/no-namespace */

import prisma from "../lib/prisma";

import { Request, Response } from "express";

import { StrictAuthProp } from "@clerk/clerk-sdk-node";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const getUserGuildIds = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  // const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allGuildIds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    const guildIdArr = allGuildIds.map((guild) => guild.id);

    res.json(guildIdArr);
  } catch (error) {
    console.error("Error fetching guilds:", error);
    res.status(500).json({ error: "Failed to fetch all guilds" });
  }
};

const getUserChannelIds = async (req: Request, res: Response) => {
  // const userId = req.auth.userId;
  const userId = "user_2kvgB9d6HPZNSZGsGDf02nYSx12";

  try {
    const allGuilds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        categories: {
          include: {
            channels: true,
          },
        },
      },
    });

    const channelIds = allGuilds.map((guild) => {
      return guild.categories.map((category) => {
        return category.channels.map((channel) => {
          return channel.id;
        });
      });
    });

    res.json(channelIds.flat(2));
  } catch (error) {
    console.error("Error fetching user channels:", error);
    res.status(500).json({ error: "Failed to fetch user channels" + error });
  }
};

// https://one-crayfish-powerful.ngrok-free.app

// const signUpUser = async (req: Request, res: Response) => {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
//     );
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET);

//   // Get headers and body
//   const headers = req.headers;
//   const payload = req.body;

//   // Get Svix headers for verification
//   const svix_id = headers["svix-id"];
//   const svix_timestamp = headers["svix-timestamp"];
//   const svix_signature = headers["svix-signature"];

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return void res.status(400).json({
//       success: false,
//       message: "Error: Missing svix headers",
//     });
//   }

//   let evt: WebhookEvent;

//   // Attempt to verify the incoming webhook
//   // If successful, the payload will be available from 'evt'
//   // If verification fails, error out and return error code
//   try {
//     evt = wh.verify(payload, {
//       "svix-id": svix_id as string,
//       "svix-timestamp": svix_timestamp as string,
//       "svix-signature": svix_signature as string,
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log("Error: Could not verify webhook:", err.message);
//       return void res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data;
//   const eventType = evt.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log("Webhook payload:", evt.data);

//   return void res.status(200).json({
//     success: true,
//     message: "Webhook received",
//   });
// };

export { getUserGuildIds, getUserChannelIds };
