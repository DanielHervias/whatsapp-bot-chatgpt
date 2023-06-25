const qrcode = require('qrcode-terminal');

const FILE_PATHS = {
  IMAGEN: `${__dirname}\\Logo_uni.png`,
  AUDIO: `${__dirname}\\audio_ws.opus`,
  VIDEO: `${__dirname}\\video2.mp4`,
};

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (msg) => {
  const message = msg.body.toLowerCase();
  if (message == 'ping') {
    msg.reply('pong');
  }
  try {
    if (message == 'imagen please') {
      const media = MessageMedia.fromFilePath(FILE_PATHS.IMAGEN);
      await client.sendMessage(msg.from, media);
    }
    if (message == 'audio please') {
      const media = MessageMedia.fromFilePath(FILE_PATHS.AUDIO);
      await client.sendMessage(msg.from, media);
    }
    if (message == 'video please') {
      const media = MessageMedia.fromFilePath(FILE_PATHS.VIDEO);
      await client.sendMessage(msg.from, media);
    }
  } catch (error) {
    console.error(error);
  }
});

client.initialize();
