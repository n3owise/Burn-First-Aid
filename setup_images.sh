#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

echo "Creating 'images' folder and downloading placeholders..."

# Download placeholder images with the filenames matching constants.ts
curl -L -o "images/hot-water.jpg" "https://picsum.photos/seed/steam/400/300"
curl -L -o "images/hot-oil.jpg" "https://picsum.photos/seed/oil/400/300"
curl -L -o "images/gas-stove.jpg" "https://picsum.photos/seed/fire/400/300"
curl -L -o "images/hot-utensil.jpg" "https://picsum.photos/seed/pan/400/300"
curl -L -o "images/iron.jpg" "https://picsum.photos/seed/iron/400/300"
curl -L -o "images/electrical.jpg" "https://picsum.photos/seed/electric/400/300"
curl -L -o "images/hot-milk.jpg" "https://picsum.photos/seed/milk/400/300"
curl -L -o "images/candle.jpg" "https://picsum.photos/seed/candle/400/300"
curl -L -o "images/firecracker.jpg" "https://picsum.photos/seed/sparkler/400/300"
curl -L -o "images/sunburn.jpg" "https://picsum.photos/seed/sun/400/300"
curl -L -o "images/chemical.jpg" "https://picsum.photos/seed/chemical/400/300"
curl -L -o "images/exhaust.jpg" "https://picsum.photos/seed/moto/400/300"
curl -L -o "images/hospital.jpg" "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"

echo "Done! Images are in the ./images/ folder."
echo "You can now replace these files with your own images."