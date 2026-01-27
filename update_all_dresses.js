
const fs = require('fs');
const path = require('path');

const dbPath = 'market/aura-web/src/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const allImages = [
    "/src/assets/dresses/dress1.png",
    "/src/assets/dresses/dress2.png",
    "/src/assets/dresses/dress3.png",
    "/src/assets/dresses/dress4.png",
    "/src/assets/dresses/dress5.png",
    "/src/assets/dresses/dress6.png",
    "/src/assets/dresses/dress7.png",
    "/src/assets/dresses/dress8.png",
    "/src/assets/dresses/dress9.png",
    "/src/assets/dresses/dress10.png"
];

if (db.womens && db.womens.length > 0) {
    db.womens.forEach((item, index) => {
        // Assign a random image from the pool of 10, or sequential to ensure variety
        // Sequential is better to distribute evenly
        const imageIndex = index % allImages.length;
        const selectedImage = allImages[imageIndex];

        item.img1 = selectedImage;
        item.img2 = selectedImage; // Same image for now
        item.img3 = selectedImage;
    });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Updated all ${db.womens ? db.womens.length : 0} women's items with new dress images.`);
