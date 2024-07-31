import express, { type Request, type Response} from "express";
import cors from "cors";
import * as mw from "./middleware";
import userRouter from "./routes/usersRouter";
import workoutsRouter from "./routes/workoutsRouter";

const server = express();

server.use(cors());
server.use(express.json());
server.use(mw.logger);

server.use('/api/users', userRouter);
server.use('/api/workouts', workoutsRouter);

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Ok!");
});

export default server;
