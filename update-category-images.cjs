/**
 * Script to update burns-data.json to use category-specific images
 * Each burn category will have its own dos/donts images
 */

const fs = require('fs');
const path = require('path');

function updateBurnsDataWithCategoryImages() {
  const jsonPath = path.join(__dirname, 'burns-data.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  let updateCount = 0;
  
  // Process each guide
  data.guides.forEach(guide => {
    const categoryId = guide.id;
    
    // Update DOS images
    if (guide.dos) {
      guide.dos.forEach((item, index) => {
        const stepNumber = index + 1;
        const newImagePath = `./images/${categoryId}/dos/step-${stepNumber}.jpg`;
        if (item.image !== newImagePath) {
          item.image = newImagePath;
          updateCount++;
        }
      });
    }
    
    // Update DONTS images
    if (guide.donts) {
      guide.donts.forEach((item, index) => {
        const stepNumber = index + 1;
        const newImagePath = `./images/${categoryId}/donts/step-${stepNumber}.jpg`;
        if (item.image !== newImagePath) {
          item.image = newImagePath;
          updateCount++;
        }
      });
    }
  });
  
  // Write back to file with pretty formatting
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Updated ${updateCount} images to use category-specific paths`);
  console.log(`\n📁 Image structure for each category:`);
  console.log(`   images/[category-id]/`);
  console.log(`   ├── dos/`);
  console.log(`   │   ├── step-1.jpg`);
  console.log(`   │   ├── step-2.jpg`);
  console.log(`   │   └── ...`);
  console.log(`   └── donts/`);
  console.log(`       ├── step-1.jpg`);
  console.log(`       ├── step-2.jpg`);
  console.log(`       └── ...`);
  console.log(`\n📝 To add new images, replace the placeholder files in each category folder`);
}

// Run the update
try {
  updateBurnsDataWithCategoryImages();
} catch (error) {
  console.error('❌ Error updating burns data:', error.message);
  process.exit(1);
}
