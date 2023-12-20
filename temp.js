   
      /////// player 2 hash valid
      console.log("gamedetails verified");

      if (gamedetails["dice"] == 'p2') {
        /// valid dice 
        console.log("from player1 validated1");

        const randomNumber = getRandomInt(1, 7);


        if (randomNumber == 6) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {
            var time = new Date();
            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": 6,
                "p2_p1_l": 0,
                "p2_p2_l": gamedetails["p2_p2_l"],
                "p2_p3_l": gamedetails["p2_p3_l"],
                "p2_p4_l": gamedetails["p2_p4_l"],
                "lastaction": time,
                "dice": "p2",

                "move": "-",


              }
            })

          }

          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }
        else if (randomNumber == 5) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {

            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": randomNumber,

                "lastaction": time,

                "dice": "p1",
                "move": "-",


              }
            })
          }


          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }



        else if (randomNumber == 4) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {

            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": randomNumber,

                "lastaction": time,

                "dice": "p1",
                "move": "-",


              }
            })
          }

          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }


        else if (randomNumber == 3) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {

            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": 3,

                "lastaction": time,

                "dice": "p1",
                "move": "-",


              }
            })
          }
          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }


        else if (randomNumber == 2) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {

            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": 2,

                "lastaction": time,

                "dice": "p1",
                "move": "-",


              }
            })
          }
          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }


        else if (randomNumber == 1) {

          if (gamedetails["p2_p1_l"] == -1 && gamedetails["p2_p2_l"] == -1 && gamedetails["p2_p3_l"] == -1 && gamedetails["p2_p4_l"] == -1) {

            /// all players are in home 
            db.collection("games").updateOne({
              "id": gamedetails["id"]
            }, {
              $set: {
                "dicenum": 1,

                "lastaction": time,

                "dice": "p1",
                "move": "-",


              }
            })
          }

          else {

            var posiblemove = findpossiblemove(gamedetails["p2_p1_l"], gamedetails["p2_p2_l"], gamedetails["p2_p3_l"], gamedetails["p2_p4_l"], randomNumber);



            if (posiblemove[0] == false && posiblemove[1] == false && posiblemove[2] == false && posiblemove[3] == false) {

              /// no posible move

              db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {
                  "dicenum": randomNumber,

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })

            }
            else if (checkonlyonemove(posiblemove) > 0) {

              var psbm = checkonlyonemove();


              if (psbm == 1) {

                movepawn(gamedetails, "p2_p1", randomNumber, res);


              }
              else if (psbm == 2) {

                movepawn(gamedetails, "p2_p2", randomNumber, res);


              }

              else if (psbm == 3) {
                movepawn(gamedetails, "p2_p3", randomNumber, res);



              }

              else if (psbm == 4) {
                movepawn(gamedetails, "p2_p4", randomNumber, res);



              }





            }
            else {
              var staus1 = await db.collection("games").updateOne({
                "id": gamedetails["id"]
              }, {
                $set: {

                  "dicenum": randomNumber,
                  "p1_p": posiblemove[0],
                  "p2_p": posiblemove[1],
                  "p3_p": posiblemove[2],
                  "p4_p": posiblemove[3],

                  "lastaction": time,

                  "dice": "p1",
                  "move": "-",


                }
              })




              if (staus1.modifiedCount > 0) {


                var daya = await db.collection("games").findOne({
                  "id": gamedetails["id"]

                }, {
                  projection: {
                    "_id": 0,
                    "player1_hash": 0,
                    "player2_hash": 0
                  }
                });



                client.publish("games/" + gamedetails["gamechannel"], JSON.stringify(daya));


                res.send({
                  "error": false
                })




              }


            }










          }

        }






      }

