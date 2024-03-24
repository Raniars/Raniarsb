const axios = require('axios');

const fonts = {

    mathsans: {

        a: "𝙖", b: "𝙗", c: "𝙘", d: "𝙙", e: "𝙚", f: "𝙛", g: "𝙜", h: "𝙝", i: "𝙞",

        j: "𝙟", k: "𝙠", l: "𝙡", m: "𝙢", n: "𝙣", o: "𝙤", p: " 𝙥", q: " 𝙦", r: " 𝙧",

        s: " 𝙨", t: "𝙩", u: "𝙪", v: "𝙫", w: "𝙬", x: "𝙭", y: "𝙮", z: "𝙯",

        A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁", G: "𝙂", H: "𝙃", I: "𝙄",

        J: "𝙅", K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉", O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍",

        S: "𝙎", T: "𝙏", U: "𝙐", V: "𝙑", W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕",
    }
};

const Prefixes = [
  'Iaro',
  'ai',
  'iaro',
  'ask',
  'IaroSanda', 
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip | Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("🥺Iaro Sanda🥺,\n\n Hey, 𝖩𝖾 𝗌𝗎𝗂𝗌 𝗍𝗈𝗎𝗃𝗈𝗎𝗋𝗌 𝗅à 𝗉𝗈𝗎𝗋 𝗏𝗈𝗎𝗌, 𝗉𝗋ê𝗍 à 𝗏𝗈𝗎𝗌 𝖺𝗂𝖽𝖾𝗋 𝖾𝗇 𝗍𝗈𝗎𝗍𝖾 𝖼𝗂𝗋𝖼𝗈𝗇𝗌𝗍𝖺𝗇𝖼𝖾! 💪💫 𝖭'𝗁é𝗌𝗂𝗍𝖾𝗓 𝗉𝖺𝗌 à 𝗆𝖾 𝗌𝗈𝗅𝗅𝗂𝖼𝗂𝗍𝖾𝗋, 𝗃𝖾 𝗌𝗎𝗂𝗌 𝗅à 𝗉𝗈𝗎𝗋 𝗏𝗈𝗎𝗌 𝗌𝗈𝗎𝗍𝖾𝗇𝗂𝗋 𝖾𝗍 𝗏𝗈𝗎𝗌 𝖺𝖼𝖼𝗈𝗆𝗉𝖺𝗀𝗇𝖾𝗋 𝖽𝖺𝗇𝗌 𝗏𝗈𝗌 𝖽é𝖿𝗂𝗌! 🤝🌟");
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = `👑𝙄𝘼𝙍𝙊 𝙎𝘼𝙉𝘿𝘼👑 :\n\n ༺◍◎◍◒⬤⬤❂◑◒◓◍༻ \n\n${response.data.answer}😊`;

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
