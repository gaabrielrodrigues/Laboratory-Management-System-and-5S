const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); 

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); 
app.use(express.json());

const labRoutes = require('./routes/labRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/lab', labRoutes);
app.use('/login', userRoutes);

app.listen(PORT, () => {
    console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
});