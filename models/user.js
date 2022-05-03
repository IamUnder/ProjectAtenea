// Importamos mongoose
const mongoose = require('mongoose')

// Definimos el modelo
const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    guild_id: {
        type: String,
        required: true
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

module.exports = mongoose.model('User', UserSchema)