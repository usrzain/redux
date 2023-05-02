import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    userName:{ type: String, unique: true},
    userEmail:{ type: String, unique: true},
    password:{ type: String }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)

export default userModel;