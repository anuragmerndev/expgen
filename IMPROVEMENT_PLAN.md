# Repository Improvement Plan

This document outlines a comprehensive plan to improve the **@devsphere/expgen** Express.js scaffolding CLI tool.

---

## Current State Assessment

| Area | Score | Status |
|------|-------|--------|
| Code Quality | 7.5/10 | Good patterns, lacks tests |
| Documentation | 7/10 | Good README, lacks API docs |
| Functionality | 8.5/10 | Comprehensive scaffolding |
| Testing | 0/10 | No tests present |
| CI/CD | 2/10 | Only local hooks |

---

## 1. Testing Infrastructure

### 1.1 Unit Tests

**Priority:** High
**Impact:** Ensures reliability and prevents regressions

**Tasks:**
- [ ] Set up Jest or Vitest as the test framework
- [ ] Add test configuration to `package.json`
- [ ] Write unit tests for helper functions:
  - `checkEmptyDirectory.ts`
  - `copyFileToDir.ts`
  - `upsertCreateDirectory.ts`
  - `creatingPackages.ts` (package.json generation logic)
  - `createModule.ts` (file copying logic)
- [ ] Add tests for CLI argument parsing in `index.ts`
- [ ] Test preference prompt validation logic
- [ ] Aim for 80%+ code coverage

**Files to create:**
```
tests/
├── unit/
│   ├── helpers/
│   │   ├── checkEmptyDirectory.test.ts
│   │   ├── copyFileToDir.test.ts
│   │   ├── upsertCreateDirectory.test.ts
│   │   ├── creatingPackages.test.ts
│   │   └── createModule.test.ts
│   └── cli/
│       └── index.test.ts
└── setup.ts
```

### 1.2 Integration Tests

**Priority:** High
**Impact:** Validates end-to-end scaffolding works correctly

**Tasks:**
- [ ] Test full project generation with different option combinations
- [ ] Verify generated project structure matches expected output
- [ ] Test SQL vs NoSQL template generation
- [ ] Test optional feature toggles (Docker, ESLint, hooks)
- [ ] Validate generated `package.json` dependencies are correct

### 1.3 Snapshot Tests

**Priority:** Medium
**Impact:** Catch unintended changes to generated output

**Tasks:**
- [ ] Add snapshot tests for generated file contents
- [ ] Snapshot test package.json generation for all option combinations

---

## 2. CI/CD Pipeline

### 2.1 GitHub Actions Workflows

**Priority:** High
**Impact:** Automates quality checks and releases

**Tasks:**
- [ ] Create `.github/workflows/ci.yml` for continuous integration:
  - Run linting on all PRs
  - Run tests with coverage reporting
  - Build validation
  - Matrix testing for Node.js 18, 20, 22
- [ ] Create `.github/workflows/release.yml` for npm publishing:
  - Automatic versioning with semantic-release
  - npm publish on tagged releases
  - Generate changelog automatically
- [ ] Add status badges to README

**Files to create:**
```
.github/
├── workflows/
│   ├── ci.yml
│   └── release.yml
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   └── feature_request.md
└── PULL_REQUEST_TEMPLATE.md
```

### 2.2 Code Quality Gates

**Priority:** Medium
**Impact:** Enforces quality standards

**Tasks:**
- [ ] Add codecov integration for coverage tracking
- [ ] Configure Dependabot for dependency updates
- [ ] Add CodeQL security scanning
- [ ] Set up branch protection rules in documentation

---

## 3. Documentation Improvements

### 3.1 API Documentation

**Priority:** Medium
**Impact:** Improves developer onboarding

**Tasks:**
- [ ] Add JSDoc comments to all exported functions
- [ ] Generate API documentation using TypeDoc
- [ ] Document all CLI options with examples
- [ ] Add architecture decision records (ADRs)

### 3.2 Template Documentation

**Priority:** Medium
**Impact:** Helps users understand generated code

**Tasks:**
- [ ] Add Swagger/OpenAPI integration to generated template
- [ ] Include API documentation in generated README
- [ ] Add inline comments explaining architecture patterns
- [ ] Create a `docs/` folder with detailed guides

### 3.3 Contributing Guidelines

**Priority:** Low
**Impact:** Encourages community contributions

**Tasks:**
- [ ] Create `CONTRIBUTING.md` with:
  - Development setup instructions
  - Code style guidelines
  - PR process
  - Testing requirements
- [ ] Add `CODE_OF_CONDUCT.md`
- [ ] Create issue and PR templates

---

## 4. New Features

### 4.1 Authentication Scaffolding

**Priority:** High
**Impact:** Most requested feature for API projects

**Tasks:**
- [ ] Add JWT authentication template option
- [ ] Include auth middleware in generated code
- [ ] Add user registration/login controllers
- [ ] Include password hashing with bcrypt
- [ ] Add refresh token support
- [ ] Optional: OAuth2 integration (Google, GitHub)

**CLI Option:** `-auth, --authentication [jwt|oauth|none]`

### 4.2 Rate Limiting

**Priority:** High
**Impact:** Essential security feature

**Tasks:**
- [ ] Add `express-rate-limit` to template dependencies
- [ ] Create rate limiting middleware
- [ ] Configure per-route and global limits
- [ ] Add Redis store option for distributed rate limiting

### 4.3 Request Logging Middleware

**Priority:** Medium
**Impact:** Improves debugging and monitoring

**Tasks:**
- [ ] Add Morgan or custom request logging middleware
- [ ] Log request duration, status codes, and paths
- [ ] Integrate with Winston for consistent logging

### 4.4 Environment Validation

**Priority:** Medium
**Impact:** Catches configuration errors early

**Tasks:**
- [ ] Add Zod schema for environment variable validation
- [ ] Validate required env vars on startup
- [ ] Provide helpful error messages for missing config

### 4.5 Health Check Endpoint

**Priority:** Medium
**Impact:** Essential for production deployments

**Tasks:**
- [ ] Add `/health` endpoint to generated template
- [ ] Include database connection check
- [ ] Return service status and version

### 4.6 OpenAPI/Swagger Integration

**Priority:** Medium
**Impact:** Auto-generates API documentation

**Tasks:**
- [ ] Add `swagger-jsdoc` and `swagger-ui-express`
- [ ] Generate OpenAPI spec from route definitions
- [ ] Serve Swagger UI at `/api-docs`

**CLI Option:** `-sw, --swagger` to enable

### 4.7 GraphQL Support

**Priority:** Low (Future)
**Impact:** Alternative API paradigm

**Tasks:**
- [ ] Add GraphQL scaffolding option
- [ ] Include Apollo Server setup
- [ ] Generate type definitions and resolvers
- [ ] Add GraphQL playground

**CLI Option:** `-gql, --graphql`

### 4.8 DDD Architecture Option

**Priority:** Low (Future)
**Impact:** Enterprise-grade architecture

**Tasks:**
- [ ] Add Domain-Driven Design folder structure option
- [ ] Separate domain, application, and infrastructure layers
- [ ] Include repository pattern implementation

**CLI Option:** `-ddd, --domain-driven`

---

## 5. Code Quality Improvements

### 5.1 Error Handling Enhancements

**Priority:** Medium
**Impact:** Better debugging experience

**Tasks:**
- [ ] Add custom error classes (ValidationError, NotFoundError, etc.)
- [ ] Improve error serialization for API responses
- [ ] Add error codes for programmatic handling
- [ ] Include stack traces only in development mode

### 5.2 Database Connection Improvements

**Priority:** Medium
**Impact:** Production reliability

**Tasks:**
- [ ] Add connection pooling configuration for Prisma
- [ ] Add retry logic for database connections
- [ ] Include connection health checks
- [ ] Add graceful shutdown handling

### 5.3 Security Enhancements

**Priority:** High
**Impact:** Protects generated applications

**Tasks:**
- [ ] Add `helmet` middleware for security headers
- [ ] Include CSRF protection option
- [ ] Add input sanitization middleware
- [ ] Document security best practices

### 5.4 Refactoring

**Priority:** Low
**Impact:** Maintainability

**Tasks:**
- [ ] Split `creatingPackages.ts` into smaller modules (1400+ lines)
- [ ] Extract template configuration to separate config files
- [ ] Improve type definitions for better IntelliSense
- [ ] Add more descriptive error messages

---

## 6. Developer Experience

### 6.1 CLI Improvements

**Priority:** Medium
**Impact:** Better user experience

**Tasks:**
- [ ] Add progress indicators during scaffolding (ora/spinner)
- [ ] Add colorful output with chalk
- [ ] Show summary of generated structure
- [ ] Add `--dry-run` option to preview changes
- [ ] Add `--verbose` flag for debugging

### 6.2 Template Updates

**Priority:** Medium
**Impact:** Keeps generated code modern

**Tasks:**
- [ ] Add support for latest Node.js LTS (22)
- [ ] Update all dependencies to latest stable versions
- [ ] Add TypeScript 5.4+ features
- [ ] Improve ESM compatibility

### 6.3 Interactive Mode Improvements

**Priority:** Low
**Impact:** Easier setup for new users

**Tasks:**
- [ ] Add configuration presets (minimal, standard, full)
- [ ] Save user preferences for future runs
- [ ] Add project name validation feedback
- [ ] Show feature descriptions in prompts

---

## 7. Template Enhancements

### 7.1 Additional CRUD Examples

**Priority:** Low
**Impact:** Better learning resource

**Tasks:**
- [ ] Add Product entity example alongside User
- [ ] Include relationship examples (User has many Products)
- [ ] Add pagination implementation
- [ ] Include search/filter examples

### 7.2 Microservices Support

**Priority:** Low (Future)
**Impact:** Scalable architecture option

**Tasks:**
- [ ] Add microservice template option
- [ ] Include message queue integration (RabbitMQ/Redis)
- [ ] Add service discovery configuration
- [ ] Include distributed tracing setup

---

## Implementation Roadmap

### Phase 1: Foundation (Critical)
1. Set up testing infrastructure
2. Create CI/CD pipeline
3. Add rate limiting to template
4. Add helmet security middleware

### Phase 2: Core Features
1. JWT authentication scaffolding
2. Swagger/OpenAPI integration
3. Environment validation
4. Health check endpoint

### Phase 3: Polish
1. CLI UX improvements (spinners, colors)
2. Documentation improvements
3. Contributing guidelines
4. Code refactoring

### Phase 4: Advanced Features
1. GraphQL support
2. DDD architecture option
3. Microservices template
4. OAuth integration

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Test Coverage | 0% | 80% |
| CI/CD Pipeline | None | Full automation |
| Documentation | Basic | Comprehensive |
| Security Features | 2 | 6+ |
| CLI Options | 9 | 15+ |

---

## Notes

- All new features should be optional and not break existing functionality
- Maintain backward compatibility with generated projects
- Follow semantic versioning for releases
- Consider user feedback from GitHub issues

---

*Last updated: January 2026*
