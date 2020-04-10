import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {

    private user_controller : UserController = new UserController();

    public route(app: Application) {
        app.post('/users/symptoms', (req: Request, res: Response) => {
            this.user_controller.create_user_symptoms(req, res);
        })
    }
}