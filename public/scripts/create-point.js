function populateUfs(){
    const stateSelect =  document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json()) //transformação dos objetos em .json
    .then(states => {

        for (const state of states){ // Acrescenta as UF's no Array passando como valor o nome delas
            stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } 
    })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json()) //transformação dos objetos em .json
    .then(cities => {


        for (const city of cities){ // Acrescenta as Cidades no Array passando como valor o nome delas
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
        
    })
}


document
   .querySelector("select[name=uf]")
   .addEventListener("change", getCities) // passando por referência (Sem execução aqui)

//Itens de coleta
//Pegando todos os li's
const itemsCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener("click", handleSelectedItem)

}

 //Atualização do campo escondido (hidden) com os itens selecionados
const colletedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){/*Pega os números do id*/
    const itemLi = event.target

    //Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id




    //Verificar a existência de itens selecionados
    //Se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item =>{
        const itemFound = item == itemId //True or False
        return itemFound
    })

    //Se já for selecionado, tirar do array
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDiferent = item != itemId //False
            return itemIsDiferent
        })

        selectedItems = filteredItems

    //Se não tiver selecionado, adiconar no array
    } else {
        selectedItems.push(itemId)
    }
    colletedItems.value = selectedItems
}