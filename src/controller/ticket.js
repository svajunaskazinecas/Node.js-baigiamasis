import { v4 as uuidv4 } from "uuid";
import TicketModel from "../model/ticket.js";

const REGISTER = (req, res) => {};
const LOGIN = (req, res) => {};
const TOKEN = (req, res) => {};
const USERS = async (req, res) => {};
const USER_BY_ID = (req, res) => {};

const TICKET = async (req, res) => {
  try {
    const ticket = {
      id: uuidv4(),
      title: req.body.title,
      price: req.body.price,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      to_location_photo_url: req.body.to_location_photo_url,
      owner_id: req.body.owner_id,
    };

    const response = await new TicketModel(ticket);

    await response.save();

    return res
      .status(201)
      .json({ message: "ticket successfully bought", response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export { REGISTER, LOGIN, TOKEN, USERS, USER_BY_ID, TICKET };
