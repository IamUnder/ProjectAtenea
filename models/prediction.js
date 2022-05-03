// Importamos mongoose
const mongoose = require('mongoose')

// Definimos el modelo
const PredictSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    guild_id: {
        type: String,
        required: true
    },
    prediction: {   
        type: String,
        required: true
    },
    options: {
        type: Array,
        default: []
    },
    bet: {
        type: Array,
        default: []
    },
    points: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Prediction', PredictSchema)