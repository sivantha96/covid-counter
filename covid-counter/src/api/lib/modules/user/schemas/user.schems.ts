import * as mongoose from 'mongoose';
import { Gender } from 'modules/common/models/common.model';

const Schema = mongoose.Schema;

const schema = new Schema({
    gender: Gender,
    age: Number
});

export default mongoose.model('users', schema);