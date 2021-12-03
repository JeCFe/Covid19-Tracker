const lupdateCountry = document.querySelector('.Country');
const iconImg = document.getElementById('country-icon')
const lupdateCountryCases = document.querySelector('.TotalCovid');
const lupdateCountryDeaths = document.querySelector('.TotalDeaths');
const lupdateCountryCasesM = document.querySelector('.CasesPerMillion');
const lupdateCountryDeathsM = document.querySelector('.DeathsPerMillion');
const lupdateCountryCasePercentage = document.querySelector('.CasesPercentage');
const lupdateCountryDeathPerecentage = document.querySelector('.DeathsPercentage');
const lupdateNewCovid = document.querySelector('.NewCases');
const lupdateNewDeaths = document.querySelector('.NewDeaths');
const lupdateDateOfResults = document.querySelector('.DateOfResults');
const lupdateCountryPopulation = document.querySelector('.TotalPopulation');

const lupdateGVCCases = document.querySelector('.GVCTotal');
const lupdateGVCDeaths = document.querySelector('.GVCTotalDeaths');
const lupdateGVCNewCases = document.querySelector('.GVCCases');
const lupdateGVCNewDeaths = document.querySelector('.GVCDeaths');



const GlobalName = document.querySelector('.Global');
const GiconImg = document.getElementById('globalIcon')
const GupdateCountryCases = document.querySelector('.GTotalCovid');
const GupdateCountryDeaths = document.querySelector('.GTotalDeaths');
const GupdateNewCovid = document.querySelector('.GNewCases');
const GupdateNewDeaths = document.querySelector('.GNewDeaths');
const GupdateDateOfResults = document.querySelector('.GDateOfResults');

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");

function Toggle(){
    let g = document.getElementById('globalCon');
    let r = document.getElementById('rightCon');
    if (g.style.visibility === 'visible')
    {
        g.style.visibility = 'hidden';
        g.style.display = 'none';
        r.style.visibility = 'visible';
        r.style.display = 'block';
    }
    else{
        g.style.visibility = 'visible';
        g.style.display = 'block';
        r.style.visibility = 'hidden';
        r.style.display = 'none';
    }
}

window.addEventListener("submit", e => {
    e.preventDefault();
    let inputval = input.value;
    console.log(inputval);
    const lowerprov = inputval.toLowerCase();

    const iconUrl = `https://flagcdn.com/h80/${lowerprov}.jpg`;
    iconImg.src = iconUrl;
    UpdateLeftCovidCases(inputval);
})

window.addEventListener('load', () => {
        let lat;
        let lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
                const base = `https://open.mapquestapi.com/geocoding/v1/reverse?key=fBzHLAgMFGwK2OQTk9DKi6EQTFjpVlZH&location=${lat},${lon}&outFormat=json`
                fetch(base)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {

                        const prov = data.results[0].locations[0].adminArea1;
                        console.log(prov);
                        const lowerprov = prov.toLowerCase();

                        const iconUrl = `https://flagcdn.com/h80/${lowerprov}.jpg`;
                        iconImg.src = iconUrl;
                        UpdateLeftCovidCases(prov);
                        UpdateGlobalValues();

                    });
            });
        }
    })



function UpdateGlobalValues(){
    const base = `https://api.covid19api.com/summary`;
    fetch(base)
        .then ((response)=>{
            return response.json();
        })
        .then((data)=>{

            const NCases = data.Global.NewConfirmed;
            const NDeaths = data.Global.NewDeaths;
            const TConfirmed = data.Global.TotalConfirmed;
            const TDeaths = data.Global.TotalDeaths;
            const GUpdate = data.Global.Date;
            const GDate = new Date(GUpdate);
            const IconURL = `https://flagcdn.com/h120/un.jpg`;
            GiconImg.src = IconURL;
            GlobalName.textContent = `World Wide`;
            GupdateCountryCases.textContent = `Total Cases: ${TConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            GupdateCountryDeaths.textContent = `Total Deaths: ${TDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            GupdateNewCovid.textContent = `New Cases: ${NCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            GupdateNewDeaths.textContent = `New Deaths: ${NDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            GupdateDateOfResults.textContent = `Last Updated: ${GDate.toLocaleDateString('en-UK')}, ${GDate.toLocaleTimeString('en-UK')}`;
        })
}






function UpdateLeftCovidCases(prov){
    let CountryPop;
    const base = `https://api.covid19api.com/total/country/${prov}`
    fetch(base)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            const base = `https://restcountries.com/v2/alpha/${prov}` ;
            fetch(base)
                .then((response) =>{
                    return response.json();
                })
                .then ((data)=>{
                    CountryPop = data.population;
                    return CountryPop;
                })
                .then((pop)=>{
                    let index = data.length-1;
                    const ResultsDate = data[index].Date;
                    const CountryName = data[index].Country;
                    const confirmedCases = data[index].Confirmed;
                    const confirmedDeaths = data[index].Deaths;
                    const newDeaths = data[index].Deaths - data[index - 1].Deaths;
                    const newCases = data[index].Confirmed - data[index - 1].Confirmed;
                    const dateUpdate = new Date(ResultsDate);
                    const casesMillion =   Math.floor((confirmedCases / pop)*1000000);
                    const deathsMillion = Math.floor((confirmedDeaths / pop)*1000000);
                    const casesPercentage = (confirmedCases / pop)*100;
                    const deathsPercentage = (confirmedDeaths / pop) * 100;
                    lupdateCountryPopulation.textContent = `Population: ${pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                    lupdateCountryCasesM.textContent = `Cases: ${casesMillion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                    lupdateCountryDeathPerecentage.textContent = `${deathsPercentage.toFixed(2)}%`;
                    lupdateCountryDeathsM.textContent = `Deaths: ${deathsMillion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                    lupdateCountryCasePercentage.textContent = `${casesPercentage.toFixed(2)}%`;
                    lupdateCountry.textContent = CountryName;
                    lupdateCountryCases.textContent = `Total Cases: ${confirmedCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                    lupdateCountryDeaths.textContent = `Total Deaths: ${confirmedDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    lupdateNewCovid.textContent  = `New Cases: ${newCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    lupdateNewDeaths.textContent = `New Deaths: ${newDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    lupdateDateOfResults.textContent = `Last Updated: ${dateUpdate.toLocaleDateString('en-UK')}, ${dateUpdate.toLocaleTimeString('en-UK')}`;
                    fetch(`https://api.covid19api.com/summary`)
                        .then(response=>{
                            return response.json();
                        })
                        .then(globalData =>{

                            const NCases = globalData.Global.NewConfirmed;
                            const NDeaths = globalData.Global.NewDeaths;
                            const TConfirmed = globalData.Global.TotalConfirmed;
                            const TDeaths = globalData.Global.TotalDeaths;

                            const PercentageNewCases = (newCases / NCases) * 100;
                            const PercentageNewDeaths = (newDeaths / NDeaths) *100;
                            const PercentageTotalDeaths = (confirmedDeaths / TDeaths)*100;
                            const PercentageTotalCases = (confirmedCases/TConfirmed)*100;
                            lupdateGVCNewCases.textContent = `${PercentageNewCases.toFixed(2)}%`;
                            lupdateGVCNewDeaths.textContent = `${PercentageNewDeaths.toFixed(2)}%`;
                            lupdateGVCCases.textContent = `Cases: ${PercentageTotalCases.toFixed(2)}%`;
                            lupdateGVCDeaths.textContent = `Deaths: ${PercentageTotalDeaths.toFixed(2)}%`;

                    })
                })
        })
}

const event = new CustomEvent('load', {});
