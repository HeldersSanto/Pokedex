const visor = document.querySelector('.main .visor');
const info = document.querySelector('.main .name-info');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
changePokemon(0);

document.querySelector('.btnsingle1').addEventListener('click', ()=>{
    var numero = getRandomInt(0, 50);
    visor.innerHTML="";
    info.innerHTML="";
    changePokemon(numero);
})
document.querySelector('.btnsingle2').addEventListener('click', ()=>{
    var numero = getRandomInt(0, 50);
    info.innerHTML="";
    visor.innerHTML="";
    changePokemon(numero);
})
document.getElementById('imgback').addEventListener('click', ()=>{
    
    const imgfrente = document.getElementById('frente');
    const imgcostas = document.getElementById('costas');
        imgfrente.classList.toggle("ocultar");
        imgcostas.classList.toggle("ocultar");
})
document.getElementById('imgfront').addEventListener('click', ()=>{
        
    const imgfrente = document.getElementById('frente');
    const imgcostas = document.getElementById('costas');
        imgfrente.classList.toggle("ocultar");
        imgcostas.classList.toggle("ocultar");
})

function changePokemon(elemento){  
    fetch(' https://pokeapi.co/api/v2/pokemon?limit=1&offset='+elemento)
    .then(Response => Response.json())
    .then(allpokemon =>{ 
        allpokemon.results.map((val)=>{
            
            var pokemons = [];            

            fetch(val.url)
            .then(Response => Response.json())
            .then(pokemonsingle => {
                pokemons.push({
                    nome:val.name,
                    imagemFrente:pokemonsingle.sprites.front_default, 
                    imagemCostas:pokemonsingle.sprites.back_default
                });
                    if(pokemons.length == 1){
                        
                        pokemons.map((val)=>{
                            visor.innerHTML+=`
                                <img src="`+val.imagemFrente+`" id="frente" class=>
                                <img src="`+val.imagemCostas+`" id="costas" class="ocultar">
                            `;
                            
                               pokemonsingle.abilities.map((el)=>{
                                        if(el.is_hidden == true){
                                            fetch(el.ability.url)
                                            .then(Response => Response.json())
                                            .then(pokemonAbilidade =>{
                                                info.innerHTML+=`
                                                <h3>`+val.nome+`</h3>
                                                <p>Ability: `+pokemonAbilidade.name+`</p>
                                                <p>`+pokemonAbilidade.effect_entries[1].short_effect+`</p>
                                                `;  
                                            })
                                        }     
                                })
                       })
                    
                    }

            })      
        })
    })

}





  
