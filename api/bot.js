const { Bot, webhookCallback } = require("grammy");
require("dotenv").config();
const urlRegex =
  /((https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;

// Bot

const bot = new Bot(process.env.BOT_TOKEN);

// Response

async function responseTime(ctx, next) {
  const before = Date.now();
  await next();
  const after = Date.now();
  console.log(`Response time: ${after - before} ms`);
}

bot.use(responseTime);

// Commands

bot.command("start", async (ctx) => {
  await ctx
    .reply("*Welcome!* ✨ Send a webpage or article behind a paywall.", {
      parse_mode: "Markdown",
    })
    .then(() => console.log("New user added:", ctx.from))
    .catch((error) => console.error(error));
});
bot.command("help", async (ctx) => {
  await ctx
    .reply(
      "*@anzubo Project.*\n\nThis bot uses the 12ft.io proxy service to unblock and bypass paywalls. It's not guaranteed to work with all websites and relies on the status of the proxy service.\n\n*Sites such as NYT, WSJ or The Economist are not known to work.*\n_Access restricted member-only sites will also not work._",
      { parse_mode: "Markdown" }
    )
    .catch((error) => console.error(error));
});

// Messages

bot.on("msg", async (ctx) => {
  // Logging

  if (ctx.from.last_name === undefined) {
    console.log(
      "From:",
      ctx.from.first_name,
      "(@" + ctx.from.username + ")",
      "ID:",
      ctx.from.id
    );
  } else {
    console.log(
      "From:",
      ctx.from.first_name,
      ctx.from.last_name,
      "(@" + ctx.from.username + ")",
      "ID:",
      ctx.from.id
    );
  }
  console.log("Message:", ctx.msg.text);

  // Logic

  try {
    if (!urlRegex.test(ctx.msg.text)) {
      await ctx
        .reply("*Send a link with a valid URL.*", {
          reply_to_message_id: ctx.message.message_id,
          parse_mode: "Markdown",
        })
        .catch((error) => console.error(error));
    } else {
      let modifiedUrls = ctx.msg.text.replace(urlRegex, "https://12ft.io/$1");
      await ctx
        .reply(`Here's the unblocked link: 🔓 \n${modifiedUrls}`, {
          reply_to_message_id: ctx.msg.message_id,
        })
        .catch((error) => console.error(error));
    }
  } catch (error) {
    await ctx.reply("Query: " + ctx.msg.text + " not found!");
    console.error(error);
    return;
  }
});

// Function

export default webhookCallback(bot, "http");
