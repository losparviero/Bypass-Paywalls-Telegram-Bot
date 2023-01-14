const { Bot, Context, session } = require("grammy");
const { run, sequentialize } = require("@grammyjs/runner");
require('dotenv').config();
const urlRegex = /(https?:\/\/[^\s]+)/g;

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
bot.command("start", (ctx) => 
  ctx.reply("<b>Welcome!</b> ✨ Send a webpage or article behind a paywall and we will remove it for you.", { parse_mode: "HTML" },));
bot.command("help", (ctx) =>
  ctx.reply("This bot uses the 12ft.io proxy service to unblock and bypass paywalls. It's not guaranteed to work with all websites and relies on the status of the proxy service. \ Both are free services hosted and operational on voluntary basis subject to shutdown at any point in time. This bot is hosted on my personal VPS and will stay online for the foreseeable period.", { parse_mode: "MarkdownV2" },));
bot.command("carla", (ctx) => ctx.reply("You mean the pretty girl reading this?"));

// Add the usual middleware, now with safe session support.
/*bot.on("message", (ctx) => 
  if (ctx.message.text === )
    ctx.reply("Here's the unblocked link: 🔓 https://12ft.io/" + ctx.message.text));
*/

bot.on("msg", (ctx) => {
  if (urlRegex.test(ctx.msg.text)) {
      let modifiedUrls = ctx.msg.text.replace(urlRegex, "https://12ft.io/$1");
      ctx.reply(`Here's the unblocked link: 🔓 ${modifiedUrls}`);
      console.log('Link received:');
      console.log(ctx.msg.text);
      if(ctx.from.last_name === undefined) {
        console.log('from', ctx.from.first_name, 'ID', ctx.from.id);}
      else {
        console.log('from', ctx.from.first_name, ctx.from.last_name, 'ID', ctx.from.id);}
  }});

// Run it concurrently.
console.log('Bot running. Please keep this window open or use a startup manager like PM2 to setup persistent execution and store logs.');
// console.log('CTRL+C to terminate.');
run(bot);