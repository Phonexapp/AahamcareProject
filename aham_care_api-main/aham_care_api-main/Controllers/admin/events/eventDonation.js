const EventDonation = require ('../../../models/eventDonation')

module.exports = {
    getEventDonationById: async (req, res) => {
        try {
        
          const { id } = req.params;
          console.log('id=========>', id);
          const donationDetails = await EventDonation.findById(id)
            .populate("userId")
            .populate("eventId");
    
            console.log("donationDetails",donationDetails );
            res.status(200).json(donationDetails)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
      },
}