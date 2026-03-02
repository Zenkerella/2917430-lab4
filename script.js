const searcher = document.getElementById("country-input");
const button = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-message");

button.addEventListener("click", async function(){
    const countryName = searcher.value;
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
    } catch(error){
        errorMessage.value = "Something wnet wrong, did you perhaps misspell the country's name?";
    }
    
});

searcher.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        button.click();
    }
});