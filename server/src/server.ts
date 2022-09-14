import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import {
  convertHourStringToMinutesNumber,
  convertMinutesNumberToHourString,
} from "./utils/formatTime";

config();
const app = express();
const prisma = new PrismaClient();

app.use(json());
app.use(cors());

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesNumberToHourString(ad.hourStart),
      hourEnd: convertMinutesNumberToHourString(ad.hourEnd),
    }))
  );
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourEnd,
    hourStart,
    useVoiceChannel,
  } = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourEnd: convertHourStringToMinutesNumber(hourEnd),
      hourStart: convertHourStringToMinutesNumber(hourStart),
      useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const discord = await prisma.ad.findUnique({
    where: {
      id: adId,
    },
    select: {
      discord: true,
    },
  });
  return res.json(discord);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
