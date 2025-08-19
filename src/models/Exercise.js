let mongoose = require('mongoose');

let ExerciseSchema = {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    description: String,
    minDuration: Number,
    date: String
}

module.exports = mongoose.model("Exercise", ExerciseSchema)