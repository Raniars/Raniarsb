const axios = require('axios');

const fonts = {

    mathsans: {

        a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",

        j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",

        s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",

        A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨",

        J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱",

        S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",
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
