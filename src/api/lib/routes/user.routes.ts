import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {

    private user_data_controller : UserController = new UserController();

    public route(app: Application) {
        app.get('/users', (req: Request, res: Response) => {
            res.status(200).send({message: "Get all users ongoing"});
        })
    }
}