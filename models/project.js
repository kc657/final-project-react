import mongoose from 'mongoose'
const Schema = mongoose.Schema
const User = require('./user')

const ProjectSchema = new Schema({
    title: String,
    transcript: String,
    dateDue: Date,
    totalAttempts: Number,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: { type: Date, default: Date.now }
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project