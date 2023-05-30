import { Router, Request, Response } from 'express';
import { getTasks, getTask, salveTask, updateTask, deleteTask, finishedTask } from './controller/TasksController';

const routes = Router();

routes.get('/home', (request: Request, response: Response) => {
  return response.json({ message: 'Hello Turma 007!' });
});

routes.get('/tasks', getTasks);
routes.get('/tasks/:id', getTask);
routes.post('/tasks', (req: Request, res: Response) => {

  return salveTask(req, res);
});
routes.put('/tasks/:id', updateTask)
routes.delete('/tasks/id', deleteTask)
routes.patch('/task/:id', finishedTask)
export default routes;
