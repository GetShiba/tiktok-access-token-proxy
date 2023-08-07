import express from 'express'
import fetch from 'node-fetch'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const TIKTOK_ACCESS_TOKEN_ENDPOINT = 'https://open.tiktokapis.com/v2/oauth/token/';
const PORT = 8080;

app.post('/proxy/token', async (req, res) => {
    const params = new URLSearchParams({
        client_key: req.body.client_id,
        client_secret: req.body.client_secret,
        code: req.body.code,
        grant_type: 'authorization_code',
        redirect_uri: req.body.redirect_uri
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        },
        body: params
    };

    const response = await fetch(TIKTOK_ACCESS_TOKEN_ENDPOINT, options);
    const data = await response.json();
    console.log('data', data);

    res.json(data);
});

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}`);
});
