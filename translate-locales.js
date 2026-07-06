import fs from 'fs';
import path from 'path';
import translate from 'translate';

// --- CONFIGURATION ---
// Change this to 'google', 'deepl', etc., if you have an API key. 
// Default free engine uses LibreTranslate under the hood.
translate.engine = 'google'; 

const LOCALES_ROOT = path.join(process.cwd(), 'public', 'locales');
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['es', 'pt', 'zh'];
// ---------------------

/**
 * Recursively steps through a JSON object, translating string values
 * while retaining the structural layout and keys.
 */
async function translateObject(obj, targetLang) {
  if (typeof obj === 'string') {
    if (!obj.trim()) return obj;
    try {
      // Small pause to prevent hitting rate limit thresholds
      await new Promise(resolve => setTimeout(resolve, 200));
      return await translate(obj, { from: SOURCE_LANG, to: targetLang });
    } catch (err) {
      console.error(`   ❌ Failed translating text: "${obj}". Using source fallback.`);
      return obj;
    }
  }

  if (Array.isArray(obj)) {
    const newArray = [];
    for (const item of obj) {
      newArray.push(await translateObject(item, targetLang));
    }
    return newArray;
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = await translateObject(value, targetLang);
    }
    return newObj;
  }

  return obj;
}

async function run() {
  const sourceDir = path.join(LOCALES_ROOT, SOURCE_LANG);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found at: ${sourceDir}`);
    process.exit(1);
  }

  // Read all files inside /public/locales/en/
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));
  
  if (files.length === 0) {
    console.log("No JSON files found to translate.");
    return;
  }

  console.log(`🚀 Found ${files.length} localization files in [en]. Starting pipeline...`);

  for (const targetLang of TARGET_LANGS) {
    const targetDir = path.join(LOCALES_ROOT, targetLang);
    
    // Ensure targeted destination folders (es, pt, zh) exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`\n🌎 Processing language target: [${targetLang.toUpperCase()}]`);

    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);

      console.log(`   📄 Translating ${file}...`);

      try {
        const rawData = fs.readFileSync(sourceFilePath, 'utf8');
        const jsonStructure = JSON.parse(rawData);

        // Run deep structural translation
        const translatedJson = await translateObject(jsonStructure, targetLang);

        // Write file back out beautifully spaced
        fs.writeFileSync(targetFilePath, JSON.stringify(translatedJson, null, 2), 'utf8');
      } catch (fileErr) {
        console.error(`   ❌ Failed processing file ${file}:`, fileErr.message);
      }
    }
  }

  console.log('\n✅ Localization synchronization complete!');
}

run();