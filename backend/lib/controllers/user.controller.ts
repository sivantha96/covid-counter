import { Request, Response } from 'express';
import insufficientParameter from '../modules/common/services/insufficient-parameter';
import { gender, response_status_codes } from '../modules/common/models/common.model';
import { UserService } from '../modules/user/services/user.service';
import { IUser } from '../modules/user/models/user.model';
import internalServerError from '../modules/common/services/internal-server-error';

export class UserController {

    private user_service: UserService = new UserService();

    public create_user_symptoms(req: Request, res: Response) {
        if (req.body.gender &&
            req.body.age &&
            req.body.family_members &&
            req.body.disease) {
            if (Object.values(gender).indexOf(req.body.gender) > -1 && req.body.age > 0) {
                const user: IUser = {
                    gender: req.body.gender,
                    age: req.body.age,
                    family_members: req.body.family_members,
                    is_visited_foreing_country: req.body.is_visited_foreing_country,
                    is_member_visited_foreing_country: req.body.is_member_visited_foreing_country,
                    disease: req.body.disease
                }
                this.user_service.createUser(user, (err: any) => {
                    if (err) {
                        internalServerError(err, res);
                    } else {
                        res.status(response_status_codes.success).json({
                            STATUS: 'SUCCESS',
                            MESSAGE: 'Symptons added successfully',
                            DATA: {}
                        });
                    }
                });
            } else {
                res.status(response_status_codes.success).json({
                    STATUS: 'FAILURE',
                    MESSAGE: 'Invalid gender type or age',
                    DATA: {}
                });
            }
        } else {
            insufficientParameter(res);
        }
    }
}