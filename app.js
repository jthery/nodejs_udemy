// require('os') // module interne

// le require OS doit être mis dans une variable
const os = require('os');
// .arch permet de récupérer l'achitecture de notre CPU (x64)
console.log(os.arch())
// .homedir permet d'avor le dossier principal (C:\Users\...)
console.log(os.homedir())

// require('fs')  // module interne File System, de pouvoir lire/ecrire etc.. dans un fichier

const fs = require('fs');

// readFile permet de lire le fichier, UTF-8 qui est optiennel, mais conseillé de le mettre, fonction de callback "=>" une fois que le fichier est lu, la fonction prend deux paramètres, (err, data)
fs.readFile('test.txt', 'utf-8', (err, data) => {
    // voir l'erreur si il y en a une
    if (err) {
        console.log(err)
    } else {    // sinnon affiche la donné
        console.log(data)

    // pour écrire dans un fichier
        fs.writeFile('test.txt','Hello World', 'utf-8', (err) => {
            // juste pour vérifier la différence, quand on modifie via le WriteFile ou le fichier text.txt
            fs.readFile('test.txt', 'utf-8', (err, data) => {
                console.log(data);
            })
        })
    }
})







// require('http') // module interne : va nous permettre de créer un site web
const http = require('http')

// createServer 
http.createServer((req, res) => { // deux paramètre, req pour requete, res pour la response qu'on va envoyer

    if(req.url == '/') {
        res.writeHead(200, { // écrire les headers, précise le contenu de la requete, ainsi que son status qui est "200" pour dire que tout va bien
        'Content-type': 'text/html' // pour indiquer à l'utilisateur le contenu de la requete
           }) 
        res.write("<h1>Accueil</h1>\n") // ça reste du HTML
    } else {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.write("<span style='color: red'>Erreur 404</span>")
    } res.end()


    // remplacer par le IF et le ELSE ci-dessus
    // res.write("Hello\n") // envoi, "\n" le saut de ligne à ne pas oublié pour l'URL
    // res.write(req.url) // paramètre qui vient de la requete, pour la création d'URL
    // res.end() // fin de l'envoi
}).listen(8080) // là où on veut que notre site web réponde 



setTimeout(() => console.log('test 1'));




