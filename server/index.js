const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();
const app = express();
const port = 8080;
app.use(cors());
// the URL-encoded data will be parsed with the querystring library
//app.use(bodyParser.urlencoded({ extended: false }));
// parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Configuration for the Plaid client
// Check version in https://github.com/plaid/react-native-plaid-link-sdk
const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});

//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);
console.log(process.env.PLAID_CLIENT_ID);

app.post('/hello', (req, res) => {
    res.json({ message: 'Hello Worlde04' });
});

//Creates a Link token and return it
app.post('/api/create_link_token', async (req, res, next) => {
    let payload = {};
    //Payload if running Android
    payload = {
        user: { client_user_id: 'user-id' },
        client_name: 'MoneyBook',
        language: 'en',
        products: ['auth'],
        country_codes: ['CA'],
        android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME,
    };
    const tokenResponse = await client.linkTokenCreate(payload);
    res.json(tokenResponse.data);
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}...`);
});