/**
 * Browser-compatible VitaeFlow Schema
 * Auto-generated from schema files - DO NOT EDIT MANUALLY
 * Generated on: 2025-07-31T14:43:45.334Z
 */

// Registry loaded from registry.json
const registry = {
  "latest": "0.1.0",
  "versions": [
    {
      "version": "0.1.0",
      "status": "stable",
      "releaseDate": "2025-07-31",
      "deprecated": false,
      "deprecationMessage": null,
      "changelog": "Initial release of VitaeFlow schema with comprehensive resume structure"
    }
  ],
  "schemas": {
    "v0.1.0": {
      "path": "schemas/v0.1.0/vitaeflow.schema.json",
      "metadata": "schemas/v0.1.0/metadata.json"
    }
  }
};

// Schemas loaded from /schemas directory
const schemas = {
  "0.1.0": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://vitaeflow.github.io/vitaeflow-schemas/schemas/v0.1.0/vitaeflow.schema.json",
    "title": "VitaeFlow Resume Schema",
    "description": "Official JSON Schema for VitaeFlow structured resume standard (v0.1.0). This schema defines a comprehensive, ATS-friendly format for embedding structured resume data in PDFs.",
    "type": "object",
    "required": [
      "$schema",
      "specVersion",
      "meta",
      "resume"
    ],
    "additionalProperties": true,
    "properties": {
      "$schema": {
        "type": "string",
        "format": "uri",
        "description": "URI pointing to the JSON Schema specification used for validation"
      },
      "specVersion": {
        "type": "string",
        "const": "0.1.0",
        "description": "Version of the VitaeFlow specification this resume conforms to"
      },
      "meta": {
        "type": "object",
        "description": "Metadata about the resume document itself, including versioning, localization, and tracking information",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unique identifier for this resume document, useful for tracking and deduplication"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 timestamp when this resume was first created"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 timestamp when this resume was last modified"
          },
          "source": {
            "type": "string",
            "description": "Application or system that generated this resume (e.g., 'vitaeflow-builder', 'linkedin-export')"
          },
          "version": {
            "type": "string",
            "description": "Internal version number of this specific resume document"
          },
          "canonical": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL where the authoritative version of this resume can be found"
          },
          "lastModified": {
            "type": "string",
            "format": "date-time",
            "description": "ISO 8601 timestamp of the last modification (deprecated, use updatedAt instead)"
          },
          "language": {
            "type": "string",
            "pattern": "^[a-z]{2}(-[A-Z]{2})?$",
            "description": "Primary language of the resume content using BCP 47 language tags (e.g., 'en', 'fr-FR')"
          },
          "country": {
            "type": "string",
            "pattern": "^[A-Z]{2}$",
            "description": "ISO 3166-1 alpha-2 country code representing the target job market or candidate location"
          }
        },
        "required": [],
        "additionalProperties": false
      },
      "resume": {
        "type": "object",
        "description": "Complete resume information organized into logical sections for optimal ATS parsing and human readability",
        "required": [
          "basics",
          "experience"
        ],
        "additionalProperties": false,
        "properties": {
          "basics": {
            "type": "object",
            "description": "Essential personal and contact information, the foundation of any resume",
            "required": [
              "lastName",
              "firstName",
              "email"
            ],
            "properties": {
              "lastName": {
                "type": "string",
                "description": "Family name or surname of the candidate"
              },
              "firstName": {
                "type": "string",
                "description": "Given name or first name of the candidate"
              },
              "label": {
                "type": "string",
                "description": "Professional title or role description (e.g., 'Senior Software Engineer', 'Marketing Manager')"
              },
              "pronouns": {
                "type": "string",
                "description": "Preferred pronouns for the candidate (e.g., 'she/her', 'they/them')"
              },
              "title": {
                "type": "string",
                "description": "Current job title or desired position"
              },
              "email": {
                "type": "string",
                "format": "email",
                "description": "Primary email address for professional contact"
              },
              "phone": {
                "type": "string",
                "description": "Primary phone number, preferably in international format"
              },
              "url": {
                "type": "string",
                "format": "uri",
                "description": "Personal website, portfolio, or professional landing page URL"
              },
              "summary": {
                "type": "string",
                "description": "Professional summary or objective statement, typically 2-4 sentences highlighting key qualifications"
              },
              "birthDate": {
                "$ref": "#/$defs/isoDate",
                "description": "Date of birth in ISO format (YYYY-MM-DD). Include only if legally required or culturally expected"
              },
              "nationality": {
                "type": "string",
                "pattern": "^[A-Z]{2}$",
                "description": "ISO 3166-1 alpha-2 country code representing candidate's nationality"
              },
              "maritalStatus": {
                "type": "string",
                "description": "Marital status if relevant for the position or jurisdiction (e.g., 'single', 'married', 'divorced')"
              },
              "drivingLicense": {
                "type": "string",
                "description": "Driving license information if relevant for the role (e.g., 'Valid US Driver's License', 'EU Category B')"
              },
              "location": {
                "$ref": "#/$defs/location",
                "description": "Current residential location of the candidate"
              },
              "availability": {
                "type": "object",
                "description": "Information about when the candidate can start working",
                "properties": {
                  "immediateStart": {
                    "type": "boolean",
                    "description": "Whether the candidate can start immediately"
                  },
                  "noticePeriod": {
                    "type": "string",
                    "description": "Required notice period for current employment (e.g., '2 weeks', '1 month')"
                  },
                  "preferredStartDate": {
                    "$ref": "#/$defs/isoDate",
                    "description": "Earliest preferred start date"
                  }
                },
                "additionalProperties": false
              },
              "profiles": {
                "type": "array",
                "description": "Social media and professional network profiles",
                "items": {
                  "type": "object",
                  "required": [
                    "network",
                    "url"
                  ],
                  "properties": {
                    "network": {
                      "type": "string",
                      "description": "Name of the social network or platform (e.g., 'LinkedIn', 'GitHub', 'Twitter')"
                    },
                    "username": {
                      "type": "string",
                      "description": "Username or handle on the platform"
                    },
                    "url": {
                      "type": "string",
                      "format": "uri",
                      "description": "Full URL to the profile page"
                    }
                  },
                  "additionalProperties": false
                }
              }
            },
            "additionalProperties": false
          },
          "experience": {
            "type": "array",
            "description": "Professional work experience, the core section that ATS systems focus on most heavily",
            "minItems": 1,
            "maxItems": 10,
            "items": {
              "type": "object",
              "required": [
                "position",
                "company",
                "startDate"
              ],
              "properties": {
                "position": {
                  "type": "string",
                  "description": "Job title or role name"
                },
                "company": {
                  "type": "string",
                  "description": "Company, organization, or employer name"
                },
                "contractType": {
                  "type": "string",
                  "description": "Type of employment contract (e.g., 'Full-time', 'Part-time', 'Contract', 'Internship')"
                },
                "startDate": {
                  "$ref": "#/$defs/isoDate",
                  "description": "Employment start date"
                },
                "endDate": {
                  "$ref": "#/$defs/isoDate",
                  "description": "Employment end date (omit if current position)"
                },
                "current": {
                  "type": "boolean",
                  "default": false,
                  "description": "Whether this is the candidate's current position"
                },
                "remote": {
                  "type": "boolean",
                  "description": "Whether this position was/is remote work"
                },
                "teamSize": {
                  "type": "number",
                  "minimum": 1,
                  "description": "Size of the team the candidate worked with or managed"
                },
                "location": {
                  "$ref": "#/$defs/location",
                  "description": "Geographic location where the work was performed"
                },
                "summary": {
                  "type": "string",
                  "maxLength": 2000,
                  "description": "Brief description of the role and key responsibilities, optimized for ATS parsing"
                },
                "highlights": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Key accomplishments and achievements in bullet-point format"
                },
                "technologies": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Technologies, tools, programming languages, or methodologies used in this role"
                },
                "achievements": {
                  "type": "array",
                  "description": "Quantified achievements with measurable impact",
                  "items": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "string",
                        "description": "Description of the achievement"
                      },
                      "metrics": {
                        "type": "object",
                        "description": "Quantifiable metrics associated with this achievement",
                        "properties": {
                          "value": {
                            "type": "number",
                            "description": "Numeric value of the metric"
                          },
                          "unit": {
                            "type": "string",
                            "description": "Unit of measurement (e.g., '%', '$', 'users', 'hours')"
                          },
                          "context": {
                            "type": "string",
                            "description": "Additional context about the metric"
                          }
                        },
                        "additionalProperties": false
                      }
                    },
                    "additionalProperties": false
                  }
                },
                "labels": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Tags or categories that help classify this experience"
                },
                "projects": {
                  "type": "array",
                  "description": "Specific projects worked on during this employment",
                  "items": {
                    "$ref": "#/$defs/projectItem"
                  }
                }
              },
              "additionalProperties": false
            }
          },
          "education": {
            "type": "array",
            "description": "Educational background including formal degrees, certifications, and relevant coursework",
            "items": {
              "$ref": "#/$defs/educationItem"
            }
          },
          "skills": {
            "type": "object",
            "description": "Comprehensive skills inventory organized by category for optimal ATS keyword matching",
            "properties": {
              "technical": {
                "type": "array",
                "description": "Technical skills including programming languages, frameworks, tools, and technologies",
                "items": {
                  "type": "object",
                  "required": [
                    "name"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the technical skill"
                    },
                    "level": {
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced",
                        "expert"
                      ],
                      "description": "Proficiency level with this skill"
                    },
                    "yearsOfExperience": {
                      "type": "number",
                      "minimum": 0,
                      "description": "Number of years of experience with this skill"
                    },
                    "category": {
                      "type": "string",
                      "enum": [
                        "programming",
                        "framework",
                        "database",
                        "tool",
                        "cloud",
                        "other"
                      ],
                      "description": "Category classification for better organization"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "soft": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "description": "Soft skills and interpersonal abilities (e.g., 'Leadership', 'Communication', 'Problem Solving')"
              },
              "languages": {
                "type": "array",
                "items": {
                  "$ref": "#/$defs/languageItem"
                },
                "description": "Spoken and written language proficiencies"
              }
            },
            "additionalProperties": false
          },
          "projects": {
            "type": "array",
            "description": "Standalone projects that demonstrate skills and experience, applicable across all industries and roles",
            "items": {
              "type": "object",
              "required": [
                "name",
                "description"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Project name or title"
                },
                "description": {
                  "type": "string",
                  "description": "Comprehensive description of the project, its goals, and outcomes"
                },
                "role": {
                  "type": "string",
                  "description": "Your specific role or contribution to the project"
                },
                "startDate": {
                  "$ref": "#/$defs/isoDate",
                  "description": "Project start date"
                },
                "endDate": {
                  "$ref": "#/$defs/isoDate",
                  "description": "Project completion date"
                },
                "status": {
                  "type": "string",
                  "enum": [
                    "completed",
                    "ongoing",
                    "paused",
                    "cancelled"
                  ],
                  "description": "Current status of the project"
                },
                "context": {
                  "type": "string",
                  "enum": [
                    "work",
                    "personal",
                    "volunteer",
                    "academic",
                    "freelance"
                  ],
                  "description": "Context in which the project was undertaken"
                },
                "url": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to project website, demo, or documentation"
                },
                "repository": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to source code repository (e.g., GitHub, GitLab)"
                },
                "technologies": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Technologies, tools, or methodologies used in the project"
                },
                "teamSize": {
                  "type": "number",
                  "minimum": 1,
                  "description": "Number of people involved in the project"
                },
                "budget": {
                  "type": "number",
                  "minimum": 0,
                  "description": "Project budget if applicable and relevant to showcase"
                },
                "metrics": {
                  "type": "object",
                  "description": "Quantifiable outcomes and impact metrics",
                  "properties": {
                    "participants": {
                      "type": "number",
                      "description": "Number of participants, users, or beneficiaries"
                    },
                    "revenue": {
                      "type": "number",
                      "description": "Revenue generated or cost savings achieved"
                    },
                    "savings": {
                      "type": "number",
                      "description": "Cost savings or efficiency improvements"
                    },
                    "efficiency": {
                      "type": "string",
                      "description": "Efficiency improvements or performance gains"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            }
          },
          "certifications": {
            "type": "array",
            "description": "Professional certifications, licenses, and credentials",
            "items": {
              "$ref": "#/$defs/certificationItem"
            }
          },
          "achievements": {
            "type": "array",
            "description": "Awards, honors, and significant recognitions received",
            "items": {
              "$ref": "#/$defs/achievementItem"
            }
          },
          "publications": {
            "type": "array",
            "description": "Published works including articles, books, research papers, and blog posts",
            "items": {
              "$ref": "#/$defs/publicationItem"
            }
          },
          "volunteer": {
            "type": "array",
            "description": "Volunteer work and community involvement",
            "items": {
              "$ref": "#/$defs/experienceItem"
            }
          }
        }
      }
    },
    "$defs": {
      "isoDate": {
        "type": "string",
        "pattern": "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12][0-9]|3[01]))?$",
        "description": "Flexible ISO date format supporting YYYY, YYYY-MM, or YYYY-MM-DD for compatibility with various date precision needs"
      },
      "location": {
        "type": "object",
        "description": "Geographic location information",
        "properties": {
          "city": {
            "type": "string",
            "description": "City or municipality name"
          },
          "region": {
            "type": "string",
            "description": "State, province, or regional subdivision"
          },
          "country": {
            "type": "string",
            "pattern": "^[A-Z]{2}$",
            "description": "ISO 3166-1 alpha-2 country code"
          }
        },
        "additionalProperties": false
      },
      "educationItem": {
        "type": "object",
        "description": "Individual education record including degrees, certifications, and relevant coursework",
        "properties": {
          "institution": {
            "type": "string",
            "description": "Name of the educational institution"
          },
          "area": {
            "type": "string",
            "description": "Field of study or academic discipline"
          },
          "studyType": {
            "type": "string",
            "description": "Type of degree or qualification (e.g., 'Bachelor of Science', 'Master's', 'PhD')"
          },
          "startDate": {
            "$ref": "#/$defs/isoDate",
            "description": "Start date of the educational program"
          },
          "endDate": {
            "$ref": "#/$defs/isoDate",
            "description": "Graduation or completion date"
          },
          "gpa": {
            "type": "number",
            "description": "Grade point average or equivalent academic performance metric"
          },
          "courses": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Relevant courses or subjects studied"
          },
          "location": {
            "$ref": "#/$defs/location",
            "description": "Location of the educational institution"
          },
          "summary": {
            "type": "string",
            "description": "Additional details about the educational experience"
          },
          "highlights": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Academic achievements, honors, or notable accomplishments"
          }
        },
        "additionalProperties": false
      },
      "languageItem": {
        "type": "object",
        "description": "Language proficiency information",
        "properties": {
          "code": {
            "type": "string",
            "description": "BCP 47 language code (e.g., 'en', 'fr', 'es-ES')"
          },
          "fluency": {
            "type": "string",
            "description": "Proficiency level (e.g., 'Native', 'Fluent', 'Conversational', 'Basic')"
          }
        },
        "required": [
          "code"
        ],
        "additionalProperties": false
      },
      "projectItem": {
        "type": "object",
        "description": "Project information that can be embedded within experience items",
        "properties": {
          "name": {
            "type": "string",
            "description": "Project name or title"
          },
          "description": {
            "type": "string",
            "description": "Brief description of the project and your contribution"
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "URL to project documentation, demo, or repository"
          }
        },
        "additionalProperties": false
      },
      "achievementItem": {
        "type": "object",
        "description": "Awards, honors, and recognitions",
        "properties": {
          "title": {
            "type": "string",
            "description": "Name or title of the award or achievement"
          },
          "date": {
            "$ref": "#/$defs/isoDate",
            "description": "Date the award was received or achievement was accomplished"
          },
          "awarder": {
            "type": "string",
            "description": "Organization or entity that granted the award"
          },
          "summary": {
            "type": "string",
            "description": "Description of the achievement and its significance"
          }
        },
        "additionalProperties": false
      },
      "certificationItem": {
        "type": "object",
        "description": "Professional certifications and credentials",
        "properties": {
          "name": {
            "type": "string",
            "description": "Full name of the certification"
          },
          "issuer": {
            "type": "string",
            "description": "Organization that issued the certification"
          },
          "date": {
            "$ref": "#/$defs/isoDate",
            "description": "Date the certification was obtained"
          },
          "expiryDate": {
            "$ref": "#/$defs/isoDate",
            "description": "Certification expiration date, if applicable"
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "URL to verify the certification or view credentials"
          }
        },
        "additionalProperties": false
      },
      "publicationItem": {
        "type": "object",
        "description": "Published works and scholarly contributions",
        "properties": {
          "name": {
            "type": "string",
            "description": "Title of the publication"
          },
          "publisher": {
            "type": "string",
            "description": "Publisher, journal, or platform where the work was published"
          },
          "releaseDate": {
            "$ref": "#/$defs/isoDate",
            "description": "Publication date"
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "URL to access the publication"
          },
          "summary": {
            "type": "string",
            "description": "Brief description of the publication and its relevance"
          }
        },
        "additionalProperties": false
      },
      "experienceItem": {
        "type": "object",
        "description": "Generic experience item used for volunteer work and similar activities",
        "required": [
          "position",
          "company",
          "startDate"
        ],
        "properties": {
          "position": {
            "type": "string",
            "description": "Role or position title"
          },
          "company": {
            "type": "string",
            "description": "Organization or company name"
          },
          "contractType": {
            "type": "string",
            "description": "Type of arrangement (e.g., 'Volunteer', 'Part-time', 'Contract')"
          },
          "startDate": {
            "$ref": "#/$defs/isoDate",
            "description": "Start date of the engagement"
          },
          "endDate": {
            "$ref": "#/$defs/isoDate",
            "description": "End date of the engagement"
          },
          "current": {
            "type": "boolean",
            "default": false,
            "description": "Whether this is an ongoing engagement"
          },
          "location": {
            "$ref": "#/$defs/location",
            "description": "Location where the activity took place"
          },
          "summary": {
            "type": "string",
            "description": "Description of responsibilities and contributions"
          },
          "highlights": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Key accomplishments and achievements"
          },
          "labels": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Tags or categories for this experience"
          },
          "projects": {
            "type": "array",
            "items": {
              "$ref": "#/$defs/projectItem"
            },
            "description": "Specific projects undertaken during this engagement"
          }
        },
        "additionalProperties": true
      }
    }
  }
};

// Examples loaded from /schemas/*/examples
const examples = {
  "0.1.0": {
    "complete": {
      "$schema": "https://vitaeflow.github.io/vitaeflow-schemas/schemas/v0.1.0/vitaeflow.schema.json",
      "specVersion": "0.1.0",
      "meta": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "createdAt": "2025-01-15T10:00:00Z",
        "updatedAt": "2025-01-15T14:30:00Z",
        "source": "vitaeflow-builder",
        "version": "1.2.0",
        "canonical": "https://portfolio.example.com/resume",
        "language": "en-US",
        "country": "US"
      },
      "resume": {
        "basics": {
          "firstName": "Alexandra",
          "lastName": "Rodriguez",
          "label": "Senior Full-Stack Developer",
          "pronouns": "she/her",
          "title": "Lead Software Engineer",
          "email": "alexandra.rodriguez@example.com",
          "phone": "+1-555-0123",
          "url": "https://alexandra-dev.com",
          "summary": "Experienced full-stack developer with 8+ years building scalable web applications. Passionate about clean code, team leadership, and emerging technologies. Proven track record of delivering high-impact projects that drive business growth.",
          "birthDate": "1990-03-15",
          "nationality": "US",
          "maritalStatus": "married",
          "drivingLicense": "Valid US Driver's License",
          "location": {
            "city": "San Francisco",
            "region": "California",
            "country": "US"
          },
          "availability": {
            "immediateStart": false,
            "noticePeriod": "2 weeks",
            "preferredStartDate": "2025-02-15"
          },
          "profiles": [
            {
              "network": "LinkedIn",
              "username": "alexandra-rodriguez-dev",
              "url": "https://linkedin.com/in/alexandra-rodriguez-dev"
            },
            {
              "network": "GitHub",
              "username": "alex-codes",
              "url": "https://github.com/alex-codes"
            },
            {
              "network": "Twitter",
              "username": "alexdev",
              "url": "https://twitter.com/alexdev"
            }
          ]
        },
        "experience": [
          {
            "position": "Senior Full-Stack Developer",
            "company": "InnovateTech Solutions",
            "contractType": "Full-time",
            "startDate": "2021-03-01",
            "endDate": "2024-12-31",
            "current": false,
            "remote": true,
            "teamSize": 8,
            "location": {
              "city": "San Francisco",
              "region": "California",
              "country": "US"
            },
            "summary": "Led development of microservices architecture serving 2M+ users. Architected and implemented scalable e-commerce platform resulting in 40% performance improvement. Mentored junior developers and established coding standards.",
            "highlights": [
              "Architected microservices platform handling 10M+ requests/day",
              "Led team of 8 developers across 3 different time zones",
              "Reduced deployment time from 2 hours to 15 minutes through CI/CD optimization",
              "Implemented real-time analytics dashboard improving decision-making speed by 60%"
            ],
            "technologies": [
              "React",
              "Node.js",
              "TypeScript",
              "AWS",
              "Docker",
              "Kubernetes",
              "PostgreSQL",
              "Redis",
              "GraphQL",
              "Jest"
            ],
            "achievements": [
              {
                "description": "Increased platform performance and reduced server costs",
                "metrics": {
                  "value": 40,
                  "unit": "%",
                  "context": "performance improvement"
                }
              },
              {
                "description": "Reduced customer acquisition cost through UX improvements",
                "metrics": {
                  "value": 25,
                  "unit": "%",
                  "context": "cost reduction"
                }
              }
            ],
            "labels": [
              "leadership",
              "architecture",
              "performance-optimization"
            ],
            "projects": [
              {
                "name": "Real-time Analytics Dashboard",
                "description": "Built comprehensive analytics platform for business intelligence",
                "url": "https://github.com/alex-codes/analytics-dashboard"
              },
              {
                "name": "Microservices Migration",
                "description": "Led migration from monolith to microservices architecture",
                "url": "https://blog.innovatetech.com/microservices-migration"
              }
            ]
          },
          {
            "position": "Full-Stack Developer",
            "company": "StartupXYZ",
            "contractType": "Full-time",
            "startDate": "2019-06-01",
            "endDate": "2021-02-28",
            "current": false,
            "remote": false,
            "teamSize": 4,
            "location": {
              "city": "Palo Alto",
              "region": "California",
              "country": "US"
            },
            "summary": "Developed core features for fintech application serving small businesses. Built responsive web application and RESTful APIs. Collaborated closely with product and design teams to deliver user-centric solutions.",
            "highlights": [
              "Developed payment processing system handling $50M+ annually",
              "Built responsive web app supporting 50,000+ active users",
              "Implemented OAuth 2.0 authentication and authorization system",
              "Optimized database queries reducing average response time by 70%"
            ],
            "technologies": [
              "Vue.js",
              "Python",
              "Django",
              "PostgreSQL",
              "Stripe API",
              "AWS",
              "Docker",
              "Nginx"
            ],
            "achievements": [
              {
                "description": "Improved application response time through database optimization",
                "metrics": {
                  "value": 70,
                  "unit": "%",
                  "context": "response time reduction"
                }
              }
            ],
            "labels": [
              "fintech",
              "api-development",
              "database-optimization"
            ]
          },
          {
            "position": "Junior Software Developer",
            "company": "WebDev Agency",
            "contractType": "Full-time",
            "startDate": "2017-09-01",
            "endDate": "2019-05-31",
            "current": false,
            "remote": false,
            "teamSize": 6,
            "location": {
              "city": "Los Angeles",
              "region": "California",
              "country": "US"
            },
            "summary": "Developed custom websites and web applications for diverse clients. Gained experience in multiple programming languages and frameworks. Contributed to all phases of software development lifecycle.",
            "highlights": [
              "Delivered 25+ client projects with 98% satisfaction rate",
              "Developed e-commerce solutions generating $2M+ in client revenue",
              "Mentored 3 new developers and established onboarding procedures",
              "Improved team productivity by implementing Agile development practices"
            ],
            "technologies": [
              "PHP",
              "Laravel",
              "JavaScript",
              "jQuery",
              "MySQL",
              "WordPress",
              "Shopify"
            ],
            "labels": [
              "client-work",
              "e-commerce",
              "mentoring"
            ]
          }
        ],
        "education": [
          {
            "institution": "Stanford University",
            "area": "Computer Science",
            "studyType": "Master of Science",
            "startDate": "2015-09",
            "endDate": "2017-06",
            "gpa": 3.8,
            "courses": [
              "Advanced Algorithms",
              "Machine Learning",
              "Database Systems",
              "Software Engineering",
              "Computer Networks",
              "Artificial Intelligence"
            ],
            "location": {
              "city": "Stanford",
              "region": "California",
              "country": "US"
            },
            "summary": "Focused on software engineering and distributed systems. Completed thesis on microservices architecture patterns.",
            "highlights": [
              "Dean's List for 3 consecutive semesters",
              "Teaching Assistant for CS106A Programming Methodology",
              "Published research paper on distributed systems performance",
              "President of Computer Science Graduate Student Association"
            ]
          },
          {
            "institution": "University of California, Berkeley",
            "area": "Computer Science",
            "studyType": "Bachelor of Science",
            "startDate": "2011-08",
            "endDate": "2015-05",
            "gpa": 3.6,
            "courses": [
              "Data Structures",
              "Computer Architecture",
              "Operating Systems",
              "Software Development",
              "Discrete Mathematics"
            ],
            "location": {
              "city": "Berkeley",
              "region": "California",
              "country": "US"
            },
            "summary": "Strong foundation in computer science fundamentals with emphasis on practical software development.",
            "highlights": [
              "Graduated Magna Cum Laude",
              "Member of Upsilon Pi Epsilon Honor Society",
              "Hackathon winner - built mobile app for campus navigation",
              "Volunteer tutor for introductory programming courses"
            ]
          }
        ],
        "skills": {
          "technical": [
            {
              "name": "JavaScript",
              "level": "expert",
              "yearsOfExperience": 8,
              "category": "programming"
            },
            {
              "name": "TypeScript",
              "level": "expert",
              "yearsOfExperience": 5,
              "category": "programming"
            },
            {
              "name": "Python",
              "level": "advanced",
              "yearsOfExperience": 6,
              "category": "programming"
            },
            {
              "name": "React",
              "level": "expert",
              "yearsOfExperience": 6,
              "category": "framework"
            },
            {
              "name": "Node.js",
              "level": "expert",
              "yearsOfExperience": 7,
              "category": "framework"
            },
            {
              "name": "Vue.js",
              "level": "advanced",
              "yearsOfExperience": 4,
              "category": "framework"
            },
            {
              "name": "PostgreSQL",
              "level": "advanced",
              "yearsOfExperience": 6,
              "category": "database"
            },
            {
              "name": "MongoDB",
              "level": "intermediate",
              "yearsOfExperience": 3,
              "category": "database"
            },
            {
              "name": "AWS",
              "level": "advanced",
              "yearsOfExperience": 5,
              "category": "cloud"
            },
            {
              "name": "Docker",
              "level": "advanced",
              "yearsOfExperience": 4,
              "category": "tool"
            },
            {
              "name": "Kubernetes",
              "level": "intermediate",
              "yearsOfExperience": 2,
              "category": "tool"
            },
            {
              "name": "Git",
              "level": "expert",
              "yearsOfExperience": 8,
              "category": "tool"
            }
          ],
          "soft": [
            "Leadership",
            "Team Management",
            "Mentoring",
            "Problem Solving",
            "Communication",
            "Project Planning",
            "Agile Methodologies",
            "Cross-functional Collaboration"
          ],
          "languages": [
            {
              "code": "en",
              "fluency": "Native"
            },
            {
              "code": "es",
              "fluency": "Fluent"
            },
            {
              "code": "fr",
              "fluency": "Conversational"
            }
          ]
        },
        "projects": [
          {
            "name": "OpenSource DevTools",
            "description": "Comprehensive developer productivity toolkit with 10,000+ GitHub stars. Built extensible architecture supporting plugins and themes. Collaborated with international open-source community.",
            "role": "Lead Maintainer",
            "startDate": "2020-01",
            "endDate": "2024-12",
            "status": "ongoing",
            "context": "personal",
            "url": "https://devtools.alexandra.dev",
            "repository": "https://github.com/alex-codes/devtools",
            "technologies": [
              "TypeScript",
              "Electron",
              "React",
              "Node.js",
              "Jest",
              "GitHub Actions"
            ],
            "teamSize": 15,
            "metrics": {
              "participants": 10000,
              "efficiency": "30% productivity increase reported by users"
            }
          },
          {
            "name": "E-commerce Analytics Platform",
            "description": "Real-time analytics and business intelligence platform for mid-market e-commerce companies. Processed millions of transactions daily with sub-second query response times.",
            "role": "Technical Lead",
            "startDate": "2021-06",
            "endDate": "2022-03",
            "status": "completed",
            "context": "work",
            "url": "https://analytics.innovatetech.com",
            "technologies": [
              "React",
              "D3.js",
              "Node.js",
              "GraphQL",
              "PostgreSQL",
              "Redis",
              "AWS"
            ],
            "teamSize": 6,
            "budget": 250000,
            "metrics": {
              "participants": 500,
              "revenue": 1200000,
              "efficiency": "60% faster business insights"
            }
          },
          {
            "name": "Youth Coding Bootcamp",
            "description": "Volunteer-led coding bootcamp for underrepresented youth in tech. Developed curriculum and taught web development fundamentals to high school students.",
            "role": "Lead Instructor",
            "startDate": "2019-09",
            "endDate": "2023-06",
            "status": "completed",
            "context": "volunteer",
            "url": "https://youthcodingbootcamp.org",
            "technologies": [
              "HTML",
              "CSS",
              "JavaScript",
              "Python",
              "Git"
            ],
            "teamSize": 8,
            "metrics": {
              "participants": 120,
              "efficiency": "85% of graduates continued in tech education"
            }
          }
        ],
        "certifications": [
          {
            "name": "AWS Certified Solutions Architect - Professional",
            "issuer": "Amazon Web Services",
            "date": "2023-04-15",
            "expiryDate": "2026-04-15",
            "url": "https://aws.amazon.com/certification/certified-solutions-architect-professional/"
          },
          {
            "name": "Certified Kubernetes Administrator (CKA)",
            "issuer": "Cloud Native Computing Foundation",
            "date": "2022-09-20",
            "expiryDate": "2025-09-20",
            "url": "https://www.cncf.io/certification/cka/"
          },
          {
            "name": "Google Cloud Professional Developer",
            "issuer": "Google Cloud",
            "date": "2021-11-10",
            "expiryDate": "2023-11-10",
            "url": "https://cloud.google.com/certification/cloud-developer"
          }
        ],
        "achievements": [
          {
            "title": "Tech Innovation Award",
            "date": "2023-11",
            "awarder": "InnovateTech Solutions",
            "summary": "Recognized for outstanding technical innovation in microservices architecture, resulting in significant performance improvements and cost savings."
          },
          {
            "title": "Open Source Contributor of the Year",
            "date": "2022-12",
            "awarder": "Developer Community Awards",
            "summary": "Honored for significant contributions to open-source projects and mentoring new contributors in the developer community."
          },
          {
            "title": "Women in Tech Leadership Award",
            "date": "2021-03",
            "awarder": "Bay Area Women in Technology",
            "summary": "Awarded for demonstrating exceptional leadership in technology and promoting diversity and inclusion in the workplace."
          }
        ],
        "publications": [
          {
            "name": "Microservices Architecture Patterns for Scale",
            "publisher": "IEEE Software",
            "releaseDate": "2023-08",
            "url": "https://ieeexplore.ieee.org/document/microservices-patterns",
            "summary": "Comprehensive analysis of microservices design patterns and their impact on system scalability and maintainability."
          },
          {
            "name": "Building Inclusive Tech Teams: A Practical Guide",
            "publisher": "ACM Communications",
            "releaseDate": "2022-05",
            "url": "https://cacm.acm.org/magazines/inclusive-tech-teams",
            "summary": "Evidence-based strategies for creating diverse and inclusive technology teams that drive innovation and business results."
          },
          {
            "name": "Performance Optimization in Modern Web Applications",
            "publisher": "Personal Blog",
            "releaseDate": "2021-12",
            "url": "https://alexandra-dev.com/blog/performance-optimization",
            "summary": "Deep dive into frontend and backend optimization techniques with real-world case studies and measurable results."
          }
        ],
        "volunteer": [
          {
            "position": "Lead Instructor",
            "company": "Code for Change",
            "contractType": "Volunteer",
            "startDate": "2020-01",
            "endDate": "2023-12",
            "current": false,
            "location": {
              "city": "San Francisco",
              "region": "California",
              "country": "US"
            },
            "summary": "Taught web development fundamentals to underrepresented communities. Developed curriculum and mentored aspiring developers transitioning into tech careers.",
            "highlights": [
              "Instructed 150+ students in web development fundamentals",
              "Achieved 78% job placement rate within 6 months of program completion",
              "Developed partnerships with 12 local tech companies for internship opportunities",
              "Created open-source curriculum adopted by 5 other coding bootcamps"
            ],
            "labels": [
              "education",
              "diversity-inclusion",
              "mentoring"
            ],
            "projects": [
              {
                "name": "Inclusive Curriculum Development",
                "description": "Designed and implemented coding curriculum specifically tailored for underrepresented communities",
                "url": "https://github.com/code-for-change/inclusive-curriculum"
              }
            ]
          },
          {
            "position": "Technical Mentor",
            "company": "Girls Who Code",
            "contractType": "Volunteer",
            "startDate": "2018-09",
            "endDate": "2020-06",
            "current": false,
            "location": {
              "city": "San Francisco",
              "region": "California",
              "country": "US"
            },
            "summary": "Mentored high school girls interested in computer science careers. Provided technical guidance and career advice through one-on-one sessions and group workshops.",
            "highlights": [
              "Mentored 25 high school students over 2 years",
              "90% of mentees pursued computer science in college",
              "Organized industry visit program connecting students with tech professionals",
              "Contributed to curriculum development for advanced programming workshops"
            ],
            "labels": [
              "mentoring",
              "youth-development",
              "gender-equality"
            ]
          }
        ]
      }
    },
    "minimal": {
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
        "experience": [
          {
            "position": "Software Engineer",
            "company": "Tech Corp",
            "startDate": "2022-01-01"
          }
        ]
      }
    }
  }
};

/**
 * Get schema by version
 * @param {string} version - Schema version (e.g., "0.1.0")
 * @returns {Object} Schema JSON object
 */
function getSchema(version) {
  if (!schemas[version]) {
    throw new Error(`Schema version ${version} not found`);
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
  if (!examples[version] || !examples[version][type]) {
    throw new Error(`Example ${type} for version ${version} not found`);
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
