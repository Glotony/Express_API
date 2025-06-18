import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlenght: [2, "must be at least 2 characters"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "please input a valid email"]
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlenght: [6, "must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "moderator"],
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model("User", userSchema)