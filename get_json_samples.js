
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('market/aura-web/src/db.json', 'utf8'));

console.log("--- WOMENS [0] ---");
console.log(JSON.stringify(db.womens?.[0], null, 2));
console.log("\n--- KIDS [0] ---");
console.log(JSON.stringify(db.kids?.[0], null, 2));
