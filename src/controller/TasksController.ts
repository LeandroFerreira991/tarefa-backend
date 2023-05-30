import { getRepository, FindOneOptions} from 'typeorm';
import { Tasks } from '../entity/Tasks';
import { Request, Response } from 'express';

export const getTasks = async(request: Request, response: Response) => {
    const tasks = await getRepository(Tasks).find()
    return response.json(tasks);
};
export const salveTask = async(request: Request, response: Response) => {
    const task = await getRepository(Tasks).save(request.body)
    return response.json(task);
};
export const getTask = async (request: Request, response: Response) => {

    try{
        const {id} = request.params;
        const options: FindOneOptions<Tasks> = {
            where: {  id: parseInt(id, 10) },
          };
        
        const task = await getRepository(Tasks).findOne( options);
        return response.json(task);
    }catch (error) {
                 response.json({
                   error: true,
                   message: error.message
                 }); 
            }   
};




export const updateTask = async(request: Request, response: Response) => {

    try{
        const {id} = request.params
        const options: FindOneOptions<Tasks> = {
            where: {  id: parseInt(id, 10) },
        };
        const task = await getRepository(Tasks).update(id, request.body)
        
        if (task.affected == 1){
            const taskUpdated = await getRepository(Tasks).findOne(options)
            return response.json(taskUpdated);
        }
        else{
            return response.status(404).json( {message: "Tarefa não encontrada!"} )
        }
    }catch (error) {
        response.json({
          error: true,
          message: error.message
        }); 
   }  
};
export const deleteTask = async(request: Request, response: Response) => {
    const {id} = request.params
    const task = await getRepository(Tasks).delete(id)
    if (task.affected == 1){
        return response.status(200).json( {message: "Tarefa excluída com sucesso!"} );
    }
    else{
        return response.status(404).json( {message: "Tarefa não encontrada!"} )
    }
};
export const finishedTask = async(request: Request, response: Response) => {
    try{ 
        const {id} = request.params

        const options: FindOneOptions<Tasks> = {
            where: {  id: parseInt(id, 10) },
        };
        const task = await getRepository(Tasks).update(id, {
        finished: true,
    })
    if (task.affected == 1){
        const taskFinished = await getRepository(Tasks).findOne(options)
        return response.json(taskFinished);
    }
    else{
        return response.status(404).json( {message: "Tarefa não encontrada!"} )
    }} catch (error) {
        response.json({
          error: true,
          message: error.message
        }); 
   }
};


// import { getRepository } from "typeorm";
// import { Tasks } from '../entity/Tasks';
// import { Request, Response } from "express";

// export const getTalks = async(request: Request, response: Response) => {
//     const tasks = await getRepository(Tasks).find()
//     return response.json(tasks);
// };

// export const salveTask = async(request: Request, response: Response) => {
//     try {
//         //console.log(`erro request: ${request}`)
//         //console.log("Request:", JSON.stringify(request, null, 2));
        
//     const tasks = await getRepository(Tasks).save(request.body)

//     return response.json(tasks);

//     } catch (error) {
//         response.json({
//           error: true,
//           message: error.message
//         }); 
//     }
// };
