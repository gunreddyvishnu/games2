const axios = require('axios');

const url = 'https://app.games11.in/users';
const headers = {
  'accept-encoding': 'gzip',
  'app-id': '1254sd78gt45vfgb',
  'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiIxMjU0c2Q3OGd0NDV2ZmdiIiwidXNlcl9pZCI6NTk2MzcsImlhdCI6MTY5OTE3MjA5MiwiZXhwIjoxNjk5MjU4NDkyfQ.mUjx3yKaSLQFSOfYwS1pn0AiGLLTAkcWKmQYNp3v2s0',
  'content-type': 'application/json; charset=UTF-8',
  'host': 'app.games11.in',
  'user-agent': 'Dart/2.18 (dart:io)'
};
var gameid=[];
var income=0;

var zzz =function (){

    axios.get(url, { headers })
  .then(response => {
    // Handle the response here
    console.log('Response:', response.data);
  

  
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error:', error);
  });




}

zzz();



//   2470: 2.26 PM     3:26  28620


// 210216
//50000