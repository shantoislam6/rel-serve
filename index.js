const express = require("express");
const net = require("net");
const ping = require("ping");
const argv = require("yargs").argv;
const fs = require("fs");
const path = require("path");

const app = express();

const prePort = 80;
const preHost = "0.0.0.0";

let PORT = argv.port || argv.p || argv.PORT || prePort;
let HOST = argv.host || argv.h || argv.HOST || preHost;

const rePort = PORT != prePort;
const reHost = HOST != preHost;

// scan host whether it's alive or not
const scanHost = (host) => {
  return new Promise((res) => {
    ping.sys.probe(HOST, (isAlive) => {
      if (isAlive) {
        res(true);
      } else {
        res(false);
      }
    });
  });
};

// scan port whether it's running or not
const scanPort = (port, host) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.on("connect", () => {
      resolve(true);
      socket.destroy();
    });
    socket.on("timeout", () => {
      resolve(false);
      socket.destroy();
    });

    socket.on("error", () => {
      resolve(false);
      socket.destroy();
    });

    socket.connect(port, host);
  });
};

module.exports = async () => {
  if (reHost) {
    console.log("Checking Host....");
    if (!(await scanHost(HOST))) {
      console.log("Your defined host is not alive.");
      process.exit();
    }
  }

  if (rePort) {
    console.log("Checking Port....");
    if (await scanPort(PORT)) {
      console.log(
        "Your defined port=" + PORT + " is already running on host=" + HOST
      );
      process.exit();
    }
  } else {
    while (await scanPort(PORT)) {
      PORT++;
    }
  }

  console.clear();

  app.use("/", (req, res) => {
    const currentDirectory = process.cwd();
    if (req.path == "/") {
      if (fs.existsSync(currentDirectory + "\\index.html")) {
        res.sendFile(currentDirectory + "\\index.html");
      } else {
        res.send("Not Found").status(404);
      }
    } else {
      const file = path.resolve(currentDirectory + req.path);
      if (fs.existsSync(file)) {
        res.sendFile(file);
      } else {
        res.send("Not Found").status(404);
      }
    }
    console.log(req.path);
  });

  app.listen(PORT, HOST, () => {
    console.log(
      `\n Server listening on HOST=${HOST} and PORT=${PORT} \n\n http://${
        !reHost ? "127.0.0.1" : HOST
      }:${PORT} ${
        HOST == "0.0.0.0" || HOST == "127.0.0.1"
          ? `\n http://localhost:${PORT}`
          : ""
      }\n `
    );
  });
  
};
