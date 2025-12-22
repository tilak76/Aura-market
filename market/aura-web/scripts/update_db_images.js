import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../src/db.json');

// Helper to generate unique image URLs
const getUniqueImage = (keywords, lockId) => {
  return `https://loremflickr.com/500/700/${keywords}?lock=${lockId}`;
};

async function updateDb() {
  try {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    let mensLockBase = 1000;
    let womensLockBase = 5000;
    let kidsLockBase = 9000;
    let campingLockBase = 13000;

    // Update Mens
    if (db.mens) {
      db.mens = db.mens.map((item, index) => {
        const id = mensLockBase + index;
        return {
          ...item,
          img1: getUniqueImage('men,fashion,clothing', id),
          img2: getUniqueImage('men,fashion,shirt', id + 10000),
          img3: getUniqueImage('men,fashion,pants', id + 20000)
        };
      });
    }

    // Update Womens
    if (db.womens) {
      db.womens = db.womens.map((item, index) => {
        const id = womensLockBase + index;
        return {
          ...item,
          img1: getUniqueImage('women,fashion,dress', id),
          img2: getUniqueImage('women,fashion,model', id + 10000),
          img3: getUniqueImage('women,clothing,style', id + 20000)
        };
      });
    }

    // Update Kids
    if (db.kids) {
      db.kids = db.kids.map((item, index) => {
        const id = kidsLockBase + index;
        return {
          ...item,
          img1: getUniqueImage('kid,clothing,child', id),
          img2: getUniqueImage('kid,fashion,boy', id + 10000),
          img3: getUniqueImage('kid,fashion,girl', id + 20000)
        };
      });
    }

    // Create/Update Camping (Outdoor Gear)
    // If it doesn't exist or is empty, we create some mock data
    if (!db.camping || db.camping.length === 0) {
      console.log('⛺ Generating new Camping/Outdoor data...');
      db.camping = Array.from({ length: 20 }).map((_, i) => ({
        "jss11 href": "#",
        "title": `Outdoor Adventure Gear Item ${i + 1}`,
        "title2": "Premium Quality",
        "price": (29.99 + (i * 5)).toFixed(2),
        "jss217": "",
        "jss218": "",
        "jss219": "",
        "img1": "", // set below
        "img2": "",
        "img3": ""
      }));
    }

    // Update Camping images
    db.camping = db.camping.map((item, index) => {
      const id = campingLockBase + index;
      return {
        ...item,
        img1: getUniqueImage('camping,hiking,outdoor', id),
        img2: getUniqueImage('camping,tent,nature', id + 10000),
        img3: getUniqueImage('hiking,mountain,gear', id + 20000)
      };
    });

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('✅ db.json updated successfully');
    console.log(`Counts -> Mens: ${db.mens?.length}, Womens: ${db.womens?.length}, Kids: ${db.kids?.length}, Camping: ${db.camping?.length}`);

  } catch (error) {
    console.error('❌ Error updating db.json:', error);
  }
}

updateDb();
