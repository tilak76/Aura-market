
const fs = require('fs');
const path = require('path');

const dbPath = 'market/aura-web/src/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newImages = [
    "/src/assets/dresses/dress1.png",
    "/src/assets/dresses/dress2.png",
    "/src/assets/dresses/dress3.png",
    "/src/assets/dresses/dress4.png",
    "/src/assets/dresses/dress5.png"
];

if (db.womens && db.womens.length >= 5) {
    for (let i = 0; i < 5; i++) {
        // Update all image fields to be safe, or just img1 if that's the main one.
        // Looking at the sample, img1, img2, img3 are used.
        // Let's use the same image for all 3 for now to ensure it shows up,
        // or just img1 if the app prefers that.
        // The sample output showed: img1, img2, img3.
        db.womens[i].img1 = newImages[i];
        db.womens[i].img2 = newImages[i]; // Use same or maybe I should have generated more? 
        // For now, let's use the same premium image for all slots to guarantee coverage.
        db.womens[i].img3 = newImages[i];

        // Also let's update the title keywords to match "Dress" if they don't already
        // This is a "fetch" request effectively, so updating metadata slightly helps.
        // But I'll stick to just images to be safe.
    }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("Updated first 5 women's items with new dress images.");
