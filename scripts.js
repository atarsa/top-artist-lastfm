//const APIKey = 'ebc06b0ac7f205e608e65d074aad9ba5';
//const sharedSecret = 'c0a0f25cc8924e620c15a5f7a6ea1ae0';

// define UI vars
const topArtistsList = document.getElementById('top-artists-list');
const inputCountryList = document.getElementById('country-input');
const countriesList = document.getElementById('country-list');

const showCountries = document.createElement('ul');
showCountries.setAttribute("class", "show-countries-list");
countriesList.appendChild(showCountries);

// get countries list
const countriesNames = []
fetch("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json", {cache: "force-cache"})
  .then(function(response){
    return response.json()
  })
  .then(function(myJSON){
    
    for (let country of myJSON){
      let countryName = country.Name;
      countriesNames.push(countryName);
    };

    showCountriesList(countriesNames);
        
    });
    
const showCountriesList = function(countriesNames){
    // show list of countries names
    inputCountryList.addEventListener('keyup', function(){
      // start a new list every time
      showCountries.innerHTML = "";
      for (let country of countriesNames){
        
        if (country.toLowerCase().indexOf(this.value) != -1){
                   
          let listElement = document.createElement('li');
          listElement.setAttribute("class", "country-li");
          listElement.innerText = country;
          showCountries.appendChild(listElement);
        };  
                  
      }
      
    });
  }

// set text input value to clicked country    
showCountries.addEventListener('click', function(e){
  console.log(e.target);
  inputCountryList.value = e.target.innerText;
  showCountries.innerHTML = "";            
  let queryUrl = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${inputCountryList.value}&limit=10&api_key=${config.APIKey}&format=json`;

  show_top_artists(queryUrl);
});
 
const show_top_artists = function(queryUrl){
  
  // create new list of artists
  topArtistsList.innerHTML = "";
  fetch(queryUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    // work with json data here
    // if artist data available
    if(myJson['topartists']['artist'].length != 0){

      let index = 1;
    myJson['topartists']['artist'].forEach(artist => {
            
      // create card element for each artist with photo, position and name
      const artistCard = document.createElement('div');
      artistCard.setAttribute("class", "artist-card");
      
      const img = document.createElement('img');
      // if small display select small image otherwise a bigger one
      if (window.matchMedia("(max-width:649px)").matches){
        img.setAttribute('src', artist['image'][1]['#text']);
      } else {
        img.setAttribute('src', artist['image'][2]['#text']);
      }
           
      
      artistCard.appendChild(img);

      const artistPosition = document.createElement('div');
      artistPosition.setAttribute("class", "artist-position")
      const h3 = document.createElement('h3');
      h3.innerHTML = `${index}.`;
      index++;
      artistPosition.appendChild(h3);

      const artistNameDiv = document.createElement('div');
      artistNameDiv.setAttribute('class', "artist-name");
      const artistName = document.createElement('a');
      artistName.innerText = artist['name'];
      artistName.setAttribute('href', artist['url']);
      artistNameDiv.appendChild(artistName);
      

      artistCard.appendChild(artistPosition);
      artistCard.appendChild(artistNameDiv);
     
      topArtistsList.appendChild(artistCard);
    
     });

    } else {
      // if data for country not available
      const errMessage = document.createElement('h4');
      errMessage.innerText = "There is no data available for this country, sorry!";

      topArtistsList.appendChild(errMessage);
      console.log("nada :<")
    }
  })
  .catch(function(err){
    const errMessage = document.createElement('h4');
      errMessage.innerText = "Oops, something went wrong!";

      topArtistsList.appendChild(errMessage);
      console.log(err)
  })
} 

