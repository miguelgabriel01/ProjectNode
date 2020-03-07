const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


require('./app/controllers/index')(app);

//informamos a porta desejada
//na aula era 3000
//mas uso 8000 pq sou a lei
//S2S2
app.listen(8000)