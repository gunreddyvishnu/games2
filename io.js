const axios = require('axios');

const url = 'https://app.games11.in/users/game/challenge-list';
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
    // console.log('Response:', response.data.data);
    response.data.data.forEach(element => {
        if(gameid.includes(element["game_id"])){
            // console.log("Game ID already exists");
        }
        else{
            if(element["status"]=="LIVE"){
                gameid.push(element["game_id"]);
                income=income+(element["coin"]*2)*0.10
                console.log("TOTAL MONEY : "+ income.toString());
            }
        }
    });
   

  
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error:', error);
  });




}

setInterval(() => {
    zzz();
  }, 10000);





// 4174