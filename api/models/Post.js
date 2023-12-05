const {mongoose, Schema, model} = require('mongoose');

const PostSchema = new mongoose.Schema(
{
    author : {
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    summary : {
        type: String,
        required: true,
    },
    body : {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    img: {
        type: String,
    }
},
{ 
    timestamps: {
        createdAt: 'created_at' 
    } 
});

const Post = model("Post", PostSchema);
module.exports = Post;