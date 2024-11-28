const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Property title is required"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"]
    },
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    propertyType: { 
      type: String, 
      required: true,
      enum: ["house", "apartment", "condo", "townhouse", "land", "commercial"]
    },
    listingType: {
      type: String,
      required: true,
      enum: ["sale", "rent", "lease"]
    },
    features: {
      bedrooms: { type: Number, required: true, min: 0 },
      bathrooms: { type: Number, required: true, min: 0 },
      squareFeet: { type: Number, required: true, min: 0 },
      yearBuilt: { type: Number },
      parking: { type: Number, default: 0 },
      lotSize: { type: Number },
      furnished: { type: Boolean, default: false }
    },
    amenities: [{
      type: String,
      enum: [
        "pool", "gym", "elevator", "security", "parking", 
        "airConditioning", "heating", "laundry", "storage",
        "balcony", "garden", "fireplace"
      ]
    }],
    images: [{
      url: { type: String, required: true },
      caption: { type: String },
      isPrimary: { type: Boolean, default: false }
    }],
    price: {
      amount: { 
        type: Number, 
        required: true,
        min: [0, "Price cannot be negative"]
      },
      currency: { 
        type: String, 
        default: "USD",
        enum: ["USD", "EUR", "GBP", "NGN"]
      }
    },
    description: { 
      type: String, 
      required: true,
      maxLength: [2000, "Description cannot be more than 2000 characters"]
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "pending", "sold", "rented", "draft"],
      default: "draft"
    },
    featured: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    },
    viewsHistory: [{
      date: { type: Date },
      count: { type: Number }
    }],
    leads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead"
    }],
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    virtualTourUrl: {
      type: String
    },
    floorPlanUrl: {
      type: String
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better search performance
PropertySchema.index({ 
  "address.city": 1, 
  "address.state": 1, 
  propertyType: 1,
  "price.amount": 1,
  status: 1
});

// Virtual for full address
PropertySchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

module.exports = mongoose.model("Property", PropertySchema);
