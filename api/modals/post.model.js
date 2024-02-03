import mongoose, { Schema } from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWq_8tjM153K_tv7EpSUe2R0ypW6b6WiUJQ9WE0SIENg&s"
    },
    category:{
        type:String,
        default: "uncategorized"
    },
    slug:{
        type:String,
        unique:true,
        required:true
    }

}, {timestamps:true})


const Post = mongoose.model('Post', postSchema)

export default Post