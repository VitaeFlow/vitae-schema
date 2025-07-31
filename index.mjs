import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load registry
const registry = JSON.parse(fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8'));

/**
 * Get schema by version
 * @param {string} version - Schema version (e.g., "0.1.0")
 * @returns {Object} Schema JSON object
 */
export function getSchema(version) {
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
export function getLatestSchema() {
  const latestVersion = registry.latest;
  return getSchema(latestVersion);
}

/**
 * Get all available versions
 * @returns {Array<string>} Array of available versions
 */
export function getAvailableVersions() {
  return registry.versions.map(v => v.version);
}

/**
 * Get version metadata
 * @param {string} version - Schema version
 * @returns {Object} Version metadata
 */
export function getVersionMetadata(version) {
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
export function getExample(version, type = 'minimal') {
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
export async function validate(data, version = null) {
  const Ajv = (await import('ajv')).default;
  const addFormats = (await import('ajv-formats')).default;
  
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

export { registry };
export default {
  getSchema,
  getLatestSchema,
  getAvailableVersions,
  getVersionMetadata,
  getExample,
  validate,
  registry
};