const express = require("express")
const server = express()

//Configurar pasta Public para usar os Styles de lá
server.use(express.static("public"))


//Utilizando a template engine Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar Caminhos da Aplicação
//Página Inicial:
//req - requisição
//res - resposta
server.get("/", (req, res ) => {
    return res.render(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    return res.render(__dirname + "/views/create-point.html")
})

server.get("/search", (req, res) => {
    return res.render(__dirname + "/views/search-results.html")
})

//Ligar o Servidor
server.listen(3000)