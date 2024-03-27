const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();
const app = express();
const port = 3005;
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
        required_if_supported_products: ['transactions'],
        country_codes: ['CA'],
        android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME,
    };
    const tokenResponse = await client.linkTokenCreate(payload);
    res.json(tokenResponse.data);
});

app.post('/auth', async function (req, res) {
    try {
        const plaidresponse = await client.authGet({ access_token: req.body.access_token });
        res.json(plaidresponse.data);
    }
    catch (e) {
        res.status(500).send('auth failed error: ' + e);
    }
});

app.post('/exchange_public_token', async function (
    request,
    response,
    next,
) {
    try {
        const res = await client.itemPublicTokenExchange({
            public_token: request.body.public_token,
        });
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = res.data.access_token;
        const itemID = res.data.item_id;

        response.json({
            access_token: accessToken,
            item_id: itemID,
        });
    } catch (error) {
        response.status(500).send('exchange_public_token failed, error: ' + error);
    }
});

app.post('/get_institution_name_by_Id', async function (req, res) {
    const PlaidResponse = await client.Institutions.get_by_id(req.body.id);
    const institutions = PlaidResponse.data.institutions;
    res.json({
        institution_Id: institutions.institution_id,
        institution_Name: institutions.name,
    });
});

app.post('/asyncTransactions', async function (req, res) {
    let PlaidRequest = null;
    if (req.body.cursor == null) {
        PlaidRequest =
        {
            access_token: req.body.access_token,
            count: 100,
            options: {
                include_original_description: false,
                days_requested: 180,
            },
        };
    }
    else {
        PlaidRequest =
        {
            access_token: req.body.access_token,
            cursor: req.body.cursor,
            count: 100,
            options: {
                include_original_description: false,
                days_requested: 180,
            },
        };
    }
    const PlaidResponse = await client.transactionsSync(PlaidRequest);
    res.json(
        {
            added: PlaidResponse.data.added,
            modified: PlaidResponse.data.modified,
            removed: PlaidResponse.data.removed,
            cursor: PlaidResponse.data.next_cursor,
            has_more: PlaidResponse.data.has_more,
        }
    );
});



app.listen(port, () => {
    console.log(`Backend server is running on port ${port}...`);
});
