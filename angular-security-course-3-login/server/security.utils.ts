
const util = require('util');
const crypto1 = require('crypto');

// get Promise-based version of function randomBytes
export const randomBytes = util.promisify(crypto1.randomBytes);

// crypto1.randomBytes(32, (err, num) =>{

// });

// randomBytes(32)
//   .then(num => console.log(num))
//   .catch(err => {

//   });
