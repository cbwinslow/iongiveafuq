import express from "express";
import cors from "cors";
import artworkRouter from "./routes/artwork.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/artwork", artworkRouter);
app.use("/artwork", express.static(path.join(process.cwd(), "artwork")));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
