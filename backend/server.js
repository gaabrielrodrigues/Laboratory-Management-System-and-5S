const express = require('express');
const labRoutes = require('./routes/labRoutes');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/lab', labRoutes);
app.use('/login', userRoutes)

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
});