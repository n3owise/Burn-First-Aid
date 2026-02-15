/**
 * Script to automatically update burns-data.json to use action images
 * This maps common action text to specific action image files
 */

const fs = require('fs');
const path = require('path');

// Mapping of action text patterns to image filenames
const ACTION_IMAGE_MAP = {
  // DOS
  'cool under running water': './images/actions/cool-water.jpg',
  'remove rings, watch': './images/actions/remove-jewelry.jpg',
  'remove jewelry': './images/actions/remove-jewelry.jpg',
  'apply aloe vera': './images/actions/apply-aloe.jpg',
  'cover with clean': './images/actions/cover-bandage.jpg',
  'drink water': './images/actions/drink-water.jpg',
  'take painkiller': './images/actions/take-painkiller.jpg',
  'remove wet clothing': './images/actions/remove-jewelry.jpg',
  'call emergency': './images/actions/cool-water.jpg', // placeholder
  'check for breathing': './images/actions/cool-water.jpg', // placeholder
  'turn off power': './images/actions/cool-water.jpg', // placeholder
  'extinguish candle': './images/actions/cool-water.jpg', // placeholder
  'get out of sun': './images/actions/cool-water.jpg', // placeholder
  'take cool shower': './images/actions/cool-water.jpg',
  'move to safe area': './images/actions/cool-water.jpg', // placeholder
  'remove contaminated clothing': './images/actions/remove-jewelry.jpg',
  'flush with water': './images/actions/cool-water.jpg',
  'keep victim warm': './images/actions/cover-bandage.jpg',
  
  // DONTS
  "don't apply ice": './images/actions/no-ice.jpg',
  "don't use butter": './images/actions/no-butter.jpg',
  "don't apply toothpaste": './images/actions/no-toothpaste.jpg',
  "don't burst blisters": './images/actions/no-burst-blisters.jpg',
  "don't use cotton": './images/actions/no-cotton.jpg',
  "don't peel": './images/actions/no-cotton.jpg', // placeholder
  "don't touch victim": './images/actions/no-ice.jpg', // placeholder
  "don't use water near": './images/actions/no-ice.jpg', // placeholder
  "don't move victim": './images/actions/no-ice.jpg', // placeholder
  "don't pull off hot wax": './images/actions/no-ice.jpg', // placeholder
  "don't relight": './images/actions/no-ice.jpg', // placeholder
  "don't rub eyes": './images/actions/no-ice.jpg', // placeholder
  "don't go back in sun": './images/actions/no-ice.jpg', // placeholder
  "don't neutralize": './images/actions/no-ice.jpg', // placeholder
  "don't apply creams": './images/actions/no-butter.jpg',
  "don't delay": './images/actions/no-ice.jpg', // placeholder
  "don't ignore": './images/actions/no-ice.jpg', // placeholder
};

function findBestImageForAction(actionText) {
  const lowerText = actionText.toLowerCase();
  
  // Try to find a matching pattern
  for (const [pattern, imagePath] of Object.entries(ACTION_IMAGE_MAP)) {
    if (lowerText.includes(pattern)) {
      return imagePath;
    }
  }
  
  // Default fallback - keep original
  return null;
}

function updateBurnsData() {
  const jsonPath = path.join(__dirname, 'burns-data.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  let updateCount = 0;
  
  // Process each guide
  data.guides.forEach(guide => {
    // Update DOS images
    if (guide.dos) {
      guide.dos.forEach(item => {
        const newImage = findBestImageForAction(item.text.en);
        if (newImage && item.image !== newImage) {
          item.image = newImage;
          updateCount++;
        }
      });
    }
    
    // Update DONTS images
    if (guide.donts) {
      guide.donts.forEach(item => {
        const newImage = findBestImageForAction(item.text.en);
        if (newImage && item.image !== newImage) {
          item.image = newImage;
          updateCount++;
        }
      });
    }
  });
  
  // Write back to file with pretty formatting
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Updated ${updateCount} action images in burns-data.json`);
  console.log(`📝 Please review the file and add specific images to ./images/actions/ folder as needed`);
}

// Run the update
try {
  updateBurnsData();
} catch (error) {
  console.error('❌ Error updating burns data:', error.message);
  process.exit(1);
}
