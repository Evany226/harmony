import { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import { NextFunction } from "express";

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY || "",
    secretAccessKey: process.env.SPACES_SECRET || "",
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "eyharmony",
    acl: "public-read",

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      console.log(file);
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const multerErrorHandling = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    console.error(err);
  } else {
    console.error("Error occurred during file upload:", err);
    if (err.stack) {
      console.error("Stack trace:", err.stack);
    }
    next(err);
  }
};
