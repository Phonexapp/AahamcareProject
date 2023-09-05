const User = require ('../../../models/user')

module.exports = {
    getAllUser: async (req,res)=>{
        try {
            const users = await User.find().select('name email phone_no photo')
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    getUserById : async (req, res)=>{
        try {
            const {id} = req.params
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }


}