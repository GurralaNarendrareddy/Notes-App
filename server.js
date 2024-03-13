const mysql=require("mysql");
const express=require("express");
const uuid = require('uuid');
const cors=require("cors");


let app=express();
app.use(cors());
app.use(express.json());

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"notesapp"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/',(req,res)=>{
    let sql='select * from notesdata';
    con.query(sql,async (err, result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching data");
        } else {
            res.json(result); 
        }
    })
})


app.post('/addNote', (req,res)=>{
    let uniqId = uuid.v4();
    let sql = 'INSERT INTO notesdata (id, title, `desc`,date) VALUES (?, ?, ?,?)';
    console.log(req)
    con.query(sql, [uniqId, req.body.title, req.body.desc,req.body.date], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting data");
        } else {
            console.log("Inserted successfully");
            res.send("Inserted successfully");
        }
    });
})

app.delete('/deleteNote/:id',(req,res)=>{
    let sql="delete from notesdata where id=?";
    con.query(sql,[req.params.id],(err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting data");
        } else {
            console.log("deleted successfully");
            res.send("deleted successfully");
        }
    })
})

app.listen(3111);