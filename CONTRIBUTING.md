# Contributing to Treeple

Thank you for your interest in contributing to Treeple! This platform aims to make conservation more accessible and engaging through interactive technology.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

Found a bug? Please help us fix it by:

1. **Checking existing issues** - Your bug might already be reported
2. **Using our bug report template** - Click [here](.github/ISSUE_TEMPLATE/bug_report.md) to file a bug report
3. **Providing details** - Include browser, OS, steps to reproduce, and screenshots if applicable

### Suggesting Features

Have an idea for a new feature?

1. **Check existing feature requests** - Someone might have suggested it already
2. **Use our feature request template** - Click [here](.github/ISSUE_TEMPLATE/feature_request.md)
3. **Describe the use case** - Explain what problem it solves and who benefits

## Development Setup

Please see our detailed [Setup Guide](docs/SETUP.md) for complete instructions.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/[username]/treeple.git
cd treeple

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your MapTiler API key to .env.local

# Generate grid data
npm run setup

# Start development server
npm run dev
```

## Coding Standards

### TypeScript

- **Always use TypeScript** - No JavaScript files in `src/`
- **Define interfaces** - Create clear type definitions in `src/types/`
- **Avoid `any`** - Use proper types or `unknown` if truly dynamic

### Code Style

We use ESLint and Prettier to maintain consistent code style:

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Lint code
npm run lint

# Type check
npm run type-check
```

**Before committing**, ensure all checks pass.

### Component Patterns

Please follow our [Component Specification](docs/COMPONENT_SPEC.md) for:

- File organization
- Naming conventions
- Component structure
- Props patterns

### Design System

All UI must adhere to our [Design System](docs/DESIGN_SYSTEM.md):

- Use existing shadcn/ui components
- Follow color palette (primary, secondary, neutrals)
- Maintain glass-morphism aesthetic
- Ensure WCAG AA accessibility

## Commit Message Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, no logic change)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Build process or tooling changes

### Examples

```
feat(map): add custom marker icons
fix(tiles): correct status badge color for reserved tiles
docs(readme): update installation instructions
```

## Pull Request Process

### Before Submitting

1. **Create a feature branch** - Branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-number-description
   ```

2. **Make your changes** - Follow coding standards above

3. **Test thoroughly**:
   - Run on desktop and mobile
   - Test in Chrome, Safari, and Firefox
   - Verify Lighthouse score > 90
   - Ensure no console errors

4. **Update documentation** - If you add features:
   - Update relevant docs in `/docs`
   - Add JSDoc comments to complex functions
   - Update README if needed

### Submitting the PR

1. **Fill out the PR template completely**
2. **Link related issues** - Use "Closes #123" in description
3. **Add screenshots** - For UI changes, show before/after
4. **Request review** - Tag maintainers if needed
5. **Respond to feedback** - Address review comments promptly

### PR Checklist

Before submitting, ensure:

- [ ] Code follows project style guidelines
- [ ] Self-reviewed code for clarity and correctness
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings or errors
- [ ] All tests pass (`npm run build`, `npm run lint`)
- [ ] Lighthouse score maintained (>90)
- [ ] Works on mobile and desktop
- [ ] Accessibility tested (keyboard navigation, screen reader)

## Component Development Guidelines

### Creating New Components

1. **Place in appropriate directory**:
   - `src/components/map/` - Map-related components
   - `src/components/tiles/` - Tile-related components
   - `src/components/layout/` - Layout components
   - `src/components/ui/` - shadcn/ui components

2. **Use TypeScript**:
   ```tsx
   interface MyComponentProps {
     title: string
     isActive?: boolean
   }

   export function MyComponent({ title, isActive = false }: MyComponentProps) {
     // Component logic
   }
   ```

3. **Follow naming conventions**:
   - PascalCase for components: `TileDetails.tsx`
   - camelCase for utilities: `formatPrice.ts`
   - kebab-case for CSS modules: `tile-grid.module.css`

4. **Include all states**:
   - Loading state
   - Error state
   - Empty state
   - Success state

### Using shadcn/ui Components

```bash
# Add new shadcn/ui component
npx shadcn@latest add <component-name>

# Example
npx shadcn@latest add button
```

Always prefer shadcn/ui components over custom ones.

## Testing Requirements

### Manual Testing Checklist

Before submitting, test:

- [ ] Desktop (Chrome, Safari, Firefox)
- [ ] Mobile (iOS Safari, Chrome Android)
- [ ] Tablet (iPad)
- [ ] Different viewport sizes
- [ ] Touch gestures (mobile)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

### Performance Testing

Run Lighthouse audit:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Documentation Requirements

When adding features, update:

1. **Code comments** - JSDoc for public functions
2. **Component specs** - Add to `docs/COMPONENT_SPEC.md` if significant
3. **README** - Update if user-facing changes
4. **Data structure docs** - Update `docs/DATA_STRUCTURE.md` for new data types

## Questions or Need Help?

- **Documentation:** Start with [docs/](docs/)
- **Issues:** Search [existing issues](https://github.com/[username]/treeple/issues)
- **Discussions:** Use [GitHub Discussions](https://github.com/[username]/treeple/discussions)

## Recognition

Contributors will be recognized in our README and release notes. Thank you for helping make conservation more accessible!

---

**Happy Contributing! 🌲**

*Treeple is a platform for creating interactive conservation experiences. Yellowstone National Park is our first implementation.*
