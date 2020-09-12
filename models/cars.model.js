const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  baseUrl:{
    type:String,
    required:true,
    unique:false,
    trim:true
  },
  path:{
    type:String,
    required:true,
    unique:false,
    trim:true
  }
});

const sellerSchema = new mongoose.Schema({
  photo:{
    type:imageSchema
  },
  username:{
    type: String,
    required: true,
    unique: false,
    trim: true
  }
})

const carSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mainPhoto:{
    type:imageSchema
  },
  title: {
    type: String,
    required: true,
  },
  subTitle:{
    type: String,
    required: true
  },
  noReserve:{
    type: Boolean,
    required: true
  },
  location: {
    type: String,
    required: true,
    unique: false
  },
  seller:{
    type:sellerSchema
  },
  exteriorPhoto:{
    type:imageSchema
  },
  interiorPhoto:{
    type:imageSchema
  },
  highlightedPoints:{
    type:[String]
  }
}, {
  timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;