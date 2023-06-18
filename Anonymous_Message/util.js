const fs = require("fs");

const JSONReader = (filename)=>{
    return JSON.parse(fs.readFileSync(filename, {encoding: "utf-8"}));
};

const JSONWriter = (filename, data)=>{
    fs.writeFileSync(filename, JSON.stringify(data));
}

const PersistenceManager = class {
    constructor() {}
    addMessage(message) {
        let messages = JSONReader("./data/messages.json");
        if (!messages.hasOwnProperty(message.ip)) {
            messages[message.ip] = [];
        } else if (messages[message.ip].length == 10) {
            messages[message.ip].shift();
        }
        messages[message.ip].push(message.content);
        JSONWriter("./data/messages.json", messages);
    }
    getAllMessages() {
        return JSONReader("./data/messages.json");
    }
}

module.exports = {PersistenceManager};