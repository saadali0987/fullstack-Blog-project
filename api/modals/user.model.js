import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    profilePicture:{
        type: String,
        default: "https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg"
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

}, {timestamps:true})


const User = mongoose.model('User', userSchema)

export default User