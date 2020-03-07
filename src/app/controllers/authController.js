const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');


  function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
      //agora informamos o tempo de duração dos tokens
      expiresIn:86400
    });
  }


  //nesta parte salvamos o usuario verificando se o email informado n esta cadastrado com laguma conta existente
  //e tambem informamos ao sistema que as senhas do usuario mesmo já com criptografia, não devem mais aparecer
  //o que é obvio, pois nunca vi um sistema que ao cadastrar o usuario, mostra a senha do mesmo
  router.post('/register', async (req,res) => {
    const { email } = req.body
      try {

      if( await User.findOne({ email }))
        return res.status(400).send({ error: 'Uma conta já esta vinculada com este E-mail, por obsequio informe outro E-mail para proseguir com o cadastro'})

        
    const user = await User.create(req.body);

      //aqui removemos a exibição da senha do usuario
      user.password = undefined; 
          
        return res.send({ 
          user,
        token: generateToken({ id: user.id}), 
      });
      }catch (err) {
          return res.status(400).send({ error: 'Falha no registro do usuario'});
      }
    });

   //aqui verificamos senha e email do usuario
    router.post('/authenticate', async (req,res) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if(!user)
        return res.status(400).send({ error: 'Usuario não existe'});

      if(!await bcrypt.compare(password, user.password))
          return res.status(400).send({ error: 'Senha invalida'});

          //aqui removemos a exibição da senha do usuario
          user.password = undefined


      res.send({ 
        user,
        token: generateToken({ id: user.id}), 
      });
    });


  router.post('/forgot_password', async (req,res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if(!user)
        return res.status(400).send({ error: 'Usuario não encontrado'})

        const token = crypto.randomBytes(20).toString('hex');
        
        //tempo de inspiração do token
        const now = new Date();
        now.setHours(now.getHours() + 1);


        await User.findByIdAndUpdate(user.id, {
          '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
          }
          }, { new: true, useFindAndModify: false }
          );


/*

await mailer.sendMail({
        to: email,
        from: 'diego3g@rocketset.com.br',
        subject: 'Test',
        template: 'forgot_password',
        context: { token }
      })
*/



        mailer.sendMail({
          to: email,
          from: 'diego3g@rocketset.com.br',
          template: 'forgot_password',//tive que tiraro auth/ para esta merda poder pegar
          context: { token },
        }, (err) => {
            if (err)
            //console.log(err) //estava travando o return
             return res.status(400).send({error: "não é possível enviar o email da senha esquecida"})

             return res.send();
        })

  
    } catch (err) {
      console.log(err);
      res.status(400).send({error: 'erro ao Esqueceu a senha, tente novamente'});

    }
  })


  router.post('/reset_password', async (req,res) => {
     //guardo nesta constante os valores que serão enviados
     //quando o usuario requisitar uma alteração de senha,
     const { email, token, password} = req.body;

     //verifico se o usuario existe
     try {
        const user =await User.findOne({ email})
         .select('+passwordResetToken passwordResetExpires');
           //se não existir informo
         if(!user)
          return res.status(400).send({error: 'Usuario não existe'});

          //verifico se o token recebido é o mesmo atribuido ao usuario
          if( token !== user.passwordResetToken)
           return res.status(400).send({error: "token invalido"})
           
           //nesta constante recebo o tempo de validade de um token
           //nesta aplicação o tempo é de uma hora
           const now = new Date();

           //se o tempo que o token foi criado for maior que seu tempo de vida
            if(now > user.passwordResetExpires)
            //informo ao usuario que ele precisa iniciar o processo novamente
              return res.status(400).send({error: "O tempo de validade do token expirou, por favor requisite um novo"});
 
            //se tudo der certo, salvo a nova senha do usuario
            user.password = password;

            //e salvamos
            await user.save()

            res.send();

    // se acontecer algum erro, esta parte do codigo irá informar
     } catch(err) {

res.status(400).send({ error: "A redefinição de senha não foi possivel, tente novamente"});

     }
  });


    //definimos um prefixo para o router para o app
    //ex localhost://8000/auth/register
    module.exports = app => app.use('/auth', router); 








