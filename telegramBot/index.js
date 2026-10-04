const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const path = require('path')

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing from telegramBot/.env')
}
bot.start((ctx) => ctx.reply('Welcome to the siddhant\'s bot! Type /help to see available commands.'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.command('help', (ctx) => {
  const helpMessage = `
Available commands:
/hello - Greet the bot
/help - Show this help message
/sticker - Send a sticker to the bot
  `
  ctx.reply(helpMessage)
})
bot.command('hello', (ctx) => ctx.reply('Hello! How can I assist you today?'))


bot.command('sticker', async (ctx) => {
  const stickers = ['video1.webm', 'sticker2.webm', 'sticker3.webm', 'sticker4.webm']

  for (const sticker of stickers) {
    await ctx.replyWithSticker({
      source: path.join(__dirname, 'media', sticker),
    })
  }
})

bot.on('text', (ctx) => {
  const userMessage = ctx.message.text
  ctx.reply(`You said: ${userMessage}`)
});

bot.launch();
