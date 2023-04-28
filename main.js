function onResponce(response){
	console.log('Json ricevuto correttamente');
	return response.json();
}

function onJson(json){
	console.log('ALL GOOD');
	const libreria = document.querySelector('#album-view');
	libreria.innerHTML = '';
	const risultato = json.data;
	console.log(json);
	let conta = 0;

	for(result of risultato){
		if(conta <= 11){
			const img = result.images.large;
			const price = result.cardmarket.prices.averageSellPrice;
			const sets = result.set.name;
			if(img === null)
				break;
			const album = document.createElement('div');
			album.classList.add('album');
			const images = document.createElement('img');
			const prezzo = document.createElement('text');
			const set = document.createElement('text');
			set.textContent = 'Set : '+ sets;
			prezzo.textContent = 'Average price : ' + price +'$';
			images.src = img;

			album.appendChild(set);
			album.appendChild(images); 
			libreria.appendChild(album);
			album.appendChild(prezzo);
			conta = conta + 1;
		}
		else break;
	}
}

function searchPkmn(event){
	event.preventDefault();

	const pkmn = document.querySelector('#search').value;
	const elemento = encodeURIComponent(pkmn);

	const url = `https://api.pokemontcg.io/v2/cards?q=name:` + elemento;

	fetch(url).then(onResponce).then(onJson);
}
const form = document.querySelector('form');
form.addEventListener('submit', searchPkmn);

////////////////////////////////////////////////////////////////

//Twitch API
function onJson_ricerca(json){
	console.log('Stampo la ricerca: '+token);
	console.log(json);
	libreria = document.querySelector('#album-view_tw');
	libreria.innerHTML = '';
	const results = json.data;

	let conta = 0;
	for(result of results){
	  	if (conta <= 11){
			const game_name = result.game_name;
			const url_stream = result.thumbnail_url;
			const titolo = result.title;
			const spect = result.viewer_count;
			const album_tw = document.createElement('div');
			album_tw.classList.add('album_tw');
			const slot1 = document.createElement('text');
			const slot2 = document.createElement('text');
			const slot3 = document.createElement('text');
			const slot4 = document.createElement('text');
			slot1.textContent = 'GAME_NAME: '+ game_name;
			slot2.textContent = 'URL_STREAM: '+ url_stream;
			slot3.textContent = 'TITLE: '+ titolo;
			slot4.textContent = 'VIEWER: '+ spect;
			album_tw.appendChild(slot1);
			album_tw.appendChild(slot2);
			album_tw.appendChild(slot3);
			album_tw.appendChild(slot4);
			libreria.appendChild(album_tw);
			conta = conta +1;
		}else break;
	}
}
  
function getToken(json){
	token = json.access_token;
	console.log(json);
	console.log('token: '+token);
}
  
function onTokenResponse(response){
	return response.json();
}

  let token;
  fetch('https://id.twitch.tv/oauth2/token',{
	  method: 'POST',
	  body: 'client_id=kgfs4uz31eze9dpzsyxcuoyc0a5sxy&client_secret=l8e1a9j25dvtu86xnxvd08mfq5h217&grant_type=client_credentials',
	  headers:
	  {
		  'Content-Type': 'application/x-www-form-urlencoded'
	  }
	}).then(onTokenResponse).then(getToken);
  
function search(event){
  
	event.preventDefault();

	const ricerca = document.querySelector('#tipo').value;

	if(ricerca === 'Ricerca'){
		fetch('https://api.twitch.tv/helix/streams',{
			headers: {
				'Authorization': 'Bearer ' + token,
				'Client-Id' : 'kgfs4uz31eze9dpzsyxcuoyc0a5sxy' 
			}
		}).then(onResponce).then(onJson_ricerca);
		console.log('il token dentro la search è: '+token);
	}
}
const form_tw = document.querySelector('form');
form.addEventListener('submit',search);