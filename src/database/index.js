const mongoose = require('mongoose');

//informamos o tipo do banco, que ele vai ser local e o nome dele
//neste aplicação o node do BD será noderest
//tambem passamos uma mensagem ao terminal, informando se a aplicação foi conectada com o mongo de maneira correcta
//se houver um erro, o mesmo infoma S2S2
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/noderest",{ useNewUrlParser:true}).then(() =>{
  console.log("conctado ao mongoDB com sucesso!!")
}).catch((err) => {
  console.log("Houve um erro: " + err)
})

module.exports =mongoose;

