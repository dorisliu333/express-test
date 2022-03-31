const jwt = require('jsonwebtoken');

const secret = 'secret';

const tokenValue = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiaWF0IjoxNjQ3OTQ2NTM1LCJleHAiOjE2NDgwMzI5MzV9.9Rt0C92Yfv_yDlPSwNn0Xk3EJumJNb67gbUQh3ei5QY";
const payload = {
    id:1234
}

const token = jwt.sign(payload,secret,{expiresIN:'1d'})

const valid = jwt.verify(tokenValue,secret);

console.log(token);
console.log(valid);