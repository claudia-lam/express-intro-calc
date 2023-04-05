const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {

  const nums = strNums.split(',').map( num => {
    if (isNaN(Number(num))){
      throw new BadRequestError;
    }
    return Number(num);
  })

  return nums;
}


module.exports = { convertStrNums };