const User = require("../models/User");

async function createUser(req, res, next) {
    console.log(req.body.username)
    const inputUsername = req.body.username;

    if (!inputUsername) return res.status(400).json({ error: "Username needed." })
    
    try {
        const user = new User({
            username: inputUsername
        });
        const savedUser = await user.save();

        return res
            .status(201)
            .json({ _id: savedUser._id, username: savedUser.username  })
    } catch (error) {
        console.error(error.message)
        res.status(409).redirect('/')
    }
}

async function getAllUsers(req, res, next) {
    // UserModel.
    const users = await User.find({}).select("-__v")
    res.json(users)   
}



module.exports = {
    createUser,
    getAllUsers
}