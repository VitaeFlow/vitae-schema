const fs = require('fs');
const path = require('path');

console.log('📦 Building VitaeFlow Schema package...');

// Verify all required files exist
const requiredFiles = [
  'registry.json',
  'index.js',
  'index.d.ts',
  'README.md'
];

const missingFiles = [];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:');
  missingFiles.forEach(file => console.error(`  - ${file}`));
  process.exit(1);
}

// Verify all schema versions exist
const registry = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'registry.json'), 'utf8'));

console.log(`📋 Verifying ${registry.versions.length} schema versions...`);

let hasErrors = false;

registry.versions.forEach(versionInfo => {
  const { version } = versionInfo;
  const schemaDir = path.join(__dirname, '..', 'schemas', `v${version}`);
  const schemaFile = path.join(schemaDir, 'vitaeflow.schema.json');
  const metadataFile = path.join(schemaDir, 'metadata.json');
  const examplesDir = path.join(schemaDir, 'examples');
  
  if (!fs.existsSync(schemaFile)) {
    console.error(`❌ Missing schema file for v${version}: vitaeflow.schema.json`);
    hasErrors = true;
  }
  
  if (!fs.existsSync(metadataFile)) {
    console.error(`❌ Missing metadata file for v${version}: metadata.json`);
    hasErrors = true;
  }
  
  if (!fs.existsSync(examplesDir)) {
    console.error(`❌ Missing examples directory for v${version}`);
    hasErrors = true;
  } else {
    // Check for required examples
    const minimalExample = path.join(examplesDir, 'minimal.json');
    const completeExample = path.join(examplesDir, 'complete.json');
    
    if (!fs.existsSync(minimalExample)) {
      console.error(`❌ Missing minimal example for v${version}`);
      hasErrors = true;
    }
    
    if (!fs.existsSync(completeExample)) {
      console.error(`❌ Missing complete example for v${version}`);
      hasErrors = true;
    }
  }
  
  if (!hasErrors) {
    console.log(`  ✅ v${version}`);
  }
});

if (hasErrors) {
  console.error('❌ Package build failed due to missing files');
  process.exit(1);
}

// Validate package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

const requiredPackageFields = ['name', 'version', 'description', 'main', 'types', 'files', 'scripts', 'author', 'license'];
const missingPackageFields = requiredPackageFields.filter(field => !packageJson[field]);

if (missingPackageFields.length > 0) {
  console.error('❌ Missing required package.json fields:');
  missingPackageFields.forEach(field => console.error(`  - ${field}`));
  hasErrors = true;
}

// Check that all files listed in package.json "files" exist
const declaredFiles = packageJson.files || [];
declaredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Declared file does not exist: ${file}`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.error('❌ Package build failed');
  process.exit(1);
}

console.log('✅ Package build successful!');
console.log(`📊 Package summary:`);
console.log(`  - Name: ${packageJson.name}`);
console.log(`  - Version: ${packageJson.version}`);
console.log(`  - Schema versions: ${registry.versions.length}`);
console.log(`  - Latest schema: v${registry.latest}`);
console.log(`  - Files: ${declaredFiles.length} declared`);
console.log('📦 Ready for publication!');