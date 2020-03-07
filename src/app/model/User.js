const mongoose = require('../../database');
const bcrypt = require('bcryptjs')

//aqui criamos a tabela usuario
const UserSchema = new mongoose.Schema({
    name: {
        type: String,//o tipo de dado é string(letras)
        require: true,
    },
    email: {
        type: String,//o tipo de dado é string(letras)
        unique: true,
        required: true,//o dado é obrigatorio
        lowercase: true,//os dados são salvos em caixa baixa
    },
    password: {
        type: String,//o tipo de dado é string(letras)
        required: true,//o dado é obrigatorio
        select: false,//impede que o usuario ao fazer uma consulta ao banco e puxar dados de determinado usurio, a senha do mesmo apareca*
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type:Date,
        select: false,
    },
});

//faremos aqui a parte de criptografia
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})


//definimos o nome da tabela(user)
const User = mongoose.model('User', UserSchema);

//IMPORTAMOS PARA O ARQ INDEX.JS
//vulgo arquivo principal
module.exports = User;