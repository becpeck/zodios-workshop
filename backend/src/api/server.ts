import express, { type Request, type Response} from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Ok!");
});

server.use(express.json());

export default server;
