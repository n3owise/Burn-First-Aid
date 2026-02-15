# Images Folder Structure

This folder contains all images for the burn first aid guides.

## 📁 Structure

```
images/
├── [category-id].jpg          ← Main card/hero image for each category
├── [category-id]/             ← Category-specific folder
│   ├── dos/                   ← "Do this" action images
│   │   ├── step-1.jpg
│   │   ├── step-2.jpg
│   │   └── ...
│   └── donts/                 ← "Don't do this" action images
│       ├── step-1.jpg
│       ├── step-2.jpg
│       └── ...
```

## 📋 Current Categories

Each of these has its own folder with dos/donts subfolders:

1. **hot-water** - Hot Water / Steam burns
2. **hot-oil** - Hot Oil / Grease burns
3. **gas-stove** - Gas Stove / Flame burns
4. **hot-utensil** - Hot Utensil / Pan burns
5. **iron** - Iron / Hot Metal burns
6. **electrical** - Electrical burns
7. **hot-milk** - Hot Milk / Liquid burns
8. **candle** - Candle / Wax burns
9. **firecracker** - Firecracker burns
10. **sunburn** - Sunburn
11. **chemical** - Chemical burns
12. **exhaust** - Exhaust / Silencer burns

## 🎯 Adding Images for a New Category

### Step 1: Create the folder structure
```bash
mkdir -p images/your-category-id/dos
mkdir -p images/your-category-id/donts
```

### Step 2: Add the main guide image
Save your main image as: `images/your-category-id.jpg`

This appears on:
- Home screen as a card
- Top of the guide page as hero image

**Requirements:**
- Format: JPG, PNG, or WebP
- Recommended size: 800x600px to 1200x800px
- Keep under 500KB

### Step 3: Add do/don't action images

Create sequential images for each action:

**For "Do" actions:**
```
images/your-category-id/dos/step-1.jpg
images/your-category-id/dos/step-2.jpg
images/your-category-id/dos/step-3.jpg
...
```

**For "Don't" actions:**
```
images/your-category-id/donts/step-1.jpg
images/your-category-id/donts/step-2.jpg
images/your-category-id/donts/step-3.jpg
...
```

**Requirements:**
- Format: JPG, PNG, or WebP
- Recommended size: 400x400px to 800x800px (square)
- Keep under 200KB each
- Must match the number of dos/donts in your JSON entry
- Number sequentially starting from 1

### Step 4: Update burns-data.json

The image paths will automatically follow this pattern:
```json
{
  "id": "your-category-id",
  "imageUrl": "./images/your-category-id.jpg",
  "heroImage": "./images/your-category-id.jpg",
  "dos": [
    {
      "image": "./images/your-category-id/dos/step-1.jpg",
      "text": { ... }
    },
    {
      "image": "./images/your-category-id/dos/step-2.jpg",
      "text": { ... }
    }
  ],
  "donts": [
    {
      "image": "./images/your-category-id/donts/step-1.jpg",
      "text": { ... }
    }
  ]
}
```

## 🔄 Auto-Update Script

If you've already added entries to burns-data.json and want to automatically update them to use the correct image paths:

```bash
node update-category-images.cjs
```

This script will:
- Read all guides from burns-data.json
- Update dos/donts image paths to match the folder structure
- Preserve all other data

## ✅ Image Guidelines

### Main Guide Images
- **Purpose**: Visual identification of burn type
- **Content**: Show the actual burn source (hot water, oil, fire, etc.)
- **Style**: Clear, recognizable, appropriate for medical context

### Do Action Images
- **Purpose**: Show correct first aid steps
- **Content**: Demonstrate the action being described
- **Examples**:
  - Cooling hand under running water
  - Removing jewelry
  - Applying aloe vera gel
  - Covering with bandage
  - Person drinking water

### Don't Action Images
- **Purpose**: Show what NOT to do
- **Content**: Illustrate dangerous or incorrect actions
- **Visual cues**: Consider adding a red X or prohibition symbol overlay
- **Examples**:
  - Ice being applied (crossed out)
  - Butter/ghee jar (crossed out)
  - Toothpaste (crossed out)
  - Bursting blister (crossed out)

## 🎨 Design Tips

1. **Consistency**: Use similar visual style across all images in a category
2. **Clarity**: Images should be immediately understandable
3. **Cultural relevance**: Choose images appropriate for your audience
4. **Compression**: Optimize images before adding to reduce load time
5. **Accessibility**: Ensure good contrast and clear subjects

## 🚫 Common Mistakes

❌ **Don't:**
- Mix up the numbering (step-1.jpg, step-3.jpg - missing step-2)
- Use different file extensions in same category
- Create folders with different names than the category ID
- Forget to add both dos and donts folders

✅ **Do:**
- Number sequentially from 1
- Use consistent file format (all .jpg or all .png)
- Match folder names exactly to category IDs in JSON
- Create both dos and donts folders even if only using one

## 📞 Need Help?

See the main documentation: [HOW-TO-ADD-GUIDES.md](../HOW-TO-ADD-GUIDES.md)
