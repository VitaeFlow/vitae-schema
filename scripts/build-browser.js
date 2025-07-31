#!/usr/bin/env node
/**
 * Build script for browser-compatible schema package
 * Generates browser.js with pre-loaded schemas from JSON files
 */

const fs = require('fs');
const path = require('path');

// Load registry and schemas from actual files
const registry = JSON.parse(fs.readFileSync(path.join(__dirname, '../registry.json'), 'utf8'));
const schemasDir = path.join(__dirname, '../schemas');

// Load all schemas from files
const schemas = {};
const examples = {};

registry.versions.forEach(versionInfo => {
  const version = versionInfo.version;
  const versionDir = path.join(schemasDir, `v${version}`);
  
  if (fs.existsSync(versionDir)) {
    // Load schema
    const schemaPath = path.join(versionDir, 'vitaeflow.schema.json');
    if (fs.existsSync(schemaPath)) {
      schemas[version] = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    }
    
    // Load examples
    const examplesDir = path.join(versionDir, 'examples');
    if (fs.existsSync(examplesDir)) {
      examples[version] = {};
      const exampleFiles = fs.readdirSync(examplesDir);
      
      exampleFiles.forEach(file => {
        if (file.endsWith('.json')) {
          const exampleName = path.basename(file, '.json');
          const examplePath = path.join(examplesDir, file);
          examples[version][exampleName] = JSON.parse(fs.readFileSync(examplePath, 'utf8'));
        }
      });
    }
  }
});

// Generate browser.js content
const browserJsContent = `/**
 * Browser-compatible VitaeFlow Schema
 * Auto-generated from schema files - DO NOT EDIT MANUALLY
 * Generated on: ${new Date().toISOString()}
 */

// Registry loaded from registry.json
const registry = ${JSON.stringify(registry, null, 2)};

// Schemas loaded from /schemas directory
const schemas = ${JSON.stringify(schemas, null, 2)};

// Examples loaded from /schemas/*/examples
const examples = ${JSON.stringify(examples, null, 2)};

/**
 * Get schema by version
 * @param {string} version - Schema version (e.g., "0.1.0")
 * @returns {Object} Schema JSON object
 */
function getSchema(version) {
  if (!schemas[version]) {
    throw new Error(\`Schema version \${version} not found\`);
  }
  return schemas[version];
}

/**
 * Get latest schema version
 * @returns {Object} Latest schema JSON object
 */
function getLatestSchema() {
  const latestVersion = registry.latest;
  return getSchema(latestVersion);
}

/**
 * Get all available versions
 * @returns {Array<string>} Array of available versions
 */
function getAvailableVersions() {
  return registry.versions.map(v => v.version);
}

/**
 * Get version metadata
 * @param {string} version - Schema version
 * @returns {Object} Version metadata
 */
function getVersionMetadata(version) {
  const metadata = registry.versions.find(v => v.version === version);
  if (!metadata) {
    throw new Error(\`Version \${version} not found in registry\`);
  }
  return metadata;
}

/**
 * Get example for a specific version
 * @param {string} version - Schema version
 * @param {string} type - Example type ("minimal" or "complete")
 * @returns {Object} Example JSON object
 */
function getExample(version, type = 'minimal') {
  if (!examples[version] || !examples[version][type]) {
    throw new Error(\`Example \${type} for version \${version} not found\`);
  }
  return examples[version][type];
}

/**
 * Basic validation for browser (lightweight)
 * @param {Object} data - Data to validate
 * @param {string} version - Schema version (optional, uses latest if not specified)
 * @returns {Object} Validation result { valid: boolean, errors?: Array }
 */
function validate(data, version = null) {
  const targetVersion = version || registry.latest;
  
  // Basic validation - can be extended with full JSON Schema validation if needed
  if (targetVersion === '0.1.0') {
    const errors = [];
    
    if (!data || typeof data !== 'object') {
      errors.push({ message: 'Data must be an object' });
      return { valid: false, errors };
    }
    
    if (!data.$schema) errors.push({ message: 'Missing required property: $schema' });
    if (!data.specVersion) errors.push({ message: 'Missing required property: specVersion' });
    if (data.specVersion !== '0.1.0') errors.push({ message: 'Invalid specVersion, expected "0.1.0"' });
    
    if (!data.meta || typeof data.meta !== 'object') {
      errors.push({ message: 'Missing required property: meta' });
    } else if (!data.meta.language) {
      errors.push({ message: 'Missing required property: meta.language' });
    }
    
    if (!data.resume || typeof data.resume !== 'object') {
      errors.push({ message: 'Missing required property: resume' });
    } else if (!data.resume.basics || typeof data.resume.basics !== 'object') {
      errors.push({ message: 'Missing required property: resume.basics' });
    } else {
      const basics = data.resume.basics;
      if (!basics.firstName) errors.push({ message: 'Missing required property: resume.basics.firstName' });
      if (!basics.lastName) errors.push({ message: 'Missing required property: resume.basics.lastName' });
      if (!basics.email) errors.push({ message: 'Missing required property: resume.basics.email' });
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  }
  
  return { valid: true, errors: null };
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = {
    getSchema,
    getLatestSchema,
    getAvailableVersions,
    getVersionMetadata,
    getExample,
    validate,
    registry
  };
}

if (typeof window !== 'undefined') {
  // Browser global
  window.VitaeFlowSchema = {
    getSchema,
    getLatestSchema,
    getAvailableVersions,
    getVersionMetadata,
    getExample,
    validate,
    registry
  };
}

// ES Module exports (for bundlers)
export {
  getSchema,
  getLatestSchema,
  getAvailableVersions,
  getVersionMetadata,
  getExample,
  validate,
  registry
};
`;

// Write browser.js
const browserJsPath = path.join(__dirname, '../browser.js');
fs.writeFileSync(browserJsPath, browserJsContent, 'utf8');

console.log('✅ Browser build generated successfully!');
console.log(`📁 Output: ${browserJsPath}`);
console.log(`📊 Schemas: ${Object.keys(schemas).length} versions`);
console.log(`📋 Examples: ${Object.values(examples).reduce((total, vExamples) => total + Object.keys(vExamples).length, 0)} total`);
console.log(`📦 Size: ${Math.round(fs.statSync(browserJsPath).size / 1024)}KB`);