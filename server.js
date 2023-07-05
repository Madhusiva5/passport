const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const { process_params } = require("express/lib/router")

let mail1;
const app=express()

 
const encoder=bodyparser.urlencoded({ extended: true });
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"passport1"
})

con.connect(function(error){
    if(error)
    throw error; 
    else{
        console.log("Database connected")
    }

})





app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/welcome",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.get("/disp",(req,res)=>{
    res.sendFile(__dirname+"/display.html")
})

app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html");
})
app.get("/del",function(req,res){
    res.sendFile(__dirname+"/delete.html");
})
app.get("/gets",function(req,res){ 
    res.sendFile(__dirname+"/search.html");
})
app.get("/admin",function(req,res){ 
    res.sendFile(__dirname+"/admin.html");
})
app.get("/status",function(req,res){
    res.sendFile(__dirname+"/status.html");
})
app.get("/details",function(req,res){
    res.sendFile(__dirname+"/details.html");
})
app.listen(4000,function(){
    console.log("server created") 
})

app.post("/adminlogin",(req,res)=>{ 
    console.log(req.body)
    var name  = req.body.e1;
    var pwd = req.body.e2;
    console.log(name)
    console.log(pwd)
    a=name;
    b=pwd;
    var sql="select * from admin where admin_name ="+con.escape(name)+"and admin_password ="+con.escape(pwd)+"";
    console.log(sql)
    con.query(sql,function(err,result){
        console.log(result); 
        if (err) throw err;
        if(result.length>0)
        {
            
            res.redirect("/details");
            // res.json(result)   
        }
        else{
            res.send("invalid");
        }
        res.end();
    })
})
app.post("/delete",encoder,(req,res)=>
{
    var mail=req.body.t1;
    var sql="DELETE FROM userinfo WHERE email ="+con.escape(mail)+"";
    console.log(sql);
    con.query(sql, function (error, result) {
        if(error)
        throw error;
        console.log(result)
        res.send("sucessfully deleted");
   });
     })

app.post("/register",encoder,(req,res)=>{
    console.log("Hii")
    var apply=req.body.s10;
    var office=req.body.s1;
    var name= req.body.s2;
    var email= req.body.s3;
    var pwd=req.body.s4;
    var dob=req.body.s5;
    var phno = req.body.s6;
    var ques=req.body.s7;
    var ans=req.body.s8;
    var cap=req.body.s9;
    // var aname=req.body.a1;
    // var addr=req.body.a2;
    // var gender=req.body.a3;
    // var adob=req.body.a4;
    // var anum=req.body.a5;
    console.log("hi")
    var sql = "INSERT INTO details (p_type,p_office,name,email,password,dob,mbl_no,hint_ques,hint_ans,status) VALUES("+con.escape(apply)+","+con.escape(office)+","+con.escape(name)+","+con.escape(email)+","+con.escape(pwd)+","+con.escape(dob)+","+con.escape(phno)+","+con.escape(ques)+","+con.escape(ans)+","+con.escape(cap)+")"
    console.log("Registered Sucessfully")
    con.query(sql,function(error,result){ 
        if(error)
        throw error;
        console.log(result)
    })
    res.redirect("/welcome")
})

app.post("/welcome",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.name;
    var email = req.body.email;
    var password=req.body.pwd;
    var mbl=req.body.mbl;
    var sql = "INSERT INTO users (name,email,pwd,phno) VALUES("+con.escape(name)+","+con.escape(email)+","+con.escape(password)+","+con.escape(mbl)+")"
    console.log("Registered Sucessfully")
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect('/')
    })
    //res.redirect("/welcome")
})
app.post("/login",(req,res)=>{ 
    var mail  = req.body.t1;
    var pwd = req.body.t2;
    console.log(mail)
    console.log(pwd)
    
    var sql="select * from users where email ="+con.escape(mail)+"and pwd ="+con.escape(pwd)+"";
    console.log(sql)
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            mail1=mail;
            console.log(mail1)
            // res.redirect("/success");
            res.redirect('/disp')  
        }
        else{
            res.send("invalid");
        }
        res.end();
    })
})

app.get('/allDetails',(req,res)=>{
    var sql = "Select * from details";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            console.log("Records are displayed"); 
            res.send(result)  
       }
        else{
            res.send("cant insert due to server issue");
        }
        res.end();
    })
})


app.get('/update1/:email',(req,res)=>{
    var sql = "update details set status = 1 where email='"+req.params.email+"'";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;

        console.log("Successfully updated")
        res.redirect('/')
    })
})

app.get('/update2/:email',(req,res)=>{
    var sql = "update details set status = 2 where email='"+req.params.email+"'";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;

        console.log("Successfully updated")
        res.redirect('/')
    })
})


app.get('/update3/:email',(req,res)=>{
    var sql = "update details set status = 3 where email='"+req.params.email+"'";
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;

        console.log("Successfully updated")
        res.redirect('/')
    })
})



app.post("/search",(req,res)=>
{
    var event=req.body.t1;
    var sql="SELECT * FROM userinfo WHERE event="+con.escape(event)+"";
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
            
                console.log("1 record  inserted");   
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })
    app.get("/disp",(req,res)=>{
        var sql="select * from details";
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
                res.json(result);
                console.log("1 record  inserted");   
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })
    app.get('/display',(req,res)=>{
        var sql = "Select * from details where email='"+mail1+"'";
        console.log(mail1);
        con.query(sql,function(err,result){
            console.log(result);
            if (err) throw err;
            if(result.length>0)
            {
                console.log("Records are displayed"); 
                console.log(mail1);  
                res.json(result)
           }
            else{
                res.send("cant insert due to server issue");
            }
            res.end();
        })
    })


    // app.get('/checkstatus',(req,res)=>{
    //     var sql = "Select * from details where email='"+mail1+"'";
    //     console.log(mail1);
    //     con.query(sql,function(err,result){
    //         console.log(result);
    //         if (err) throw err;
    //         if(result.length>0)
    //         {
    //             console.log("Records are displayed"); 
    //             console.log(mail1);  
    //             res.json(result)
    //        }
    //         else{
    //             res.send("cant insert due to server issue");
    //         }
    //         res.end();
    //     })
    // })

    app.get("*",(req,res)=>{
        res.send("Not found")
    })