function fetchBreeds() {
   
    return fetch('https://api.thecatapi.com/v1/breeds')
        .then((response) => {
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
    })
    
};

function fetchCatByBreed(breedId) {
  
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => {
            
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        })  
};

export { fetchBreeds,fetchCatByBreed };