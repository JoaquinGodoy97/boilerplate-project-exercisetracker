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
            duration: duration,
            date: new Date(date || Date.now()).toDateString()
        })

        const saved = await exercise.save();
        res.status(201).json({ 
            _id: user._id,
            username: user.username,
            date: saved.date,
            duration: saved.duration,
            description: saved.description})

    } catch (error) {
        console.error(error.message)
        res.status(error.status || 500).json({ error: error.message })
    }
}

async function getExerciseLogs(req, res, next) {

    const { _id: userId } = req.params
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: "User not found."})
    
    const filter = { userId };
    const from = req.query.from ? new Date(req.query.from) : null;
    const to   = req.query.to   ? new Date(req.query.to)   : null;

    if (from || to) {
        filter.date = {};
        if (from) filter.date.$gte = from;
        if (to)   filter.date.$lte = to;
    }
    
    let query = Exercise.find(filter).select("-userId -__v -_id");
    if (req.query.limit) query = query.limit(parseInt(req.query.limit));

    let resultsForUser = await query.exec();

    let formattedLogs = resultsForUser.map(item => ({
        description: item.description,
        duration: Number(item.duration) || 0,
        date: item.date.toDateString()
    }));


    let formatted = { 
        _id: user._id,
        username: user.username, 
        from: from ? from.toDateString() : undefined,
        to: to ? to.toDateString() : undefined,
        count: formattedLogs.length, 
        log: formattedLogs
    };

    res.json(formatted)
}

module.exports = {
    addExercises,
    getExerciseLogs
}