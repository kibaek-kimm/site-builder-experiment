import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

const uploadDir =
  "/Users/kibaekkim/Desktop/workspace/site-builder/public/uploads";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;

    form.parse(req, (error, fields, files) => {
      if (error) {
        res
          .status(400)
          .send({ error: "Error parsing the incoming form data." });
        return;
      }

      const file = files.image;
      const ext = file.type.split("/")[1];
      const newFileName = `image-${Date.now()}.${ext}`;
      const newPath = `./public/uploads/${newFileName}`;

      fs.renameSync(file.path, newPath);

      res.status(200).send({
        message: "Image uploaded successfully",
        path: `/uploads/${newFileName}`,
      });
    });
  } else {
    res.status(405).send({ error: "Only POST method is allowed." });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => handler(req, res);
