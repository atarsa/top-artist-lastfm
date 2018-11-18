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
    myJson['topartists']['artist'].forEach(artist => {
      console.log(`Artist: ${artist['name']}`);
      console.log(`url: ${artist['url']}`);
      // get medium size photo
      console.log(`img: ${artist['image'][1]['#text']}`);
    
      // create list element for each artist with photo and url
      const li = document.createElement('li');
      const div = document.createElement('div');

      const img = document.createElement('img');
      img.setAttribute('src', artist['image'][1]['#text']);

      const a = document.createElement('a');
      a.innerText = artist['name'];
      a.setAttribute('href', "artist['url']");
      
      div.appendChild(img);
      div.appendChild(a);

      li.appendChild(div);
      topArtistsList.appendChild(li);

            
    })

    
    
  });