import mongoose from "mongoose"

let languageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  scope: {
    type: Array,
    required: true,
    default: []
  },
  duration: {
    type: Number,
    required: true
  },
  difficulties: {
    type: String,
    required: true
  }
})

let languageModel = new mongoose.model("languages", languageSchema)

export { languageModel }