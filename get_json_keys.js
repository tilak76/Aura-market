
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('market/aura-web/src/db.json', 'utf8'));
console.log(Object.keys(db));
