const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const fileUpload = require('express-fileupload');



app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 50 * 2024 * 1024 }
}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next()
})


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


app.listen(PORT, () => console.log(`Server running at port ${PORT}`))