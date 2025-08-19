let mongoose = require('mongoose');

let ExerciseSchema = {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    description: String,
    duration: Number,
    date: {
        type: Date,
        required: true
    }
}

module.exports = mongoose.model("Exercise", ExerciseSchema)