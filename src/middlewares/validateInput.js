const mongoose = require("mongoose");

const isSafeString = (value) => {
  return typeof value === "string";
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidCCCD = (cccd) => {
  return /^\d{12}$/.test(cccd);
};

const isValidPhone = (phone) => {
  return /^\d{9,11}$/.test(phone);
};

module.exports = {
  isSafeString,
  isValidObjectId,
  isValidCCCD,
  isValidPhone
};