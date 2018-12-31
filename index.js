let express = require('express');
let path = require('path');

let app = express();

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/index.html'));
})

app.post('/upload', (req, res) => {
    console.log(req);
})

app.listen(3000, () => console.log("Listening on port 3000"));