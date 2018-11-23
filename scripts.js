const APIKey = 'ebc06b0ac7f205e608e65d074aad9ba5';
const sharedSecret = 'c0a0f25cc8924e620c15a5f7a6ea1ae0';

const countriesNames = []
fetch("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json", {cache: "force-cache"})
  .then(function(response){
    return response.json()
  })
  .then(function(myJSON){
    
    for (let country of myJSON){
      let countryName = country.Name;
      countryName = countryName.toLowerCase()
      countriesNames.push(countryName);
    };

    console.log(countriesNames.length)
    
    inputCountryList.addEventListener('keyup', function(){
      
      for (let country of countriesNames){
        if (country.includes(this.value)){
          console.log(country);
        }
        
      }
      
    }, true);
    
  })



// define UI vars
const topArtistsList = document.getElementById('top-artists-list');

const inputCountryList = document.getElementById('country-input');


inputCountryList.addEventListener('keyup', function(){
  console.log(`Whole list of countries: ${countriesNames}`);
  for (let country in countriesNames){
    // if (country.includes(this.value)){
    //   console.log(country);
    // }
    console.log(country)
  }
  
}, true);
  


// fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=united+kingdom&limit=10&api_key='+ APIKey +'&format=json')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     // work with json data here
//     let index = 1;
//     myJson['topartists']['artist'].forEach(artist => {
            
//       // create card element for each artist with photo, position and name
//       const artistCard = document.createElement('div');
//       artistCard.setAttribute("class", "artist-card");
      
//       const img = document.createElement('img');
//       // if small display select small image otherwise a bigger one
//       if (window.matchMedia("(max-width:649px)").matches){
//         img.setAttribute('src', artist['image'][1]['#text']);
//       } else {
//         img.setAttribute('src', artist['image'][2]['#text']);
//       }
           
      
//       artistCard.appendChild(img);

//       const artistPosition = document.createElement('div');
//       artistPosition.setAttribute("class", "artist-position")
//       const h3 = document.createElement('h3');
//       h3.innerHTML = `${index}.`;
//       index++;
//       artistPosition.appendChild(h3);

//       const artistNameDiv = document.createElement('div');
//       artistNameDiv.setAttribute('class', "artist-name");
//       const artistName = document.createElement('a');
//       artistName.innerText = artist['name'];
//       artistName.setAttribute('href', "artist['url']");
//       artistNameDiv.appendChild(artistName);
      

//       artistCard.appendChild(artistPosition);
//       artistCard.appendChild(artistNameDiv);
     
//       topArtistsList.appendChild(artistCard);
    
//     })
//     .catch(err => {
//       const errMessage = document.createElement('h4');
//       h4.innerText = "Oops, something is not working!";

//       topArtistsList.appendChild(h4);
//       console.log(err);
//     })
//   });

