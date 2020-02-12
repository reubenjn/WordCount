var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

var wordRoutes = require('./routes/words');

// app.use('/api/words', wordRoutes);

// app.get('/words/*', (req, res) => {
//     // console.log(req);
//     res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
// });

app.listen(port, function() {
    console.log(`APP IS RUNNING ON PORT ${port}`);
})