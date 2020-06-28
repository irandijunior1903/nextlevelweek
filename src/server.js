//Usando o módulo Express
const express = require("express")

//Criando o servidor
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configuração da pasta públic
server.use(express.static("public"))

//Hablilitando o uso do 'req.body' na aplicação
server.use(express.urlencoded({extended: true}))

//Utilizando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurando caminhos da aplicação
//Home
server.get("/", (req, res) =>{
    return res.render("index.html", { title: "Um titulo"}) 

})
//Cadastro de ponto de coleta
server.get("/create-point", (req, res) =>{
    //req.query: Query de Strings da url
    //console.log(req.query)
    return res.render("create-point.html")
})
server.post("/savepoint", (req, res) =>{
    //req.body: O corpo do nosso form
    //console.log(req.body)

    //Inserir dados no banco
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

    //A função só será executada quando tudo tiver pronto
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.render("not-point-created.html") // Se der BUG Acessar o create-point e o not-point-created
        }
        console.log("Cadastrado com sucesso!!!")
        console.log(this)

        return res.render("create-point.html", {saved:true})
        
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req, res) =>{

    const search = req.query.search

    
    //Pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if(err){
            return console.log(err)
        }

        const total = rows.length
        
        //Mostra a página com os dados do banco
        return res.render("search-results.html", {places: rows, total: total})
    })

    

})

//Ligando o servidor
server.listen(3000)