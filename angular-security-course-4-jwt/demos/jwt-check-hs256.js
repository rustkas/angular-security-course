
var jwt = require('jsonwebtoken');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2MTY0MTA1MTF9.Y5yumCg5dMIEtpua-64C1DVvbGRLxgzesxIqAKlZLjA';


var secretKey = 'secret-key';



const verify = jwt.verify(existingToken, secretKey);


console.log("Decoded JWT:", verify);





