import http from "http";

const PORT = 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Curso de node js")
})

server.listen(PORT, () => {
    console.log("servidor escutando");
})

