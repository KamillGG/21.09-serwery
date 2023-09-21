async function getData(){
    const data = await fetch('http://localhost:3000/kontynenty')
    const json = await data.json()
    console.log(json)
    for(var i=0;i<=json.length-1;i++){
        const radio = document.createElement('input')
        radio.type = "radio"
        radio.name = "radios"
        document.getElementById('radioCont').appendChild(radio)
    }
}
getData()