const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const fetch = require("node-fetch");

app.use(bodyParser.json());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

const baseUrl = 'https://rubillex.server.paykeeper.ru';
const base64 = 'cnViaWxsZXg6UnViIWxsZXgyMjg=';

app.get('/pay', async (_req, res) => {

    try {
        const response = await fetch(`${baseUrl}/info/settings/token/`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${base64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'An error occurred'});
    }

});

app.post('/invoice', async (_req, res) => {
    try {
        var formBody = [];
        Object.keys(_req.body).forEach((key) => {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(_req.body[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        });
        formBody = formBody.join("&");

        const response = await fetch(`${baseUrl}/change/invoice/preview/`, {
            method: 'POST',
            body: formBody,
            headers: {
                Authorization: `Basic ${base64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'An error occurred'});
    }
});

const port = 3456;

app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
);
