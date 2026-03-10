# Contributing Guidelines

## Digital Twin CO₂ Emission Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

---

## 🎯 Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

---

## 📝 Code Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Provide proper type definitions
- Avoid `any` type when possible

### Code Style

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons** at end of statements
- Follow **PascalCase** for classes and types
- Follow **camelCase** for variables and functions

### Comments

```typescript
/**
 * Function description
 * @param param1 - Description
 * @returns Description
 */
function example(param1: string): number {
  // Implementation comments
  return 42;
}
```

---

## 🏗️ Architecture Rules

When contributing, follow these principles:

### 1. Maintain Layer Separation

```
Controllers → Services → Repositories
```

- Controllers: HTTP only
- Services: Business logic only
- Repositories: Data access only

### 2. Follow SOLID Principles

- Single Responsibility: One class, one purpose
- Open/Closed: Extend, don't modify
- Dependency Inversion: Depend on abstractions

### 3. Use Dependency Injection

```typescript
// ✅ Good
class MyService {
  constructor(private repo: IRepository) {}
}

// ❌ Bad
class MyService {
  private repo = new ConcreteRepository();
}
```

---

## 🧪 Testing

- Write unit tests for services
- Write integration tests for controllers
- Aim for >80% code coverage
- Use Jest for testing

```bash
npm test
```

---

## 🔀 Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new emission factor
fix: correct zone calculation
docs: update API documentation
refactor: simplify service logic
test: add unit tests for controller
```

### Pull Requests

1. Keep PRs focused and small
2. Reference related issues
3. Provide clear description
4. Include screenshots for UI changes
5. Ensure all tests pass
6. Update documentation if needed

---

## 🐛 Bug Reports

When reporting bugs, include:

- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version)
- Screenshots if applicable

---

## 💡 Feature Requests

When suggesting features:

- Explain use case
- Describe expected behavior
- Consider architecture impact
- Provide implementation ideas

---

## 📚 Documentation

- Update README for major changes
- Update API docs for new endpoints
- Add JSDoc comments for public APIs
- Include examples in documentation

---

## ✅ Code Review Checklist

Before submitting PR:

- [ ] Code follows style guide
- [ ] Tests pass
- [ ] No console.log statements
- [ ] Types properly defined
- [ ] Documentation updated
- [ ] No breaking changes (or clearly marked)
- [ ] Follows SOLID principles
- [ ] Error handling present

---

## 🎓 Learning Resources

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

Thank you for contributing! 🚀
