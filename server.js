const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecretValue(secretName) {
    try {
        const command = new GetSecretValueCommand({ SecretId: MAP_API_KEY });
        const data = await client.send(command);
        if ('SecretString' in data) {
            return data.SecretString;
        }
    } catch (err) {
        console.error('Error retrieving secret:', err);
    }
    return null;
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public-html'));

app.use(express.static(path.join(__dirname, 'public-html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public-html', 'index.html'));
});

app.get('/contact', async (req, res) => {
    const awsApiKey = await getSecretValue('MAP_API_KEY');
    res.render('contact', { awsApiKey: awsApiKey });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
