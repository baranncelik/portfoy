const axios = require("axios");

// Değişkenleri doğrudan kodun içinden değil, .env dosyasından çekiyoruz
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.sendTelegramMessage = async (text) => {
    try {
        // Token veya Chat ID eksikse boşuna istek atıp hata almasını engelleyelim
        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error(".env dosyasında TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik!");
        }

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "HTML"
        });
    }
    catch (err) {
        console.error("Telegram mesaj gönderilemedi:", err.message);
    }
}
