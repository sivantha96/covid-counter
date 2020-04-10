import { gender, severity } from "../../common/models/common.model";

export interface IUser {
    family_members: Number,
    is_visited_foreing_country: Boolean,
    is_member_visited_foreing_country: Boolean,
    age: String,
    gender: String,
    disease: [{
        name: String,
        severity: severity
    }]
}