import mongoose from 'mongoose';
import User from './Users.js';

const EventSchema = new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    city:{
        type:String
    },
    venue:{
        type:String
    }
});
const Event = mongoose.model('event',EventSchema);
export default Event;