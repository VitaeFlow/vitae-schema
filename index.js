const fs = require('fs');
const path = require('path');

// Load registry
const registry = require('./registry.json');

/**
 * Get schema by version
 * @param {string} version - Schema version (e.g., "0.1.0")
 * @returns {Object} Schema JSON object
 */
function getSchema(version) {
  const schemaPath = path.join(__dirname, 'schemas', `v${version}`, 'vitaeflow.schema.json');
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema version ${version} not found`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
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
    throw new Error(`Version ${version} not found in registry`);
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
  const examplePath = path.join(__dirname, 'schemas', `v${version}`, 'examples', `${type}.json`);
  if (!fs.existsSync(examplePath)) {
    throw new Error(`Example ${type} for version ${version} not found`);
  }
  return JSON.parse(fs.readFileSync(examplePath, 'utf8'));
}

/**
 * Validate data against schema
 * @param {Object} data - Data to validate
 * @param {string} version - Schema version (optional, uses latest if not specified)
 * @returns {Object} Validation result { valid: boolean, errors?: Array }
 */
function validate(data, version = null) {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');
  
  const ajv = new Ajv({ strict: true, allErrors: true });
  addFormats(ajv);
  
  const schema = version ? getSchema(version) : getLatestSchema();
  const validateFn = ajv.compile(schema);
  const valid = validateFn(data);
  
  return {
    valid,
    errors: valid ? null : validateFn.errors
  };
}

module.exports = {
  getSchema,
  getLatestSchema,
  getAvailableVersions,
  getVersionMetadata,
  getExample,
  validate,
  registry
};