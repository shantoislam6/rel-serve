const express = require("express");
const net = require("net");
const ping = require("ping");
const fs = require("fs");
const path = require("path");

const CLI = require("./cli");

const app = express();

const prePort = 3000;
const preHost = "0.0.0.0";

let PORT = CLI.options.port || prePort;
let HOST = CLI.options.host || preHost;

const rePort = PORT != prePort;
const reHost = HOST != preHost;


// scan host whather it's alive or not
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
      PORT = PORT + 50;
    }
  }

  console.clear();

  app.use("/", (req, res) => {
    const currentDirectory = process.cwd();
    if (req.path == "/") {
      if (fs.existsSync(currentDirectory + "\\index.html")) {
        process.stdout.write('200 ');
        res.sendFile(currentDirectory + "\\index.html");
      } else {
         process.stdout.write('404 ');
        res.send("Not Found").status(404);
      }
    } else {
      const file = path.resolve(currentDirectory + req.path);
      if (fs.existsSync(file)) {
        process.stdout.write('200 ')
        res.sendFile(file);
      } else {
        process.stdout.write('404 ')
        res.send("Not Found").status(404);
      }
    }
    console.log(`${req.method} ${req.path}`);
  });

  app.listen(PORT, HOST, () => {
    console.log(
      `\n Your Server is listening on HOST=${HOST} and PORT=${PORT} \n\n http://${
        !reHost ? "127.0.0.1" : HOST
      }:${PORT} ${
        HOST == "0.0.0.0" || HOST == "127.0.0.1"
          ? `\n http://localhost:${PORT}`
          : ""
      }\n `
    );
  });
};
