const charactersEl = document.getElementById('characters');
const namefilterEl = document.getElementById('name-filter');
const  statusfilterEl = document.getElementById('status-filter');

async function getCharacters (name, status){

    try{
        let url = 'https://rickandmortyapi.com/api/character/';

        if(name || status){

            url+= '?';
            if(name){
                url += `name=${name}&`;
            }
    
            if(status){
                url += `status=${status}`;
            }
        }
        
        const response = await fetch(url);
        
        if(!response.ok){
            throw new error(`error fetching data: ${response.statusText}`);
        }
        
        const data = await response.json();

        console.log(data)
    
        return data.results;
    

    } catch(error){
        console.error('no se encontro personaje:', error);
        charactersEl.innerHTML = '<p>Error. No existe personaje. Vuelva a intentarlo</p>';
        return[];
    }
}

async function displayCharacters(name, status){

    try{
        const characters = await getCharacters(name, status);
        
        charactersEl.innerHTML = '';

        if(characters.lenght === 0){
            charactersEl.innerHTML = '<p>no se encontro personaje</p>'
            return;
        }
        for( let character of characters ){
            const card = document.createElement('div');
            card.classList.add('character-card');
    
            card.innerHTML = `
            <img src="${character.image}" />
            <h2> ${character.name} </h2>
            <p> status: ${character.status} </p>
            <p> especie: ${character.species} </p>
            `;
    
            charactersEl.appendChild(card);
        }
    } catch(error){
        console.error('error al intentar enseñar personaje', error);
        charactersEl.innerHTML = '<p>error al intentar enseñar personaje. Vuelva a intentarlo</p>'
    }
}

displayCharacters();

namefilterEl.addEventListener('input', () => {
    displayCharacters(namefilterEl.value, statusfilterEl.value);
});

statusfilterEl.addEventListener('change', () => {
    displayCharacters(namefilterEl.value, statusfilterEl.value);
});