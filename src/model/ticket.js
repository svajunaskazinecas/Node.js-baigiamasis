import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: { type: String, required: true },
  ticket_price: { type: Number, required: true },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
  to_location_photo_url: { type: String, required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Ticket", ticketSchema);
