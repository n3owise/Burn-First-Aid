const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

// Create images folder if it doesn't exist
if (!fs.existsSync(imagesDir)){
    fs.mkdirSync(imagesDir);
}

const images = [
  { file: "hot-water.jpg", url: "https://picsum.photos/seed/steam/400/300" },
  { file: "hot-oil.jpg", url: "https://picsum.photos/seed/oil/400/300" },
  { file: "gas-stove.jpg", url: "https://picsum.photos/seed/fire/400/300" },
  { file: "hot-utensil.jpg", url: "https://picsum.photos/seed/pan/400/300" },
  { file: "iron.jpg", url: "https://picsum.photos/seed/iron/400/300" },
  { file: "electrical.jpg", url: "https://picsum.photos/seed/electric/400/300" },
  { file: "hot-milk.jpg", url: "https://picsum.photos/seed/milk/400/300" },
  { file: "candle.jpg", url: "https://picsum.photos/seed/candle/400/300" },
  { file: "firecracker.jpg", url: "https://picsum.photos/seed/sparkler/400/300" },
  { file: "sunburn.jpg", url: "https://picsum.photos/seed/sun/400/300" },
  { file: "chemical.jpg", url: "https://picsum.photos/seed/chemical/400/300" },
  { file: "exhaust.jpg", url: "https://picsum.photos/seed/moto/400/300" },
  { file: "hospital.jpg", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" }
];

console.log('Downloading images to ./images folder...');

let completed = 0;

images.forEach(img => {
  const filePath = path.join(imagesDir, img.file);
  const file = fs.createWriteStream(filePath);
  
  https.get(img.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      completed++;
      console.log(`[${completed}/${images.length}] Downloaded ${img.file}`);
      if (completed === images.length) {
        console.log('All images downloaded successfully!');
      }
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${img.file}: ${err.message}`);
  });
});