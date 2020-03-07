const mongoose = require('../../database');
const bcrypt = require('bcryptjs')

//aqui criamos a tabela projetos
const ProjectSchema = new mongoose.Schema({
    //a tabela vai possuir um titulo 
    title: {
        type: String,//o tipo de dado é string(letras)
        require: true,//é obrigatorio
    },
    //uma descrição
    description: {
        type: String,//o tipo de dado é string(letras)
        require: true,//e é obrigatorio
    },
    //vamos referenciar a tabela usuario
    //como uma chave estrangeira
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",//informamos a tabela que será ultilizada
        require: true,//e é um dado obrigatorio
    },
    //agora, todo projeto tem uma tarefa, 
    //por isso vamos referenciar o tabela tarefas
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",//informamos a tabela que será usada como referencia
    }],
    //aqui informamos a data de criação
    createdAt: {
        type: Date,//o tipo de dado é data
        default: Date.now,// e o valor padrão e a data atual
    }

});


//definimos o nome da tabela(Project)
const Project = mongoose.model('Project', ProjectSchema);

//IMPORTAMOS PARA O ARQ INDEX.JS
//vulgo arquivo principal
module.exports = Project;