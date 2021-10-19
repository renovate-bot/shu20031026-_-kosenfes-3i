'use strict';

require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const app = express();

//ブラウザ上に'Hello LINE BOT!(GET)'と表示
app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);


    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

// async function handleEvent(event) {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//         return Promise.resolve(null);
//     }

//     return client.replyMessage(event.replyToken, {
//         type: 'text',
//         text: event.message.text //実際に返信の言葉を入れる箇所
//     });
// }

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    let replyText = '';
    if (event.message.text === 'バングラデッシュ') {
        replyText = '正解';
    } else {
        replyText = 'ちがいます';
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
    });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);