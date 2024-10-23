import mongoose from 'mongoose';
import Event from './events.js';

const TicketSchema = new mongoose.Schema({
    limit:{
        type:number
    },
    price:{
        type:number
    },
    validity:{
        type:Date
    },
    eId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Event
    }
});
const Ticket = mongoose.model('Tickets',TicketSchema);
export default Ticket;