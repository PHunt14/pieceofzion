const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import AWS SDK v3 and configure it
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const client = new SecretsManagerClient({ region: 'us-east-1' }); // Replace with your AWS region

// Function to get secret value
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

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public-html'));

// Serve static files from the public-html folder
app.use(express.static(path.join(__dirname, 'public-html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public-html', 'index.html'));
});

app.get('/contact', async (req, res) => {
    const awsApiKey = await getSecretValue('MAP_API_KEY'); // Replace with your secret name
    res.render('contact', { awsApiKey: awsApiKey });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
