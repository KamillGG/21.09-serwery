const express= require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const mysql = require('mysql')
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"21.09"
})
con.connect((err)=>{
    if(err) console.log(err)
    else console.log('polaczono')
})
app.use(cors())
axios.get('https://restcountries.com/v3.1/all').then((response)=>{
    const resp = response.data
    con.query(`SELECT * FROM kraje`,(err,result,fields)=>{
        if(err) console.log(err)
        else currentTable = result
    })
    for(var i=0;i<=resp.length-1;i++){
            const sql = `INSERT INTO kraje(name, capital, population) VALUES ("${resp[i].name.common}","${resp[i].capital}",${resp[i].population})`
            con.query(sql, (err,result,fields)=>{
            })
            const sql2 = `UPDATE kraje SET area='${resp[i].area}', continent='${resp[i].region}' WHERE name = "${resp[i].name.common}"`
            con.query(sql2,(err,result,fields)=>{
                if(err) console.log(err)
            })
        
        
        
        
        
    }
    
})


app.get('/add/:kontynent',(req,res)=>{
    const kontynent = req.params.kontynent
    const sql = `SELECT * FROM kraje WHERE continent='${kontynent}'`
    con.query(sql,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.get('/populacja/:pop',(req,res)=>{
    const pop = parseInt(req.params.pop)
    console.log(pop)
    const sql = `SELECT * FROM kraje WHERE population>${pop}`
    con.query(sql,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.get('/kontynenty',(req,res)=>{
    console.log('wykonano')
    const sql = `SELECT DISTINCT continent FROM kraje`
    con.query(sql,(err,result,fields)=>{
        console.log('response')
        if(err) console.log(err)
        res.send(result)
    })
})
app.get('/panstwa/:continent',(req,res)=>{
    const continent =req.params.continent
    const sql = `SELECT * FROM kraje WHERE continent='${continent}'`
    con.query(sql,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.get('/getPop',(req,res)=>{
    const sql = `SELECT MAX(population) AS population FROM kraje;`
    con.query(sql,(err,result,fields)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})
app.listen(3000)