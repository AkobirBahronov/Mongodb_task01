const { CATEGORY, WORKER } = require("../models/WorkerModel");
const _ = require("underscore");
const {
  randomNumber,
  country,
  username,
  year_born,
  year_died,
  company,
  workedYear,
  salary,
  bonus,
  speciality,
} = require("../config/random");
const { callbackSuccessJson } = require("../config/callback");

exports.createData_1 = async (req, res) => {
  const count = 300;

  const categories = await CATEGORY.find();

  const arrayCategoryID = [];
  for (let category of categories) {
    const { _id } = category;
    arrayCategoryID.push(_id);
  }
  console.log(arrayCategoryID);
  const recursion = async (RECURSION_NUMBER) => {
    if (RECURSION_NUMBER > 0) {
      const result = new WORKER({
        name: _.sample(username),
        count: randomNumber(100),
        views: randomNumber(10000),
        ball: [
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
        ],
        country: _.sample(country),
        company: _.sample(company),
        workedYear: _.sample(workedYear),
        salary: {
          january: _.sample(salary),
          february: _.sample(salary),
          march: _.sample(salary),
          april: _.sample(salary),
          may: _.sample(salary),
          june: _.sample(salary),
        },
        bonus: {
          january: _.sample(bonus),
          february: _.sample(bonus),
          march: _.sample(bonus),
          april: _.sample(bonus),
          may: _.sample(bonus),
          june: _.sample(bonus),
        },
        year_born: _.sample(year_born),
        year_died: _.sample(year_died),
        speciality: _.sample(speciality),
        category: _.sample(arrayCategoryID),
      });
      await result.save();
      console.log("Saved", result);

      recursion(RECURSION_NUMBER - 1);
    }
  };
  recursion(count);
  const result = await WORKER.find();

  res.json(callbackSuccessJson(result, "created"));
};

exports.getBestWorker2017_2019 = async (req, res, next) => {
  const pipeline = [
    {
      $facet: {
        year_2017: [
          {
            $match: { workedYear: { $eq: 2017 } },
          },
          {
            $project: {
              name: 1,
              salaryAmount: {
                $add: [
                  "$salary.january",
                  "$salary.february",
                  "$salary.march",
                  "$salary.april",
                  "$salary.may",
                  "$salary.june",
                ],
              },
            },
          },
          {
            $sort: {
              salaryAmount: -1,
            },
          },
          { $limit: 5 },
        ],
        year_2019: [
          {
            $match: { workedYear: { $eq: 2019 } },
          },
          {
            $project: {
              name: 1,
              salaryAmount: {
                $add: [
                  "$salary.january",
                  "$salary.february",
                  "$salary.march",
                  "$salary.april",
                  "$salary.may",
                  "$salary.june",
                ],
              },
            },
          },
          {
            $sort: {
              salaryAmount: -1,
            },
          },
          { $limit: 5 },
        ],
      },
    },
  ];

  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};

exports.getUSA2019Bonus = async (req, res, next) => {
  const pipeline = [
    {
      $match: { country: { $eq: "United States" }, workedYear: { $eq: 2019 } },
    },
    {
      $project: {
        name: 1,
        bonusAmount: {
          $add: [
            "$bonus.january",
            "$bonus.february",
            "$bonus.march",
            "$bonus.april",
            "$bonus.may",
            "$bonus.june",
          ],
        },
      },
    },
  ];

  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};

exports.getFaceBookWorkers = async (req, res, next) => {
  const pipeline = [
    {
      $match: { company: { $eq: "Facebook" }, workedYear: { $eq: 2019 } },
    },
    {
      $project: {
        name: 1,
        salary: 1,
        totalBalls: {
          $sum: "ball",
        },
      },
    },
    {
      $match: { totalBalls: { $lt: 130 } },
    },
    {
      $project: {
        name: 1,
        salaryAmount: {
          $add: [
            "$salary.january",
            "$salary.february",
            "$salary.march",
            "$salary.april",
            "$salary.may",
            "$salary.june",
          ],
        },
      },
    },
    {
      $sort: {
        salaryAmount: -1,
      },
    },
    { $limit: 1 },
  ];

  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};

exports.getDWorkers = async (req, res, next) => {
  const category = await CATEGORY.findOne({ category: "D" });

  const d_ID = category._id;

  const pipeline = [
    {
      $match: {
        category: { $eq: d_ID },
        company: { $in: ["Facebook", "Amazon"] },
      },
    },
    {
      $project: {
        name: 1,
        bonusAmount: {
          $add: [
            "$bonus.january",
            "$bonus.february",
            "$bonus.march",
            "$bonus.april",
            "$bonus.may",
            "$bonus.june",
          ],
        },
      },
    },
    {
      $bucket: {
        groupBy: "$bonusAmount",
        boundaries: [600, 1200, 1800, 2400, 3000],
        default: "Other",
        output: {
          count: { $sum: 1 },
          workers: {
            $push: {
              name: "$name",
              bonusAmount: "$bonusAmount",
            },
          },
        },
      },
    },
  ];

  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};

exports.getGoogleTwitterAmazon = async (req, res, next) => {
  const pipeline = [
    {
      $facet: {
        Google: [
          {
            $match: {
              company: { $eq: "Google" },
            },
          },
          {
            $project: {
              name: 1,
              company: 1,
              salaryAmount: {
                $add: [
                  "$salary.january",
                  "$salary.february",
                  "$salary.march",
                  "$salary.april",
                  "$salary.may",
                  "$salary.june",
                ],
              },
            },
          },
          {
            $sort: {
              salaryAmount: -1,
            },
          },
          { $limit: 5 },
        ],
        Twitter: [
          {
            $match: {
              company: { $eq: "Twitter" },
            },
          },
          {
            $project: {
              name: 1,
              company: 1,
              salaryAmount: {
                $add: [
                  "$salary.january",
                  "$salary.february",
                  "$salary.march",
                  "$salary.april",
                  "$salary.may",
                  "$salary.june",
                ],
              },
            },
          },
          {
            $sort: {
              salaryAmount: -1,
            },
          },
          { $limit: 5 },
        ],
        Amazon: [
          {
            $match: {
              company: { $eq: "Amazon" },
            },
          },
          {
            $project: {
              name: 1,
              company: 1,
              salaryAmount: {
                $add: [
                  "$salary.january",
                  "$salary.february",
                  "$salary.march",
                  "$salary.april",
                  "$salary.may",
                  "$salary.june",
                ],
              },
            },
          },
          {
            $sort: {
              salaryAmount: -1,
            },
          },
          { $limit: 5 },
        ],
      },
    },
  ];

  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};

exports.getCanadianWorkers = async (req, res, next) => {
  const pipeline = [
    {
      $facet: {
        january: [
          {
            $match: {
              country: { $eq: "Canada" },
              speciality: { $in: ["driver ", "doctor"] },
            },
          },
          {
            $project: {
              name: 1,
              janSalary: "$salary.january",
            },
          },
          {
            $sort: {
              janSalary: 1,
            },
          },
        ],
        march: [
          {
            $match: {
              country: { $eq: "Canada" },
              speciality: { $in: ["driver ", "doctor"] },
            },
          },
          {
            $project: {
              name: 1,
              marchSalary: "$salary.march",
            },
          },
          {
            $sort: {
              marchSalary: 1,
            },
          },
        ],
      },
    },
  ];
  const result = await WORKER.aggregate(pipeline);
  res.json({
    data: result,
  });
};
