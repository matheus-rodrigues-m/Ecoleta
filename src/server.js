const express = require("express")
const server = express()

//Pegar o banco de Dados
const db = require("./database/db")


//Configurar pasta Public para usar os Styles de lá
server.use(express.static("public"))


//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


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
    return res.render("index.html")
})



server.get("/create-point", (req, res) => {
    
    //req.query: Query strings da url
    //console.log(req.query)



    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //req.body: corpo do formulário
    //console.log(req.body)


    //Inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
    
        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)
})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    //Pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }


        const total = rows.length

        /* Mostrar a pág HTML com os dados do Banco de Dados */
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//Ligar o Servidor
server.listen(3000)