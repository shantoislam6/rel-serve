const commandLineUsage = require("command-line-usage");
const commandLineArgs = require("command-line-args");

const packageJson = require("../package.json");
const name = packageJson.name;

let options = {};
try {
  // parse the options using
  options = commandLineArgs([
    { name: "version", alias: "v", type: Boolean },
    { name: "help", alias: "h", type: Boolean },
    { name: "host", alias: "s", type: String },
    { name: "port", alias: "p", type: Number },
  ]);


} catch (err) {
  // extract the name of the unknown option
  console.log(err.message);
  process.exit();
}


// cli message
const mainHeader = `----------- ${name} -------------`;
const messages = {
  help: commandLineUsage([
    {
      header: mainHeader,
      content: "Simple development http server with reload capability.",
    },
    {
      header: "Synopsis",
      content: [
        "$ " + name + "",
        "$ " + name + " {bold --port} {underline <a_port>}",
        "$ " + name + " {bold --host} {underline <a_host>}",
        "$ " +
          name +
          " {bold --host} {underline <a_host>} {bold --port} {underline <a_port>}",
        "$ " + name + " {bold --help}",
        "$ " + name + " {bold --version or -v}",
      ],
    },
    {
      header: "Options",
      optionList: [
        {
          name: "host",
          description: " ......... To set host name",
          alias: "s",
          type: String,
        },

        {
          name: "port",
          description: " ......... To set port",
          alias: "p",
          type: Number,
        },
        {
          name: "help",
          description: " ......... Show help",
          alias: "h",
          type: Boolean,
        },

        {
          name: "version",
          description: " ......... Show version number",
          alias: "v",
          type: Boolean,
        },
      ],
    },
    {
      header: "Examples",
      content: [
        {
          example: "$ " + name + "",
          desc: "1. Run server without parameter. ",
        },
        {
          example: "$ " + name + " -p 4000",
          desc: "2. Run server with port ",
        },
        {
          example: "$ " + name + " --host 198.168.0.1",
          desc: "3. Run server with host ",
        },
        {
          example: "$ " + name + " --port 4000 --host 198.168.0.1",
          desc: "3. Run server with host and port",
        },
      ],
    },
    {
      content: "Git Repository: {underline " + packageJson.repository.url + "}",
    },
  ]),
  version: commandLineUsage([
    {
      header: mainHeader,
      content: "version:"+ packageJson.version,
    },
  ]),
};

if(options.help){
  console.log(messages.help);
  process.exit();
}

if(options.version){
  console.log(messages.version);
  process.exit();
}

module.exports = {
  messages: messages,
  options: options,
};
