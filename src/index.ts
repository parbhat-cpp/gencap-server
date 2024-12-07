import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import config from "./common/config";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = config.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Running on port:", PORT);
});
