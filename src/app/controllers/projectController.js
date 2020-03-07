const express = require('express');
const authMiddleware = require('../middlewares/auth');

//aqui é importado os models criados
const Project = require("../model/Project");//o de projeto
const Task = require("../model/Task");// e de tarefa

const router = express.Router();

router.use(authMiddleware);

//esta rota exibi todos os dados
router.get('/', async (req,res) => {

try {
const projects = await Project.find().populate(['user','tasks']);

return res.send({ projects })

}catch(err) {

  return res.status(400).send({error: 'Falha ao carregar projetos'})

}

});

//esta exibi um dado por vez
router.get('/:projectId', async (req,res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['user','tasks']);
    
    return res.send({ project })
    
    }catch(err) {
    
      return res.status(400).send({error: 'Falha ao carregar projetos'})
    
    }
  });

//rota para criar projeto
router.post('/', async (req,res) => {
  
  try {
    const { title, description, tasks } = req.body;
  
    const project = await Project.create({ title, description, user: req.userId });
   
    //pecorre todos os task's
    await Promise.all(tasks.map(async task => {
     const projectTask = new Task({ ...task, project: project._id});//referencia o projeto e salva
     
     //parte responsavel por add task ao projeto
      await projectTask.save(); 
      project.tasks.push(projectTask);


    }));
   //await Promise.all() espera cada interação do map para poder salvar
    await project.save();

    return res.send({ project});

  }catch(err) {
    //console.log(err)
    return res.status(400).send({error: "Erro na criação do projeto"});

  }

});

//rota para atualizar
router.put('/:projectId', async (req,res) => {
  try {
    const { title, description, tasks } = req.body;
  
    const project = await Project.findByIdAndUpdate( req.params.projectId,{
       title,
        description
    },{new: true});

    //deleta todas as atividades antes de salvar a atualização
    project.tasks = [];
    await Task.remove({ project: project._id});
   
    //pecorre todos os task's
    await Promise.all(tasks.map(async task => {
     const projectTask = new Task({ ...task, project: project._id});//referencia o projeto e salva
     
     //parte responsavel por add task ao projeto
      await projectTask.save(); 
      project.tasks.push(projectTask);


    }));
   //await Promise.all() espera cada interação do map para poder salvar
    await project.save();

    return res.send({ project});

  }catch(err) {
    //console.log(err)
    return res.status(400).send({error: "Erro na atualização do projeto"});

  }});

//rota para deletar
router.delete('/:projectId', async (req,res) => {
  try {
   await Project.findByIdAndRemove(req.params.projectId);
    
    return res.send()
    
    }catch(err) {
    
      return res.status(400).send({error: 'Falha ao deletar projetos'})
    
    }

})

module.exports = app => app.use('/projects', router);