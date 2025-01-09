const express = require('express');
const app = express();
require('dotenv').config(); 
const port = process.env.PORT || 4444;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(__dirname + '/public'));

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to DB!'))
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1); 
  });

// Подключаем маршруты
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is live on port ${port}`);
});
