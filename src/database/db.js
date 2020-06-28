//Importação da dependência do SQLite3
const sqlite = require("sqlite3").verbose()

//Iniciando o banco de dados
const db = new sqlite.Database("./src/database/database.db")

module.exports = db

//Utilizando o banco
db.serialize( () =>{

    //Criar tabela
    //db.run(`
    //    CREATE TABLE IF NOT EXISTS places (
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        image TEXT,
    //        name TEXT,
    //        address TEXT,
    //        address2 TEXT,
    //        state TEXT,
    //        city TEXT,
    //        items TEXT
    //    );
    //`)

    //Inserir
    //const query = `
    //    INSERT INTO places (
    //        image,
    //        name,
    //        address,
    //        address2,
    //       state, 
    //       city,
    //       items
    //    ) VALUES (?,?,?,?,?,?,?);
    //`
    //const values = [
    //    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
    //    "Papersider",
    //    "Guilherme Gemballa, Jardim América",
    //    "Nº 260",
    //    "Santa Catarina",
    //     "Rio do Sul",
    //    "Papéis e Papelão"

    //]

    //A função só será executada quando tudo tiver pronto
    //function afterInsertData(err){
    //    if(err){
    //        return console.log(err)
    //    }
    //    console.log("Cadastrado com sucesso!!!")
    //    console.log(this)
    //}

    //db.run(query, values, afterInsertData)

    //Consultar
    //db.all(`SELECT * FROM places`, function(err, rows) {
    //  if(err){
    //        return console.log(err)
    //    }
    //    console.log("Aqui estão seus registos:")
    //    console.log(rows)
    //})

    //Deletar
    //db.run(`DELETE FROM places`, function(err) {
    //    if(err){
    //       return console.log(err)
    //    }
    //    console.log("Registro deletado!")
    //})

    


    

})