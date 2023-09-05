const Event = require("../../../models/event");
const EventDonation = require("../../../models/eventDonation");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const { body } = req;
      console.log("body=>", body);
      const savedEvent = await new Event({
        event: body.event,
        discription: body.discription,
        totalTickets: body.totalTickets,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        totalPrice: body.totalPrice,
        unitPrice: body.unitPrice,
        remainingTickets: body.totalTickets,
        balancePrice: body.totalPrice
      }).save();
      res
        .status(200)
        .json({ savedEvent, message: "Event created successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  editEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const editedEvent = await Event.findByIdAndUpdate(
        id,
        {
        event: body.event,
        discription: body.discription,
        totalTickets: body.totalTickets,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        totalPrice: body.totalPrice,
        unitPrice: body.unitPrice,
        remainingTickets: body.totalTickets,
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Event updated successfully"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;

      await Event.findByIdAndUpdate(id, {
        status: "Deleted",
      });

      res.status(200).json({ message: "Event Deleted Sucessfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  changeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      await Event.findByIdAndUpdate(id, {
        $set: { status: body.status },
      });

      res.status(200).json({ message: `status changed to ${body.status}` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find({ status: { $ne: "Deleted" } }).sort({
        createdAt: -1,
      });

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id)
        .populate("donations")
        .sort({ createdAt: -1 });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventDonations: async (req, res) => {
    try {
      const { eventId } = req.params;
      const donations = await EventDonation.find({
        eventId,
        status: { $ne: "Delete" },
      })
        .populate("userId")
        .sort({ createdAt: -1 });
      res.status(200).json({donations});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
