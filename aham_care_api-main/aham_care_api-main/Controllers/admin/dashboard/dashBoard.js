const Event = require("../../../models/event");
const Organaization = require("../../../models/organaization");
const Store = require("../../../models/store");
const User = require("../../../models/user");

// Orders
const storeOrder = require("../../../models/storeDonation");
const reqOrder = require("../../../models/donation");

module.exports = {
  getAdminPanelDatails: async (req, res) => {
    try {
      const totalEvents = await Event.countDocuments({ status: "Active" });
      const totalOrganaization = await Organaization.countDocuments({
        status: "Active",
      });
      const totalStore = await Store.countDocuments({ status: "Active" });
      console.log(totalStore);
      const totalUser = await User.countDocuments();

      // get requirement order details
      const reqPending = await reqOrder.countDocuments({
        status: "Pending",
      });
      const reqCompleted = await reqOrder.countDocuments({
        status: "Completed",
      });
      const reqProcessing = await reqOrder.countDocuments({
        status: "Processing",
      });

      //   get Event details
      const eventDetails = await Event.find({ status: "Active" }).select(
        "event remainingTickets"
      );

      const eventChartData = eventDetails.map((event) => ({
        label: event.event,
        value: event.remainingTickets
      }));

      const dashboard = {
        totalEvents,
        totalOrganaization,
        totalStore,
        totalUser,
        reqPending,
        reqCompleted,
        reqProcessing,
        eventDetails,
      };

      //   Store order details based on status
      const storeOrders = await storeOrder.aggregate([
        {
          $group: {
            _id: "$status",
            days: {
              $push: { $dayOfMonth: "$createdAt" },
            },
          },
        },

        {
          $project:{
            _id:0,
            name: "$_id",
            date:'$days'
          }
        }
      ]);
      let Received = {}
      let Processing = {}
      let Completed = {}
      const graphData = storeOrders.map((item) => {
        
        if (item?.name === 'Received') {
          console.log('rec');
           Received = {
            name: 'Received',
            type: 'column',
            fill: 'solid',
            data: item?.date,
          };

          return Received;
        } else if (item?.name === 'Processing') {
           Processing = {
            name: 'Processing',
            type: 'area',
            fill: 'gradient',
            data: item?.date,
          };

          return Processing;
        } else if (item?.name === 'Completed') {
          Completed = {
            name: 'Completed',
            type: 'line',
            fill: 'solid',
            data: item?.date,
          };

          return Completed
        }

        
       
        
        return  Received;
      });
      
      





      //  order dates
      const orderDates = await storeOrder.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%d/%m/%Y",
                date: "$createdAt",
                timezone: "+00:00",
              },
            },
          },
        },

        {
          $sort: { _id: 1 },
        },

        {
          $group: {
            _id: null,
            dates: { $push: "$_id" },
          },
        },
        {
          $project: {
            _id: 0,
            dates: 1,
          },
        },
      ]);

      res.status(200).json({ dashboard,graphData, orderDates: orderDates[0].dates, eventChartData });
    } catch (error) {
      res.status(500).json(error.message );
    }
  },
};
