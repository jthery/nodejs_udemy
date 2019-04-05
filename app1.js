// on a 3 pages, une page d'accueil, une page test et une page Erreur 404

// Combinaison de deux module
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    if(req.url == '/') {
        res.writeHead(200, { 'Content-type': 'text/html'}) 
        res.write("<h1>Accueil</h1>\n")
        res.end()

    } else if (req.url == '/test') { // si l'URL est égale à /test
        fs.readFile('test.txt', 'utf-8', (err, data) => { // je lie ce fichier
            if (err) { // si il y a une erreur
                send404(res) // fonction créer, renvoi erreur 404 (1)
            } else { // sinon
                res.writeHead(200, { 'Content-type': 'text/html'})  // type de contenu
                res.write(data) // on écrit la donné
                res.end() // on est bien assuré que c'est terminé
            }
        })
    } else {
        send404(res)
    }
}).listen(8080)


function send404(res) { // fonction créer (1)
    res.writeHead(404, {'Content-type': 'text/html'}) // On choisit le type de contenu
    res.write("<span style='color: red'>Erreur 404</span>") // on renvoi une erreur 404
    res.end() // on est bien assuré que c'est terminé
}