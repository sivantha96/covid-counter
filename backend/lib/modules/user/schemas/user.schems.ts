import * as mongoose from 'mongoose';
import { gender } from '../../common/models/common.model';

const Schema = mongoose.Schema;

const schema = new Schema({
    family_members: Number,
    is_visited_foreing_country: Boolean,
    is_member_visited_foreing_country: Boolean,
    age: String,
    gender: String,
    disease: [{
        name: String,
        severity: String
    }]
});

export default mongoose.model('user_symptoms', schema);