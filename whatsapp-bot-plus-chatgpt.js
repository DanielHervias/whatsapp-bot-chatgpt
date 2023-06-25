const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

async function chatWithGPT(message) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization:
            'Bearer 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',
          'Content-Type': 'application/json',
        },
      }
    );

    const { choices } = response.data;
    const reply = choices[0].message.content;

    return reply;
  } catch (error) {
    console.error('Error al llamar a la API de ChatGPT:', error);
    return null;
  }
}

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

  try {
    const respuesta = await chatWithGPT(message);
    msg.reply(respuesta);
  } catch (error) {
    console.error(error);
  }
});

client.initialize();
