
var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2MTY0MTM1MTF9.ZRnBVF2XJ8GrrnaP8T1PzTEeghATpgPLqN4_8IPkyQOyefGGMo-d66LGfPEboY-1rn4EFVko37e0-9StdEAajZmFZmysAZrNjdoGcpSJyd9vwdUJxTmsIRJ8hOzYYwglFJZtSnSzwsjZahvQMffZ7wq7SmHII88Vvb2_iofAKZa0mDpkguHih8QtwxS-uEppkJEUuqBSvlMlMMU3LdHrIkHXhN1DO-6dPT8e1dj4bZs1MDF8BMPzyJu4BVidNk9ZWOMg2Voj2HXDgRrXZw4KcjF88g-Fcy8SJqrRhFEWV5xlnOpx3bXRXwveciAQUIImuc2z2nSTyDmXTvjAyNotFg';


var publicKey = fs.readFileSync('./demos/public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);

