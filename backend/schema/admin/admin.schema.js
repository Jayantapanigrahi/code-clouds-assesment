const mongoose = require('mongoose');


const AdminSchema = mongoose.Schema({
    
    email_id: { type: String, required: true, unique: true, trim: true, lowercase: true, },
    password: { type: String,  required: true},
    deleted: { type: Boolean, default: false, required: true },
}, {
    timestamps: true,
});


module.exports = mongoose.model('admins', AdminSchema);