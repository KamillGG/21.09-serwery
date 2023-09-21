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
    else{
        console.log('polaczono')
    }
})
app.use(cors())
axios.get('https://restcountries.com/v3.1/all').then((response)=>{
    const resp = response.data
    var currentTable =[]
    con.query(`SELECT * FROM kraje`,(err,result,fields)=>{
        if(err) console.log(err)
        else currentTable = result
        console.log(currentTable)
    })
    for(var i=0;i<=resp.length-1;i++){
        console.log(resp[i].name.common)
        console.log(currentTable[i])
            const sql = `INSERT INTO kraje(name, capital, population) VALUES ("${resp[i].name.common}","${resp[i].capital}",${resp[i].population})`
            con.query(sql, (err,result,fields)=>{
            })
            const sql2 = `UPDATE kraje SET area='${resp[i].area}' WHERE name = "${resp[i].name.common}"`
            con.query(sql2,(err,result,fields)=>{
                if(err) console.log(err)
            })
        
        
        
        
        
    }
    
})
app.listen(3000)