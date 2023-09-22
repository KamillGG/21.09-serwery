async function getData(){
    const data = await fetch('http://localhost:3000/kontynenty')
    const json = await data.json()
    console.log(json)
    for(var i=0;i<=json.length-1;i++){
        const radio = document.createElement('input')
        radio.type = "checkbox"
        radio.name = "radios"
        radio.classList.add('something')
        radio.id = json[i].continent

        const label = document.createElement('label')
        document.getElementById('radioCont').appendChild(radio)
        document.getElementById('radioCont').appendChild(label)
        if(radio.id!="WhatIsLove"){
            radio.addEventListener('click',()=>{
                console.log(radio.id)
                sorting()
            })
        }
        else{
            document.getElementById('WhatIsLove').addEventListener('click',()=>{
                location.href = 'https://www.youtube.com/watch?v=HEXWRTEbj1I';
            })
        }
        
        label.innerHTML = json[i].continent
        
    }
}
getData()
async function sorting(){
    var strings = ''
    for(var i=0;i<=document.getElementsByClassName('something').length-1;i++){
        if(document.getElementsByClassName('something')[i].checked==true){
            strings += `'${document.getElementsByClassName('something')[i].id}'.`
        }
    }
    const data = await fetch(`http://localhost:3000/panstwa/${strings}`)
    console.log(strings)
}
async function rangeInp(){
    const data = await fetch(`http://localhost:3000/getPop`)
    const json = await data.json()
    document.getElementById('range').setAttribute('max',json[0].population)
    document.getElementById('range').setAttribute('step',parseInt(json[0].population)/10)
    console.log(json)
    for(var i=0;i<=10;i++){
        const option = document.createElement('option')
        option.value = parseInt(parseInt(json[0].population)/10 *i).toLocaleString('en-US')
        option.label = `${parseInt(parseInt(json[0].population)/10 *i).toLocaleString('en-US')}`
        document.getElementById('values').appendChild(option)
        
        
    }
    document.getElementById('range').addEventListener("input", (event) => {
        var newString = ''
        var oldString = event.target.value
        console.log(parseInt(oldString).toLocaleString())
         document.getElementById('value').innerHTML = parseInt(oldString).toLocaleString('en-US');
    });
}
async function sendForm(){
    
    var name = document.getElementById('name').value
    var capital = document.getElementById('capital').value
    var continent = document.getElementById('continent').value
    var population = document.getElementById('population').value
    var area = document.getElementById('area').value
    if(name=='' || capital=="" || continent=="" || population=='' || area==''){
        window.alert('Wypelnij wszystkie pola!')
    }
    else{
        const data = await fetch(`http://localhost:3000/addRecord/${name}/${capital}/${continent}/${population}/${area}`)
        name=''
        capital=''
        continent=''
        population=''
        area=''
    }
}
rangeInp()