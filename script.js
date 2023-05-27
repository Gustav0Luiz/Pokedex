const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon-img")
const form = document.querySelector(".form")
const input = document.querySelector(".input__search")
const buttonPrev = document.querySelector(".prev__btn")
const ButtonNext = document.querySelector(".next__btn")
const shinyBtn = document.querySelector(".shiny__btn")

let searchPokemon = 1

const FetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }


}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';
    const data = await FetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        let APISprites = data.id < 650 ? data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] : data['sprites']['front_default'] ;
        let shinysprite = data['sprites']['front_shiny'] ? data['sprites']['front_shiny'] : data['sprites']['front_default'];

        pokemonImage.src = shinyBtn.classList.contains("normal") ? APISprites : shinysprite;

        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }

}

function shiny() {
    shinyBtn.classList.toggle("normal")
    renderPokemon(searchPokemon)
}



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click',()=>{
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        console.log(searchPokemon)
    }   
    else {
        searchPokemon = 1010;
        renderPokemon(searchPokemon);
        console.log(searchPokemon);
    }

})
ButtonNext.addEventListener('click',()=>{
    if(searchPokemon < 1010) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
        console.log(searchPokemon)
    }   
    else {
        searchPokemon = 1;
        renderPokemon(searchPokemon);
        console.log(searchPokemon);
    }
   
})

renderPokemon(searchPokemon)