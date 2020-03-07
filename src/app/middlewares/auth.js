//este arquivo é responsavel por fazer a validação do token
//pois o usuario geralmente já é redirecionado para a pagina principal, logo apos fazer o cadastro..

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: 'Token não informado'})

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
     return res.status(401).send({ error: 'Erro de token'});

     const [ scheme, token ] = parts;

     if(!/^Bearer$/i.test(scheme)) 
        return res.status(401).send({ error: 'Erro de formação de token'});

      //se nada der errado, essa é a validação final
       jwt.verify(token, authConfig.secret, (err, decoded) => {
           if(err) return res.status(401).send({ error: 'Token invalido'});

           req.userId = decoded.id;
           return next();
       })  
     
};