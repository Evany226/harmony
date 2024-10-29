import { Request, Response } from "express";

const uploadGuildImage = (req: Request, res: Response) => {
  // Your upload logic here
  // const { guildId } = req.body as { guildId: string };
  const file = req.file as Express.MulterS3.File;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // You can save the file information to your database here if needed

  const imageUrl = "https://eyharmony.nyc3.digitaloceanspaces.com/";

  console.log(file.location);

  res.json(imageUrl);
};

export { uploadGuildImage };
