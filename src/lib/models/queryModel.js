import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\+?[1-9]\d{9,14}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please use format: +1234567890`
        },
    },
    message: {
        type: String,
        required: true,
    },
})

const Query = mongoose.models.Query || mongoose.model("Query", querySchema);

export default Query;