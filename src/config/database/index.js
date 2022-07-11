const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nguyenvanthuan:thuan22102002@cluster0.w0fje.mongodb.net/survey?retryWrites=true&w=majority');
        console.log("kết nối database thành công!!!");
    } catch (error) {
        console.log("kết nối database thất bại!!!");
    }
}

module.exports = { connect }