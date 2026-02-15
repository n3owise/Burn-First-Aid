# 🔥 How to Add New Burn Guides and Images

This guide explains how to add new burn guides, update content, and manage images in your First Aid app.

## 📋 Project Structure

```
/
├── burns-data.json              ← MASTER FILE - All content here
├── images/
│   ├── hot-water.jpg            ← Main guide card image
│   ├── hot-water/               ← Category-specific images
│   │   ├── dos/
│   │   │   ├── step-1.jpg       ← Do action #1 image
│   │   │   ├── step-2.jpg       ← Do action #2 image
│   │   │   └── ...
│   │   └── donts/
│   │       ├── step-1.jpg       ← Don't action #1 image
│   │       ├── step-2.jpg       ← Don't action #2 image
│   │       └── ...
│   ├── hot-oil.jpg
│   ├── hot-oil/
│   │   ├── dos/
│   │   └── donts/
│   └── ... (all other categories)
└── update-category-images.cjs   ← Auto-update script
```

---

## 🎯 Quick Start: Add a New Burn Guide

### Step 1: Create Folder Structure
1. Create a folder for your new burn type in `/images/`
   ```
   images/
   └── your-burn-id/
       ├── dos/
       └── donts/
   ```
2. Add your main guide image: `images/your-burn-id.jpg`

### Step 2: Add Images for Each Action
1. Create images for each "Do" action (step-1.jpg, step-2.jpg, etc.)
2. Save them to `/images/your-burn-id/dos/`
3. Create images for each "Don't" action (step-1.jpg, step-2.jpg, etc.)
4. Save them to `/images/your-burn-id/donts/`

### Step 3: Update burns-data.json
1. Open `burns-data.json`
2. Copy an existing guide entry (e.g., hot-water)
3. Paste it at the end of the `guides` array
4. Update the fields:

```json
{
  "id": "your-burn-id",                      ← Must match folder name
  "title": { "en": "...", "hi": "..." },
  "imageUrl": "./images/your-burn-id.jpg",
  "heroImage": "./images/your-burn-id.jpg",
  "dos": [
    {
      "image": "./images/your-burn-id/dos/step-1.jpg",  ← Category-specific!
      "text": { "en": "...", "hi": "..." }
    },
    {
      "image": "./images/your-burn-id/dos/step-2.jpg",
      "text": { "en": "...", "hi": "..." }
    }
  ],
  "donts": [
    {
      "image": "./images/your-burn-id/donts/step-1.jpg",
      "text": { "en": "...", "hi": "..." }
    }
  ]
}
```

### Step 4: That's it! 🎉
- Each category has its own images
- Easy to customize per burn type
- No code changes needed

---

## 🖼️ Managing Images

### Main Guide Images
Located in: `/images/[category-id].jpg`

Examples:
- `/images/hot-water.jpg`
- `/images/hot-oil.jpg`
- `/images/electrical.jpg`

These appear on:
- Home screen cards (small preview)
- Guide detail page (hero image at top)

**Requirements:**
- Format: JPG, PNG, or WebP
- Size: 800x600px to 1200x800px recommended
- Keep under 500KB

**To add:**
1. Save image to `/images/` folder
2. Name it same as your category ID (e.g., `acid-burn.jpg`)
3. Reference in JSON: `"imageUrl": "./images/acid-burn.jpg"`

---

### Category-Specific Do/Don't Images
Located in: `/images/[category-id]/dos/` and `/images/[category-id]/donts/`

**Each burn category has its own set of images!**

Structure:
```
images/
└── hot-oil/
    ├── dos/
    │   ├── step-1.jpg    ← Image for 1st do action
    │   ├── step-2.jpg    ← Image for 2nd do action
    │   ├── step-3.jpg
    │   └── ...
    └── donts/
        ├── step-1.jpg    ← Image for 1st don't action
        ├── step-2.jpg    ← Image for 2nd don't action
        └── ...
```

**Why category-specific?**
- Hot oil: Shows oil splatter, stove
- Electrical: Shows power switches, circuits
- Firecracker: Shows crackers, safety gear
- Each type needs unique, relevant images!

**Requirements:**
- Format: JPG, PNG, or WebP
- Size: 400x400px to 800x800px (square recommended)
- Keep under 200KB each
- Number files sequentially (step-1.jpg, step-2.jpg, etc.)

**To add images for a new category:**
1. Create folders:
   ```bash
   mkdir -p images/your-category-id/dos
   mkdir -p images/your-category-id/donts
   ```
2. Add images numbered sequentially:
   ```
   images/your-category-id/dos/step-1.jpg
   images/your-category-id/dos/step-2.jpg
   ...
   images/your-category-id/donts/step-1.jpg
   ...
   ```
3. Reference them in burns-data.json (done automatically if you follow naming)

---

## 📝 Example: Adding a New Guide

Let's add a guide for "Acid Burn":

### 1. Create folder structure
```bash
mkdir -p images/acid-burn/dos
mkdir -p images/acid-burn/donts
```

### 2. Add main guide image
Save `acid-burn.jpg` to `/images/` folder

### 3. Add action images
Create and add images:
```
images/acid-burn/dos/step-1.jpg  ← Flush with water
images/acid-burn/dos/step-2.jpg  ← Remove contaminated clothes
images/acid-burn/dos/step-3.jpg  ← Call emergency
...
images/acid-burn/donts/step-1.jpg  ← Don't neutralize
images/acid-burn/donts/step-2.jpg  ← Don't apply cream
...
```

### 4. Update burns-data.json
Add this to the `guides` array:

```json
{
  "id": "acid-burn",
  "title": {
    "en": "Acid Burn",
    "hi": "एसिड जलना"
  },
  "description": {
    "en": "Burns from acid or chemical exposure",
    "hi": "एसिड या रासायनिक संपर्क से जलना"
  },
  "imageUrl": "./images/acid-burn.jpg",
  "subtitle": {
    "en": "Chemical injury requiring immediate care",
    "hi": "तत्काल देखभाल की आवश्यकता वाली रासायनिक चोट"
  },
  "heroImage": "./images/acid-burn.jpg",
  "dos": [
    {
      "image": "./images/acid-burn/dos/step-1.jpg",
      "text": {
        "en": "Flush with water for 30+ minutes",
        "hi": "30+ मिनट तक पानी से धोएं"
      }
    },
    {
      "image": "./images/acid-burn/dos/step-2.jpg",
      "text": {
        "en": "Remove contaminated clothing carefully",
        "hi": "संदूषित कपड़े सावधानी से हटाएं"
      }
    },
    {
      "image": "./images/acid-burn/dos/step-3.jpg",
      "text": {
        "en": "Call emergency services immediately",
        "hi": "तुरंत आपातकालीन सेवा बुलाएं"
      }
    }
  ],
  "donts": [
    {
      "image": "./images/acid-burn/donts/step-1.jpg",
      "text": {
        "en": "Don't try to neutralize the acid",
        "hi": "एसिड को बेअसर करने की कोशिश न करें"
      }
    },
    {
      "image": "./images/acid-burn/donts/step-2.jpg",
      "text": {
        "en": "Don't apply any creams or ointments",
        "hi": "कोई क्रीम या मलहम न लगाएं"
      }
    }
  ],
  "steps": [
    {
      "title": {
        "en": "Ensure Safety First",
        "hi": "पहले सुरक्षा सुनिश्चित करें"
      },
      "description": {
        "en": "Move away from the acid source. Protect yourself before helping others...",
        "hi": "एसिड स्रोत से दूर चले जाएं। दूसरों की मदद करने से पहले खुद की सुरक्षा करें..."
      }
    }
  ],
  "warnings": [
    {
      "en": "All acid burns require immediate hospital care",
      "hi": "सभी एसिड जलन को तत्काल अस्पताल देखभाल की आवश्यकता है"
    }
  ]
}
```

### 5. Save and test
- Save `burns-data.json`
- Refresh your browser
- Your new guide appears with its own specific images!

---

## ✅ Checklist for New Guide

- [ ] Folder created: `images/[category-id]/dos/` and `/donts/`
- [ ] Main guide image added: `images/[category-id].jpg`
- [ ] Do action images added (step-1.jpg, step-2.jpg, etc.)
- [ ] Don't action images added (step-1.jpg, step-2.jpg, etc.)
- [ ] Guide entry added to `burns-data.json`
- [ ] Unique `id` matches folder name
- [ ] Both English and Hindi translations for all text
- [ ] Image paths use category-specific structure
- [ ] At least 3-6 do's and don'ts
- [ ] At least 4-6 step-by-step instructions
- [ ] At least 3-5 warning signs
- [ ] JSON syntax is valid (no missing commas/brackets)
- [ ] Tested in browser

---

## 🔧 Troubleshooting

**Guide not showing:**
- Check JSON syntax (use a JSON validator)
- Ensure image paths are correct
- Verify the guide has all required fields

**Images not loading:**
- Check folder names match category ID exactly
- Ensure images are numbered correctly (step-1.jpg, step-2.jpg)
- Check file extensions (.jpg, .png, etc.)
- Verify paths in JSON match folder structure

**Wrong number of images:**
- Make sure you have as many images as do/don't items
- Images should be numbered sequentially starting from 1

**Translation missing:**
- Every text field needs both `en` and `hi`
- Copy from similar guides if needed

---

## 💡 Tips

1. **Category-specific images** - Each burn type should have its own relevant images
2. **Consistent numbering** - step-1.jpg, step-2.jpg, step-3.jpg (no gaps)
3. **Relevant visuals** - Show actual actions specific to that burn type
4. **Keep text concise** - Especially for do's and don'ts
5. **Test with both languages** - Switch between EN/HI in the app
6. **Optimize images** - Compress before adding to reduce load time
7. **Match image order** - First do/don't text uses step-1.jpg, second uses step-2.jpg, etc.
8. **Folder naming** - Use same ID as in JSON (hot-water, not hot_water or Hot Water)

---

## 📞 Need Help?

Refer to:
- This file - Complete guide for adding content
- `burns-data.json` - See existing guides as examples
- `constants.ts` - Understand how data is loaded
- `update-category-images.cjs` - Auto-update image paths script

**Useful commands:**
```bash
# Check JSON syntax
node -e "JSON.parse(require('fs').readFileSync('burns-data.json'))"

# Update image paths automatically
node update-category-images.cjs

# List all category folders
ls -d images/*/
```

---

## 🗂️ Image Folder Structure Reference

Complete structure for all categories:

```
images/
├── hot-water.jpg
├── hot-water/
│   ├── dos/
│   │   ├── step-1.jpg  ← Cool under water
│   │   ├── step-2.jpg  ← Remove jewelry
│   │   ├── step-3.jpg  ← Apply aloe
│   │   ├── step-4.jpg  ← Cover bandage
│   │   ├── step-5.jpg  ← Drink water
│   │   └── step-6.jpg  ← Take painkiller
│   └── donts/
│       ├── step-1.jpg  ← No ice
│       ├── step-2.jpg  ← No butter
│       ├── step-3.jpg  ← No toothpaste
│       ├── step-4.jpg  ← No burst blisters
│       └── step-5.jpg  ← No cotton
├── hot-oil.jpg
├── hot-oil/
│   ├── dos/
│   └── donts/
├── [other categories...]
└── YOUR-NEW-CATEGORY.jpg
    └── your-new-category/
        ├── dos/
        │   ├── step-1.jpg
        │   └── ...
        └── donts/
            ├── step-1.jpg
            └── ...
```

---

**Remember:** Each burn category has its own complete set of images. This allows you to show burn-specific actions and warnings! 🎉
