const form = document.getElementById("search-form");
const cityInput = document.querySelector(".city-input");
const cardContainer = document.querySelector(".weather-info-card");
const searchMsg = document.querySelector(".search-Msg")
//
const isEmptyInput = () => {
    return cityInput.value.trim() === "";// si está vacío el input, devuelve TRUE
}
//
//
////Si no contiene la propiedad ID es válida, si no, la ciudad  existe. Esto estaría muy bien resolverlo con un try/catch en el archivo request.js. Manda TRUE si no existe
const isValidCity = (cityData)=>{
    return !cityData.id
    //otra opcion: return cityData.cod !== "200"

}
//
const getCityData = (cityData)=>{
    return {
        cityName: cityData.name, //este nombre de la propiedad ("name"), es el nombre conferido por la API al dato que solicitamos
        imageName: cityData.weather[0].icon,
        cityWeatherInfo: cityData.weather[0].description,
        cityTemp: Math.round(cityData.main.temp),
        cityST: Math.round(cityData.main.feels_like),
        cityMaxTemp: Math.round(cityData.main.temp_max),
        cityMinTemp: Math.round(cityData.main.temp_min),
        cityHumidity: cityData.main.humidity,
    }
}

const  createCityTemplate =async (cityData)=>{
    const {
        cityName,
        imageName,
        cityWeatherInfo,
        cityTemp,
        cityST,
        cityMaxTemp,
        cityMinTemp,
        cityHumidity,
    } = await getCityData(cityData); //desestructuramos
    return`
    <div class="weather-main-data"> 
                <h1>${cityName}</h1>
                <h1 class="degrees">${cityTemp}°</h1>
            </div>
            <div class="weather-img">
                <img src="./img/${imageName}.png">
            </div>
            <div class="weather-aux-data">
                <h4>Máxima: ${cityMaxTemp}°</h4>
                <h4>Mínima: ${cityMinTemp}°</h4>
                <h4>Humedad: ${cityHumidity}%</h4>
            </div>` //etcétera
}

const renderCityCard = async (cityData) =>{
    cardContainer.innerHTML = await createCityTemplate(cityData);
};
//
const changeSearchMsg = (cityData)=>
searchMsg.innerHTML = `Así está el clima en...`
//
const searchCity = async (e)=>{
    e.preventDefault(); //Al ser el evento submit, se previene el comportamiento DEFAULT del evento (e). En el caso de submit, es recargar la página, y eso no lo queremos.

    //input vacío (msj)
    if(isEmptyInput()){
        alert("¡Escribe una ciudad!")
        return//corto el flujo
    }
    //Realizo búsqueda
    const fetchedCity = await requestCity(cityInput.value);
    console.log(fetchedCity);
    

       //ciudad no existe. 
        if(isValidCity(fetchedCity)){
            alert("La ciudad ingresada no existe");
            form.reset();
            return;
        }
        //ciudad existe.Renderizar card
            renderCityCard(fetchedCity);
         //eliminar mensaje predeterminado "Ingrese ciudad"
         changeSearchMsg(fetchedCity);
         form.reset();

               
}



const init = () => {
    form.addEventListener("submit", searchCity);//el primer parámetro que recibe una fucnión en un addEventListener, es el evento en sí mismo. Por eso el "(e)"
}

init();