const axios = require("axios");

const BOT_TOKEN = "8226641604:AAFHBG_1JoUs8eSLER9X3ottVolKrJWct3Y";
const CHAT_ID = "5147596302";

exports.sendTelegramMessage = async(text) =>{
    try{
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
            chat_id : CHAT_ID,
            text : text,
            parse_mode : "HTML"
        });
    }
    catch(err){
        console.error("Telegram mesaj gönderilemedi:", err.message);
    }
}