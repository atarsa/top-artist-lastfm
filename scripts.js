const APIKey = 'ebc06b0ac7f205e608e65d074aad9ba5';
const sharedSecret = 'c0a0f25cc8924e620c15a5f7a6ea1ae0';

// define UI vars
const topArtistsList = document.getElementById('top-artists-list');

fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=united+kingdom&limit=10&api_key='+ APIKey +'&format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    // work with json data here
    let index = 1;
    myJson['topartists']['artist'].forEach(artist => {
      // console.log(`Artist: ${artist['name']}`);
      // console.log(`url: ${artist['url']}`);
      // // get medium size photo
      console.log(`img: ${artist['image'][1]['#text']}`);
    
      // create card element for each artist with photo and url
      const artistCard = document.createElement('div');
      artistCard.setAttribute("class", "artist-card");
      
      const img = document.createElement('img');
      // small img
      if (window.matchMedia("(max-width:649px)").matches){
        img.setAttribute('src', artist['image'][1]['#text']);
      } else {
        img.setAttribute('src', artist['image'][2]['#text']);
      }
      
      
      
      artistCard.appendChild(img);

      // const div = document.createElement('div');
      // div.setAttribute("class", "artist-info");

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
      artistName.setAttribute('href', "artist['url']");
      artistNameDiv.appendChild(artistName);
      

      artistCard.appendChild(artistPosition);
      artistCard.appendChild(artistNameDiv);
     

      
      // artistCard.appendChild(div);
      topArtistsList.appendChild(artistCard);

            
    })

    
    
  });