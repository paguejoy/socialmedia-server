const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// DB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// DB Notification
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

const authRoutes = require('./routes/authRoutes');


app.use('/api', authRoutes);


app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))