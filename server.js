import { createClient } from 'redis';
import express from 'express';

const app = express();

const client = createClient();

const def_key = 'orders'

app.get('/orders', async (req, res) => {
    const value = req.query;
    await client.ZADD(def_key, JSON.stringify(value));
    return res.send('Success');
});

app.get('/admin', async (req, res) => {
    const rawData = await client.ZRANGEBYSCORE(def_key, '-inf', '+inf'); //zrangebyscore orders -inf +inf
    return res.json(JSON.parse(rawData));
})

app.get('/', (req, res) => {
    return res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})