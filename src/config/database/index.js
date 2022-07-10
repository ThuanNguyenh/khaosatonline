const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thuannguyen:thuan22102002@cluster0.rbxfe.mongodb.net/?retryWrites=true&w=majority/survey');
        console.log("kết nối database thành công!!!");
    } catch (error) {
        console.log("kết nối database thất bại!!!");
    }
}

module.exports = { connect }