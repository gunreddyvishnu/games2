   supabase.from("users").select("*").eq('userid', useruid).then(function(userinfo){

                    supabase.from("users").update({
                        "wallet_balance":userinfo.body[0]["wallet_balance"]+gamedata.data[0]["amount_won"]
                       
                    }).eq('userid', useruid).then(function(ress1){
                    
                        if(ress1.error){
                    
                            res.send({
                                "status":false,
                                "error":true,
                                "message":"Try Again"                
                                })
                    
                    
                    
                        }
                        else{
                    
                            /// no error 
                            supabase.from("games").insert([
                    
                                {
                                    "host_id":useruid,
                                    "host_name":ress.body[0]["name"],
                                    "amount":amount,
                                    "amount_won":(amount*2)*servicetax,
                                    "status":0,
                                    "host_dp":ress.body[0]["user_dp"],
                                }
                    
                            ]).then(function(ress_2){
                    
                    if(ress_2.error){
                    
                        res.send({
                            "status":false,
                            "error":true,
                            "message":"UNKOWN ERROR"                
                            })
                    
                    
                    }
                    else{
                    
                        res.send({
                            "status":false,
                            "roomid":ress_2.data["id"],
                            "error":false, 
                            })
                    }
                    
                    
                            });
                    
                    
                    
                           
                        }
                    })


                });