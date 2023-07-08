import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common["x-api-key"] = "live_BcFev3uMGlTeK3UdA5VxewzRBce5gp0DbjI5CxRX3bVdeKB9cTkm02euDMsfSvwZ";

const refs = {
    selectorEl: document.querySelector('.breed-select'),
    catInfoEl: document.querySelector('.cat-info'),
    loaderEl: document.querySelector('.loader'),
    errorEl: document.querySelector('.error'),
};

document.body.style.backgroundColor = 'rgb(40, 161, 205)';
refs.catInfoEl.style.maxWidth = '50%';
refs.catInfoEl.style.margin = '15px';


refs.selectorEl.style.display = 'none';
refs.errorEl.style.display = 'none';

fetchBreeds()
    .then(createOptionEl)
    .catch(error => {
        onError();
    });

function createOptionEl(data) {
 refs.selectorEl.style.display = 'block';
        refs.loaderEl.style.display = 'none';

        data.map(item => {
            
            const opt = document.createElement("option");
            opt.setAttribute("value", `${item.id}`);
            opt.textContent = item.name;
            
            return refs.selectorEl.appendChild(opt);
        })
}

refs.selectorEl.addEventListener('change', onSelect);

function onSelect(evt) {
    
    const catId = evt.currentTarget.value;

    refs.loaderEl.style.display = 'block';
    refs.catInfoEl.style.display = "none"
    
    fetchCatByBreed(catId)
    .then(addCatInfo)
    .catch(error => {  
        onError();
    })
}

function addCatInfo(data) {
    fetch(`https://api.thecatapi.com/v1/images/${data[0].id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(createCatInfoCard)
        .catch(error => {
            onError();
                
        });
}


function createCatInfoCard(data) {
refs.loaderEl.style.display = 'none';
                refs.catInfoEl.style.display = "block"
                
                const catInfo = data.breeds[0];
                              
                const info = `
                <img src="${data.url}" alt="${catInfo.name}" width ="480"/>
                <h2>${catInfo.name}</h2>
                <p>${catInfo.description}</p>
                <p>${catInfo.temperament}</p>
                `
                refs.catInfoEl.innerHTML = info;
}

function onError() {
     Notify.failure('Oops! Something went wrong! Try reloading the page!');
        refs.loaderEl.style.display = 'none';
        refs.catInfoEl.style.display = 'none';
}