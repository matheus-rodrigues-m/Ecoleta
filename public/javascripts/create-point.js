/*console.log() //console.log escreve / exibe algo*/

/* Criar Arrow Function:
(res) => {return res.json() }
Ou
res => res.json() 
*/

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]") //Alalisamos os select UF nesta função
    //atribuindo seu valor à variável ufSelect

    //BUSCOU OS ESTADOS
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //Promessa de buscar os dados neste link

    //TRANSFORMOU EM JSON
    .then( (res) => {return res.json() }) //Se a busca do fetch der certo, a função res retorna o valor
    //em forma de função .json

    //FUNÇÃO DE IDENTIFICAÇÃO DE CADA UMA DAS UFs
    .then( states => { //Segundo then é da transformação dos valores do link em .json 
    //Se tiver ocorrido corretamente, a variável ufSelect que é o campo "<select name = "uf">" no HTML
    //Agora terá também os valores inseridos aqui, que são os que foram obtidos na API do IBGE
        
        for (const state of states) { //Verifica cada estado entre os estados
            ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome} </option>`
        }
    })

}

populateUFs() //Chamando a função

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]") //A citySelect passa a ser o valor do
    //Seletor de cidade

    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //A variável recebe o valor de onde o evento foi executado
    //No caso o evento "change" será executado no select, e o valor é cada uma das UFs selecionadas
    //Então a cada UF selecionado, o ufValue terá seu id

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text //Transforma a url do estado
    //Ao invés do ID aparece o nome

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //BUSCOU OS ESTADOS

    citySelect.innerHTML = "<option>Selecione a Cidade</option>" //Limpa as cidades do estado selecionado antes
    citySelect.disabled = true //Desabilita as cidades novamente

    fetch(url) //Promessa de buscar os dados neste link

    //TRANSFORMOU EM JSON
    .then( (res) => { return res.json() }) //Se a busca do fetch der certo, a função res retorna o valor
    //em forma de função .json

    //FUNÇÃO DE IDENTIFICAÇÃO DE CADA UMA DAS UFs
    .then( cities => { //Segundo then é da transformação dos valores do link em .json 
    //Se tiver ocorrido corretamente, a variável ufSelect que é o campo "<select name = "uf">" no HTML
    //Agora terá também os valores inseridos aqui, que são os que foram obtidos na API do IBGE
        
        for (const city of cities) { //Verifica cada cidade entre as cidades
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome} </option>`
            //Preenche o html pra cada cidade dessa forma
        }

        citySelect.disabled = false //Como citySelect é o seletor de cidades, que está desabilitado
        //Vamos até a propriedade de desabilitação da mesma e colocamos como false, assim habilitando-a
    })
}


document
    .querySelector("select[name=uf]") //Seleciona o seletor uf ára trabalharmos com ele
    .addEventListener("change", getCities)




//ITENS DE COLETA

//Pegar todos os li's numa variável
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) //Para cada item de .items-grid li (valor do itemsToCollect)
{
    item.addEventListener("click", handleSelectedItem) //Adicionar evento click
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

//event.target vai dar o id de cada item selecionado no click no for anterior que chama a função
function handleSelectedItem(event) {

    const itemLi = event.target

    //ADICIONAR OU REMOVER UMA CLASSE COM JAVASCRIPT
    itemLi.classList.toggle("selected") //add, remove ou toggle (switch de add e remove)
    //Se tem classe "selected" ele remove, e se não tiver, ele adiciona

    const itemId = itemLi.dataset.id


    //Verificar se existem itens selecionados, se sim...
    //Pegar os itens selecionados "selectedItems"

    const alreadySelected = selectedItems.findIndex(function(item){ //Verifica de item a item selecionado
        const itemFound = item == itemId //Retorna o item encontrado, se este for igual ao itemId
        return itemFound //True ou False
    })


    //Se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0)
    {
        //Tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }

    //Se não estiver selecinado, adicionar à seleção
    else
    {
        selectedItems.push(itemId)
    }

    //Atualizar a tag de input hidden com os itens selecionados
    collectedItems.value = selectedItems
    


}