import express, { type Request, type Response} from "express";
import cors from "cors";
import * as mw from "./middleware";
import userRouter from "./users/usersRouter";

const server = express();

server.use(cors());
server.use(express.json());
server.use(mw.logger);

server.use('/api/users', userRouter);

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Ok!");
});

export default server;
