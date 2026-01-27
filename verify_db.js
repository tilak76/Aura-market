
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('market/aura-web/src/db.json', 'utf8'));

if (db.womens) {
    console.log("First 5 items in 'womens':");
    db.womens.slice(0, 5).forEach((item, index) => {
        console.log(`[${index}] Img1: ${item.img1}`);
    });
} else {
    console.log("'womens' section not found!");
}
