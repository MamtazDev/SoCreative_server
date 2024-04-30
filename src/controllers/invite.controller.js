const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { setPasswordTemplate } = require('../utils/emailTemplate');

const create = catchAsync(async (req, res) => {
  const {email} = res.body
  setPasswordTemplate(email)

  res.status(httpStatus.CREATED).send({ data: "Data" });
});

const redeem = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send({ data: "Data" });
});

const multiEmail = catchAsync (async (req, res) => {

  const result = await driveService.CreateMultiple( req.body);

  if(result){
    res.status(httpStatus.CREATED).send({data:"Created email based on multiple email address from invite section"})

  }else{
    res.status(httpStatus.EXPECTATION_FAILED).send({data:"Error to create multi account using multiple email"})
  }


})


module.exports = {
  create,
  redeem,
  multiEmail
};
