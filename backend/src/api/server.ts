import express, { type Request, type Response} from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
    res.send(200).json("Ok!");
});

server.use(express.json());

export default server;
