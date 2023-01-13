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

// Respond to the command /start.
bot.command("start", (ctx) => ctx.reply("Welcome! ✨ Send a webpage or article behind a paywall and we will remove it for you."));
// Respond to the command /help.
bot.command("help", (ctx) => ctx.reply("This bot uses the 12ft.io proxy service to unblock and bypass paywalls. It's not guaranteed to work with all websites and also relies upon the status of the proxy service. Both are free services hosted and operational on voluntary basis subject to shutdown at any point in time. This bot is hosted on my personal VPS and will stay online for the foreseeable period."));

// Add the usual middleware, now with safe session support.
bot.on("message::url", (ctx) => ctx.reply("Here's the unblocked link: 🔓 https://12ft.io/" + ctx.message.text));

/*await bot.api.setMyCommands([
  { command: "start", description: "Start the bot." },
  { command: "help", description: "Show help text." },
]);*/  

// Run it concurrently.
run(bot);
