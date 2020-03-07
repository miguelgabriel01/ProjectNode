const mongoose = require('../../database');
const bcrypt = require('bcryptjs')

//aqui criamos a tabela projetos
const TaskSchema = new mongoose.Schema({
    //a tabela vai possuir um titulo 
    title: {
        type: String,//o tipo de dado é string(letras)
        require: true,//é obrigatorio
    },
    //toda atividade pertence a um projeto. aqui sim, pq eu sou a lei
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",//referenciamos a tabela project
        require: true,//e esse dado é obrigatorio
    },
    //e toda atividade tem que ser cumprida e informada
    completed: {
        type: Boolean,//o tipo de dado é boolean, fez ou não fez
        require: true,//e um dado obrigatorio
        default: false,//e toda tarefa inicial vem como valor padrão de false(n concluida)
    },
  
    //vamos referenciar a tabela usuario
    //como uma chave estrangeira
    //ela vai pertencer a alguem..
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//informamos a tabela que será ultilizada
        require: true,//e é um dado obrigatorio
    },
   
    //aqui informamos a data de criação
    createdAt: {
        type: Date,//o tipo de dado é data
        default: Date.now,// e o valor padrão e a data atual
    }

});


//definimos o nome da tabela(Tesk)
const Task = mongoose.model('Task', TaskSchema);

//IMPORTAMOS PARA O ARQ INDEX.JS
//vulgo arquivo principal
module.exports = Task;