# @vitaeflow/vitae-schema

Official JSON Schema specification for VitaeFlow resume standard - Pure JSON, multi-language compatible.

[![npm version](https://badge.fury.io/js/@vitaeflow%2Fvitae-schema.svg)](https://badge.fury.io/js/@vitaeflow%2Fvitae-schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

VitaeFlow is a modern, ATS-friendly JSON schema for structured resume data. This package provides the official schema definitions, validation tools, and examples for integrating VitaeFlow into your applications.

## Features

- 📄 **JSON Schema Draft-07** compliant
- 🎯 **ATS-optimized** structure for maximum compatibility
- 🌐 **Multi-language** support with i18n considerations
- 📦 **TypeScript** support with full type definitions
- ✅ **Validation** tools included
- 📚 **Examples** for minimal and complete resumes
- 🔄 **Version management** with migration support

## Installation

```bash
npm install @vitaeflow/vitae-schema
```

## Quick Start

### Programmatic Usage

```javascript
const { getLatestSchema, validate, getExample } = require('@vitaeflow/vitae-schema');

// Get the latest schema
const schema = getLatestSchema();

// Validate resume data
const resumeData = {
  specVersion: "0.1.0",
  meta: { language: "en", country: "US" },
  resume: {
    basics: {
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@example.com"
    },
    experience: [{
      position: "Software Engineer",
      company: "Tech Corp",
      startDate: "2022-01-01"
    }]
  }
};

const result = validate(resumeData);
if (result.valid) {
  console.log('✅ Resume is valid!');
} else {
  console.log('❌ Validation errors:', result.errors);
}

// Get examples
const minimalExample = getExample('0.1.0', 'minimal');
const completeExample = getExample('0.1.0', 'complete');
```

### TypeScript Usage

```typescript
import { getLatestSchema, validate, ValidationResult } from '@vitaeflow/vitae-schema';

const schema = getLatestSchema();
const result: ValidationResult = validate(resumeData);
```

## API Reference

### Core Functions

#### `getLatestSchema(): object`
Returns the latest schema version.

#### `getSchema(version: string): object`
Returns a specific schema version.

```javascript
const schema = getSchema('0.1.0');
```

#### `validate(data: object, version?: string): ValidationResult`
Validates resume data against the schema.

```javascript
const result = validate(resumeData, '0.1.0');
// Returns: { valid: boolean, errors?: Array }
```

#### `getExample(version: string, type: 'minimal' | 'complete'): object`
Returns example data for a schema version.

```javascript
const example = getExample('0.1.0', 'complete');
```

#### `getAvailableVersions(): string[]`
Returns all available schema versions.

#### `getVersionMetadata(version: string): object`
Returns metadata for a specific version.

## Schema Structure

The VitaeFlow schema includes the following main sections:

### Required Fields
- `specVersion` - Schema version
- `meta.language` - Language code (ISO 639-1)
- `meta.country` - Country code (ISO 3166-1 alpha-2)
- `resume.basics.firstName` - First name
- `resume.basics.lastName` - Last name
- `resume.basics.email` - Email address
- `resume.experience[]` - At least one work experience

### Optional Sections
- `meta` - Metadata (id, timestamps, source)
- `resume.basics` - Personal information and contact details
- `resume.experience[]` - Work experience with achievements and metrics
- `resume.education[]` - Educational background
- `resume.skills` - Technical, soft skills, and languages
- `resume.projects[]` - Personal and professional projects
- `resume.certifications[]` - Professional certifications
- `resume.achievements[]` - Awards and recognitions
- `resume.publications[]` - Articles and publications
- `resume.volunteer[]` - Volunteer work and community involvement

## Examples

### Minimal Resume

```json
{
  "$schema": "https://vitaeflow.github.io/vitaeflow-schemas/schemas/v0.1.0/vitaeflow.schema.json",
  "specVersion": "0.1.0",
  "meta": {
    "language": "en",
    "country": "US"
  },
  "resume": {
    "basics": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com"
    },
    "experience": [{
      "position": "Software Engineer",
      "company": "Tech Corp",
      "startDate": "2022-01-01"
    }]
  }
}
```

See the [examples directory](./schemas/v0.1.0/examples/) for complete examples.

## Validation

### Using the CLI

```bash
# Validate all examples
npm test

# Validate specific schema
npm run validate-schema

# Check package integrity
npm run prepack
```

### Custom Validation

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { getSchema } = require('@vitaeflow/vitae-schema');

const ajv = new Ajv({ strict: true, allErrors: true });
addFormats(ajv);

const schema = getSchema('0.1.0');
const validate = ajv.compile(schema);
const valid = validate(resumeData);

if (!valid) {
  console.log(validate.errors);
}
```

## Version Management

The package follows semantic versioning and includes a registry of all available schema versions:

```javascript
const { registry, getVersionMetadata } = require('@vitaeflow/vitae-schema');

console.log('Latest version:', registry.latest);
console.log('All versions:', registry.versions);

const metadata = getVersionMetadata('0.1.0');
console.log('Version info:', metadata);
```

## ATS Optimization

VitaeFlow is designed with ATS (Applicant Tracking System) compatibility in mind:

- **Structured data** for reliable parsing
- **Standard field names** recognized by major ATS platforms
- **Flexible arrays** for multiple experiences, educations, etc.
- **Consistent date formats** (ISO 8601)
- **Metadata tracking** for audit trails
- **Performance constraints** (maxItems, maxLength) for large datasets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Validate schema integrity
npm run validate-schema

# Build package
npm run prepack
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [VitaeFlow Website](https://vitaeflow.org)
- [GitHub Repository](https://github.com/vitaeflow/vitae-schema)
- [NPM Package](https://www.npmjs.com/package/@vitaeflow/vitae-schema)
- [Issues](https://github.com/vitaeflow/vitae-schema/issues)

## Support

For questions and support:
- 📧 Email: hello@vitaeflow.org
- 💬 GitHub Issues: [Report a bug or request a feature](https://github.com/vitaeflow/vitae-schema/issues)
- 📖 Documentation: [Full documentation](https://vitaeflow.org/docs)

---

Made with ❤️ by the VitaeFlow team