
let time=document.getElementById('time');
let day1=document.getElementById('day');
let darray=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
let monarray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

setInterval(()=>{
    let fdate=new Date();
    let hours=fdate.getHours();
    let minutes=fdate.getMinutes();
    let months=fdate.getMonth();
    let date=fdate.getDate();
    let day=fdate.getDay();
    let formateof12=hours>12?hours%12:hours;
    let unit
    if(hours>12){
        unit="PM"
    }else{
        unit="AM"
    }
    time.innerHTML=formateof12 + ":" + minutes + " "+unit;
    day1.innerHTML=darray[day]+","+date+" "+monarray[months]

},1000)

let getdata=async()=>{
    let location=document.getElementById('location').value;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=344739d5b2254cc37939d34178f1609d`

    let res=await fetch(url);
    let data=await res.json();
    append(data)
}
document.getElementById('search').addEventListener('click',(e)=>{
    e.preventDefault();
    getdata();
})

let append=(data)=>{
    console.log(data)
    let url=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    let container=document.getElementById('wheather-item');
    container.innerHTML=null;
 
    let name=document.createElement('h1');
    name.innerText=data.name;

    let hum=document.createElement('p');
    let img9=document.createElement('img');
    img9.src="../9.png"
    img9.setAttribute('class',"image")
    let humidity=`humidity:  ${data.main.humidity}%`;
    hum.append(img9,humidity)

    let pressure=document.createElement('p');
    pressure.setAttribute('class','pressure')
    let img3=document.createElement('img');
    img3.setAttribute('class','image')
    img3.src="../4.png"
    let pre=`pressure:  ${data.main.pressure} hpa`;
    pressure.append(img3,pre)

    let max_temp=document.createElement('p');
    max_temp.setAttribute('class','max')
    let img7=document.createElement('img');
    img7.setAttribute('class','image')
    img7.src="../7.png"
    let maxtemp="max_temp:  "+Number(data.main.temp_max-273.15+5).toFixed()+" ⁰C"
    max_temp.append(img7,maxtemp)
    
    let min_temp=document.createElement('p');
    let img6=document.createElement('img');
    img6.src="../6.png"
    img6.setAttribute('class','image')
    min_temp.setAttribute('class','min')
    let mintemp="min_temp:  "+Number(data.main.temp_min-273.15-5).toFixed()+" ⁰C"
    min_temp.append(img6,mintemp)
    
    let sunrise=document.createElement('p');
    let img1=document.createElement('img');
    img1.setAttribute('class','image')
    img1.src="../3.png";
    let date1=new Date(data.sys.sunrise*1000);
    let hours=date1.getHours();
    let minutes=date1.getMinutes();
    if(minutes<10){
        minutes="0"+minutes
    }
    let sunrisetime="  "+hours+":"+minutes+" Am";
    sunrise.append(img1,sunrisetime);
    
    let sunset=document.createElement('p');
    let img2=document.createElement('img');
    img2.setAttribute('class','image')
    img2.src="../2.png";

    let date2=new Date(data.sys.sunset*1000);
    let hours2=date2.getHours();
    let minutes2=date1.getMinutes();
    if(minutes2<10){
        minutes2="0"+minutes2;
    }
    let sunsettime="  "+hours2+":"+minutes2+" Pm";
    sunset.append(img2,sunsettime);
    
    let cloud=document.createElement('p');
    let img8=document.createElement('img');
    img8.setAttribute('class',"image")
    img8.src="../8.png"
    let cloudness="cloudiness:"+data.clouds.all+"%";
    cloud.append(img8,cloudness)
    
    let wind=document.createElement('p');
    let img4=document.createElement('img');
    img4.setAttribute('class','image')
    img4.src="../5.jpeg"
    let speed="  "+data.wind.speed +" m/s";
    wind.append(img4,speed)
    
    let visibility=document.createElement('p');
    visibility.innerText="visibile:"+Number(data.visibility/1000).toFixed()+"Km";
    
    let main=document.createElement('p');
    main.innerText=data.weather.main;

    let wicon=document.createElement('img');
    wicon.src="http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    console.log(wicon);
    
    let disc=document.createElement('p');
    disc.innerText=data.weather[0].description;
    disc.setAttribute('class','disc')
    let div1=document.createElement('div');
    div1.setAttribute('class',"item")
    div1.append(wicon,disc)
    
    document.getElementById('imperial').addEventListener('click',()=>{
        max_temp.innerText="max_temp:  "+Number((data.main.temp_max-273.15)*9/5+37).toFixed()+" ⁰F"
        min_temp.innerText="min_temp:  "+Number((data.main.temp_min-273.15)*9/5+27).toFixed()+" ⁰F"
        wind.innerHTML=null;
        speed="  "+Number(data.wind.speed*2.237) +" mph";
        wind.append(img4,speed)
    })
    document.getElementById('metric').addEventListener('click',()=>{
        max_temp.innerText="max_temp:  "+Number(data.main.temp_max-273.15+5).toFixed()+" ⁰C"
        min_temp.innerText="min_temp:  "+Number(data.main.temp_min-273.15-5).toFixed()+" ⁰C"
        wind.innerHTML=null;
        speed="  "+data.wind.speed +" m/s";
        wind.append(img4,speed)
    })
    let div=document.createElement('div')
    div.append(name,hum,pressure,min_temp,max_temp,sunrise,sunset,cloud,wind,div1,visibility)
    container.append(div)
    
    let iframe=document.getElementById('gmap_canvas');
    iframe.src=url;

    feature_forecast(data.coord.lat,data.coord.lon)

}

let getlocation=()=>{
    navigator.geolocation.getCurrentPosition(success);
    function success(pos){
        const crd = pos.coords;
        wheathermap(crd.latitude,crd.longitude)
      }
    }
    let wheathermap=async(lat,lon)=>{
        let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=344739d5b2254cc37939d34178f1609d`
        let res=await fetch(url);
        let data=await res.json();
        append(data)
    }
    // 7 days forcast api `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`

    let feature_forecast=async(lat,lon)=>{
        let url=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=344739d5b2254cc37939d34178f1609d`
        let res=await fetch(url);
        let data=await res.json();
        wheatherforcast(data.list)
    }
    let array=['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
    let wheatherforcast=async(data)=>{
        console.log(data)        
        for(let i=1;i<40;i++){

        let min_temp=document.getElementById(`min_temp${i}`)
        min_temp.innerHTML="Min_temp:"+Number(data[i].main.temp_min-288.5-5).toFixed()+"⁰C"
            
        let max_temp=document.getElementById(`max_temp${i}`)
        max_temp.innerHTML="Max_temp:"+Number(data[i].main.temp_max-288.5+5).toFixed()+"⁰C";
        let date=new Date(data[i].dt_txt);
        let day=array[date.getDay()]
        wheatherimage(data[i].weather[0].icon,day)
            i=i+8
        }
        
    }
    let i=1

    let wheatherimage=(icon,day)=>{
        let url=`http://openweathermap.org/img/wn/${icon}@2x.png`
        let img=document.getElementById('img'+i)
        let din=document.getElementById('day'+i)
        din.innerHTML=day;
        img.src=url;
        i++;

    }

