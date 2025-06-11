const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/BTCUSDT\.P/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📸 Mengambil chart BTCUSDT dari TradingView...');

  const url = 'https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT';

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.waitForTimeout(5000); // Tunggu chart penuh
  const chart = await page.screenshot({ fullPage: true });
  await browser.close();

  bot.sendPhoto(chatId, chart, { caption: "📊 Chart BTCUSDT.P dari TradingView" });
});
