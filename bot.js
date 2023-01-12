const { Bot, Context, session } = require("grammy");
const { run, sequentialize } = require("@grammyjs/runner");
require('dotenv').config();

// Create a bot.
const bot = new Bot(process.env.BOT_TOKEN);

// Build a unique identifier for the `Context` object.
function getSessionKey(ctx) {
  return ctx.chat?.id.toString();
}

// Sequentialize before accessing session data.
bot.use(sequentialize(getSessionKey));
bot.use(session({ getSessionKey }));

// Add the usual middleware, now with safe session support.
bot.on("message", (ctx) => ctx.reply("https://12ft.io/" + ctx.message.text));

// Run it concurrently.
run(bot);