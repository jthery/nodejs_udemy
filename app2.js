// pour lier notre module1.js, et je l'attribut à une variable afin de l'utiliser
// node_modules permet de stocker tous nos modules, pas besoin donc d'indiquer le chemin avec le "./module1"
const mod1 = require('module1')

// afin d'afficher le contenu du fichier module1.js
mod1.sayHello()

mod1.sayHi()

// on peut atteindre aussi notre Hello World qui est dans le fichier module1.js à travers "mod1" qui est dans app2.js
console.log(mod1.hello)