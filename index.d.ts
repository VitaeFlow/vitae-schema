export interface SchemaRegistry {
  latest: string;
  versions: Array<{
    version: string;
    status: string;
    releaseDate: string;
    deprecated: boolean;
    deprecationMessage?: string;
    changelog: string;
  }>;
}

export interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    instancePath: string;
    schemaPath: string;
    keyword: string;
    params: any;
    message?: string;
  }> | null;
}

/**
 * Get schema by version
 * @param version Schema version (e.g., "0.1.0")
 * @returns Schema JSON object
 */
export function getSchema(version: string): any;

/**
 * Get latest schema version
 * @returns Latest schema JSON object
 */
export function getLatestSchema(): any;

/**
 * Get all available versions
 * @returns Array of available versions
 */
export function getAvailableVersions(): string[];

/**
 * Get version metadata
 * @param version Schema version
 * @returns Version metadata
 */
export function getVersionMetadata(version: string): {
  version: string;
  status: string;
  releaseDate: string;
  deprecated: boolean;
  deprecationMessage?: string;
  changelog: string;
};

/**
 * Get example for a specific version
 * @param version Schema version
 * @param type Example type ("minimal" or "complete")
 * @returns Example JSON object
 */
export function getExample(version: string, type?: 'minimal' | 'complete'): any;

/**
 * Validate data against schema
 * @param data Data to validate
 * @param version Schema version (optional, uses latest if not specified)
 * @returns Validation result
 */
export function validate(data: any, version?: string | null): ValidationResult;

/**
 * Schema registry containing version information
 */
export const registry: SchemaRegistry;