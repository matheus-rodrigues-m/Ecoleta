const buttonSearch = document.querySelector("#page-home main a") 
/* buttonSearch = Botão de pesquisar pontos de coleta */

const modal = document.querySelector("#modal") /* Recebe a div #modal */

const close = document.querySelector("#modal .header a") /* Recebe o X de fechar o modal */

buttonSearch.addEventListener("click", () => { /* Quando ele ouvir o evento click no"buttonSearch"*/
    modal.classList.remove("hide") /* Remove a classe hide */
}) 

close.addEventListener("click", () => { /* Quando clicar no "a" de fechar o modal */
    modal.classList.add("hide") /* Adiciona a classe hide */
})