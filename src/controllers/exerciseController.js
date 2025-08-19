const Exercise = require('../models/Exercise');
const ExerciseModel = require('../models/Exercise');
const User = require('../models/User');

async function addExercises(req, res, next) {

    try {
        const { _id: userId } = req.params
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date;

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ error: "User not found."})
    
        const exercise = new ExerciseModel({
            userId,
            description: description,
            minDuration: duration,
            date: date ? new Date(date) : new Date()
        })

        const saved = await exercise.save();
        res.status(201).json({ 
            description: saved.description,
            minDuration: saved.minDuration,
            date: saved.date})

    } catch (error) {
        console.error(error.message)
        res.status(error.status || 500).json({ error: error.message })
    }
}

async function getExerciseLogs(req, res, next) {

    const { _id: userId } = req.params
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: "User not found."})
    

    const query = Exercise.find({ userId: userId}).select("-userId -__v _id");

    if(req.query.limit) query.limit(parseInt(req.query.limit))

    let resultsForUser = await query.exec();
    
    if (req.query.from || req.query.to) {
        const from = req.query.from ? new Date(req.query.from) : null;
        const to = req.query.to ? new Date(req.query.to)   : null;

        resultsForUser = resultsForUser.filter(item => {
            const date = new Date(item.date);
            return (!from || date >= from) && (!to || date <= to);
        });
    }

    res.json({ _id: user._id, username: user.username, count: resultsForUser.length, log: resultsForUser})
}

module.exports = {
    addExercises,
    getExerciseLogs
}