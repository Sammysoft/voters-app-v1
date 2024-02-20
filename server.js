import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import winston from "winston";
import morgan from "morgan";
import { initDB } from "./config/db.js";
import UserRouter from "./router/user.routes.js";

const app = express();
const port = process.env.PORT || 8082;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});


app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);

app.use(helmet())

app.listen(port, ()=>{
    initDB();
    console.log(`Server running on http://localhost:${port}`)
});

app.use("/api/v1/", UserRouter);
