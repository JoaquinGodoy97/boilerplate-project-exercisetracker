const UserModel = require("../models/User")

async function createUser(req, res, next) {
    console.log(req.body.username)
    const inputUsername = req.body.username;

    if (!inputUsername) return res.status(400).json({ error: "Username needed." })
    
    try {
        const user = new UserModel({
            username: inputUsername
        });
        const savedUser = await user.save();

        return res
            .status(201)
            .json({ username: savedUser.username, _id: savedUser._id })
    } catch (error) {
        console.error(error.message)
        res.status(409).redirect('/')
    }
}

module.exports = {
    createUser
}