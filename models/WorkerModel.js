const { Schema, model } = require("mongoose");
const WORKER_schema = Schema({
  category: { type: Schema.ObjectId, ref: "category", required: true },
  name: { type: String, required: true }, //
  count: { type: Number, required: true }, // random (1-100)
  views: { type: Number, required: true }, // random (1 -10000)
  ball: [{ type: Number, required: true }], // random (1-20) faqat 10 tadan iborat bolsin massivda
  country: { type: String, required: true }, // random [ "United States", "Canada", "Afghanistan","Albania", "Algeria", "American Samoa", "Andorra",]
  company: { type: String, required: true }, // random [ "Google", "Amazon", "ePam", "Ubay", "Facebook", "Twitter", "Eurosoft", "Decore IT" ]
  workedYear: { type: Number, required: true }, // random [ 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022 ]
  salary: {
    january: { type: Number, required: true }, // random (10000 - 100000)
    february: { type: Number, required: true }, // random (10000 - 100000)
    march: { type: Number, required: true }, // random (10000 - 100000)
    april: { type: Number, required: true }, // random (10000 - 100000)
    may: { type: Number, required: true }, // random (10000 - 100000)
    june: { type: Number, required: true }, // random (10000 - 100000)
  },
  bonus: {
    january: { type: Number, required: true }, // random (100 - 1000)
    february: { type: Number, required: true }, // random (100 - 1000)
    march: { type: Number, required: true }, // random (100 - 1000)
    april: { type: Number, required: true }, // random (100 - 1000)
    may: { type: Number, required: true }, // random (100 - 1000)
    june: { type: Number, required: true }, // random (100 - 1000)
  },
  year_born: { type: Number, required: true }, // random:[1991,1992,1993,1994,1995,1996,1997,1998,1999,2000]
  year_died: { type: Number, required: true }, // random:[2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
  speciality: { type: String, required: true }, // random: [student, mentor, driver, accounter,doctor, chef]
});
const CATEGORY_schema = Schema({
  category: { type: String, required: true }, // [A,B,C,D,E,F]
});
const CATEGORY = model("category", CATEGORY_schema);
const WORKER = model("worker", WORKER_schema);
module.exports = { WORKER, CATEGORY };
