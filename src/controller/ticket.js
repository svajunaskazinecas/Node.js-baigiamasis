import Ticket from "../model/ticket.js";
import User from "../model/user.js";
import { v4 as uuidv4 } from "uuid";

export const buyTicket = async (req, res) => {
  const {
    title,
    ticket_price,
    from_location,
    to_location,
    to_location_photo_url,
  } = req.body;
  const userId = req.userId;

  console.log(`UserId: ${userId}`);

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.money_balance < ticket_price) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const ticket = await Ticket.create({
      id: uuidv4(),
      title,
      ticket_price,
      from_location,
      to_location,
      to_location_photo_url,
      owner_id: userId,
    });

    user.money_balance -= ticket_price;
    user.bought_tickets.push(ticket.id);
    await user.save();

    res
      .status(200)
      .json({
        message: "Ticket purchased successfully",
        ticket,
        money_balance: user.money_balance,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
