const searcher = document.getElementById("country-input");
const button = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-message");
const spinner = document.getElementById("loading-spinner");
const info = document.getElementById("country-info");
const borders = document.getElementById("bordering-countries")

async function searchCountry(countryName) {
    if(!countryName) return;
        spinner.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        info.classList.add("hidden");
        borders.classList.add("hidden");
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if(!response.ok) throw new Error("Error");
        const data = await response.json();
        const country = data[0];
        info.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        
        if(country.borders && country.borders.length > 0){
            borders.innerHTML = `<h2>Bordering Countries</h2>
            `;
            for(var i = 0; i < country.borders.length; i++){
            const border = await fetch(`https://restcountries.com/v3.1/alpha/${country.borders[i]}`);
            const borderData = await border.json();
            const borderCountry = borderData[0];
            borders.innerHTML += `<div>
            <h3>${borderCountry.name.common}<h3>
            <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag">
            <div>
            `;
            }
            
        }
        info.classList.remove("hidden");
        borders.classList.remove("hidden");
    } catch(error){
        errorMessage.textContent = "Country not found, did you perhaps misspell the country's name?";
        errorMessage.classList.remove("hidden");
    } finally {
        spinner.classList.add("hidden")
    }
}

button.addEventListener("click", () => {
    const countryName = searcher.value;
    searchCountry(countryName);
});

searcher.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        button.click();
    }
});

window.onload = function() {
    errorMessage.classList.add("hidden");
    info.classList.add("hidden");
    borders.classList.add("hidden");
    spinner.classList.add("hidden")
};