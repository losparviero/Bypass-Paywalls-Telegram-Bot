const { Bot } = require("grammy");
require('dotenv').config();
const urlRegex = /(https?:\/\/[^\s]+)/g;

// Bot

const bot = new Bot(process.env.BOT_TOKEN);

// Commands

bot.command("start", (ctx) => 
  ctx.reply("*Welcome!* ✨ Send a webpage or article behind a paywall.", { parse_mode: "Markdown" } ));
bot.command("help", (ctx) =>
  ctx.reply("*@anzubo Project.*\n\nThis bot uses the 12ft.io proxy service to unblock and bypass paywalls. It's not guaranteed to work with all websites and relies on the status of the proxy service.\n\n*Sites such as NYT, WSJ or The Economist are not known to work.*\n_Access restricted member-only sites will also not work._", { parse_mode: "Markdown" } ));

// Messages

bot.on("msg", (ctx) => {

    // Logging

    if (ctx.from.last_name === undefined) {
      console.log('From:', ctx.from.first_name, '(@' + ctx.from.username + ')', 'ID:', ctx.from.id); }
    else { console.log('From:', ctx.from.first_name, ctx.from.last_name, '(@' + ctx.from.username + ')', 'ID:', ctx.from.id); }
    console.log("Message:", ctx.msg.text);

    // Logic

    if (!urlRegex.test(ctx.msg.text)) {
      ctx.reply("*Send a link with a valid URL.*", { reply_to_message_id:ctx.message.message_id, parse_mode: "Markdown" }); }
    else {
      let modifiedUrls = ctx.msg.text.replace(urlRegex, "https://12ft.io/$1");
      ctx.reply(`Here's the unblocked link: 🔓 ${modifiedUrls}`); }
      
  });

// Error Handling

bot.catch((err) => {
  const ctx = err.ctx;
  console.error("Error while handling update", ctx.update.update_id, "\nQuery:", ctx.msg.text, "not found");
  ctx.reply("Query: " + ctx.msg.text + " " + "not found!");
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

// Run

console.log('Bot running. Please keep this window open or use a startup manager like PM2 to setup persistent execution and store logs.');
bot.start();