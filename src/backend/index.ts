// create simple express server
import { ChainUser } from "@gala-chain/client";
import express from "express";

import { ImageNFTController } from "./controller";
import { userModel } from "./db";
import { client } from "./fabric-client";

const app = express();
const port = 4000;

const authenticated = async (req: any, res: any, next: any) => {
  const user = new ChainUser({
    privateKey: process.env.DEV_ADMIN_PRIVATE_KEY ?? ""
  });
  req.user = user;
  next();
};

app.get("/", authenticated, async (req, res) => {
  return ImageNFTController.getAllImages(req, res);
});

app.get("/plant-apple", async (req, res) => {
  // create new nft

  res.send("createNFT");
});

app.get("/:id", (req, res) => {
  // get image from description
});

app.post("/sign-up", async (req, res) => {
  const { username } = req.body;
  const user = new ChainUser({
    name: username,
    privateKey: process.env.DEV_ADMIN_PRIVATE_KEY ?? ""
  });
  await userModel.createUser(user);
  res.send(user.publicKey);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
