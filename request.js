const KEY = "cec2f9a6a04ec994c66e705b4ecdc826";
const BASE_URL= "https://api.openweathermap.org/data/2.5/"; //weather?q={city name}&appid={API key}

const requestCity = async (city) => {
    const response = await fetch (
        `${BASE_URL}weather?q=${city}&units=metric&language=es&appid=${KEY}`
    )
    const data = await response.json();
    return data;
};