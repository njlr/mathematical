'use strict';

const success = (value) => {
  return {
    isSuccess: true,
    value,
    map: (f) => success(f(value)),
    flatMap: (f) => f(value)
  };
};

const failure = (reason) => {
  return {
    isSuccess: false,
    reason,
    map: (f) => failure(reason),
    flatMap: (f) => failure(reason)
  };
};

const isSuccess = (result) => {
  return result.isSuccess == true;
};

module.exports = {
  success,
  failure,
  isSuccess
};
