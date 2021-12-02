const httpStatus = require('http-status');
const config = require('../config/config');

const authadmin = () => async (req, res, next) => {
  try {
    const header = req.headers.adminheader;
    const adminsecret = config.adminsecret;
    if(header == undefined || header == null){
      res.status(httpStatus.UNAUTHORIZED).json('You dont have Access to these resources');
    }else if(header != adminsecret ){
      res.status(httpStatus.UNAUTHORIZED).json('Admin Secret does not match');
    }else{
      next();
    }
  } catch (error) { 
    res.status(httpStatus.BAD_REQUEST).json({ message:'Forbidden Error' });
  };
  };

module.exports = authadmin;
