 var gameid=req.body["gameid"];
    var mobilenum=req.body["mobilenum"];
    var sid=req.body["sid"];
    if(validate(mobilenum)&&validate(sid)&&validate(gameid)){

        supabase.from("users").select("*").eq("userid",mobilenum).eq("sid",sid).then(function(userdata){
        

            if(userdata.data.length>0){

            }
        
                            else{

                                /// user auth failed 
                
                                res.send({
                                    "error":true,
                                    "route":"/login"
                                })
                
                            }
        
        });

    }

