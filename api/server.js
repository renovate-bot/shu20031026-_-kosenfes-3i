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

//ブラウザ表示
app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);


    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

let isPlayng = false;
let cleard = false;
let startTime = 0;
let finishTime = 0;

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    let replyText = '';
    let replyImage = '';

    const IMG_ROOT = 'https://3i-kosenfes-img.netlify.app/'

    if (isPlayng === true) {

        switch (event.message.text) {
            case '012':
                replyImage = `1-1.jpg`;
                replyText = `ゲームをプレイ中`;

                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });

            case 'クマデ':
                replyImage = `1-2.jpg`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case 'ズコウ':
                replyImage = `1-3.jpg`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case 'オダノブナガ':
                replyImage = `1-4.jpg`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case 'ラマ':
                replyImage = `1-5.jpg`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case 'バット':
                replyImage = `hint.jpg`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case 'キュウリ\nユウガタ\nシロヌノ\nアンマン':
                replyImage = `last.png`;
                return client.replyMessage(event.replyToken, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                });
            case '407':
                if (isPlayng === true) {
                    finishTime = Date.now();
                    let clearTime = (finishTime - startTime) / 1000;
                    // let solidTime = String(clearTime).slice(0, -4);

                    let min = Math.floor(clearTime / 60)
                    let sec = Math.floor(clearTime % 60)

                    replyText = "Game Clear!!!\nクリア時間 :" + min + "m" + sec + "s";
                    isPlayng = false
                    console.log(clearTime)
                    console.log(min);
                    console.log(sec);
                } else {
                    replyText = '謎はすべて解き明かされた'
                }

                console.log(isPlayng)
                break;
            default:
                replyText = 'なにかを間違えているようだ...';
        }
    } else {
        switch (event.message.text) {
            case '012':
                startTime = Date.now();
                isPlayng = true;
                replyText = `ゲームを開始します`;
                replyImage = `1-1.jpg`;
                return client.replyMessage(event.replyToken, [{
                    type: 'text',
                    text: replyText
                }, {
                    type: 'image',
                    originalContentUrl: IMG_ROOT + replyImage,
                    previewImageUrl: IMG_ROOT + replyImage
                }]);
            default:
                replyText = 'ゲームを開始してください';
        }
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: replyText
    });
}

// app.listen(PORT);
// console.log(`Server running at ${PORT}`);
(process.env.NOW_REGION) ? module.exports = app: app.listen(PORT);
console.log(`Server running at ${PORT}`);