import server from "./api/server";
const port: number = 1234;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
