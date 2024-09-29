import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export const Customer = mongoose.model("Customer", customerSchema);
