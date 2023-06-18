const http = require("http")
const fs = require("fs");
const util = require("./util");

let pm = new util.PersistenceManager();

http.createServer((req, res) => {
    let path = "./views/";
    let url = req.url.slice(1).split('/')
    if(url.length == 1 && url[0] == "") {
        res.statusCode = 200;
        path += "index.html";
    } else if  (url.length == 2 && url[0] == "sendMessage") {
        let message = decodeURIComponent(url[1]).replace("+"," ");
        let clientIp = req.socket.remoteAddress;
        pm.addMessage({ip:clientIp, content: message});
        res.statusCode = 301;
        res.setHeader("Location", "/");
        res.end();
        return;
    } else {
        res.statusCode = 404;
        path += "404.html";
    }
    fs.readFile(path, {encoding:"utf-8"},(err, data)=>{
        if(err) {
            console.log(err);
            console.log(path);
        } else {
            res.write(data);
        }
        res.end();
    });
}).listen(3000, "localhost", (err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log("Server running at localhost:3000");
    }
});