const mongoose = require('mongoose');


const LocationSchema = mongoose.Schema({
    
    place: { type: String, required: true, unique: true, trim: true, lowercase: true, },
    location:{ type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
     coordinates: { 
      type: [Number],
      default: [0, 0],
    }},
    deleted: { type: Boolean, default: false, required: true },
}, {
    timestamps: true,
});

LocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('location', LocationSchema);