
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('market/aura-web/src/db.json', 'utf8'));

console.log("Womens count:", db.womens ? db.womens.length : 0);
console.log("Kids count:", db.kids ? db.kids.length : 0);
