# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **CodePen clone** - a web-based code editor with live preview functionality. Built with Svelte 4, TypeScript, and Vite, it provides real-time HTML/CSS/JavaScript editing with Monaco Editor integration.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run Svelte type checking and validation

### Testing Commands
- `npm test` - Run JavaScript tests using Node.js native test runner
- `npm run test:ts` - Run TypeScript tests using tsx
- `npm run coverage` - Generate HTML coverage reports with c8

### Code Quality
- Use Prettier for formatting (configured with Svelte plugin)
- TypeScript strict mode enabled
- No linting command configured - code relies on TypeScript checking

## Architecture Overview

### Technology Stack
- **Frontend:** Svelte 4 with TypeScript
- **Build Tool:** Vite 4.4.5 with Svelte plugin  
- **Code Editor:** Monaco Editor with language services
- **Styling:** SCSS with CSS custom properties
- **Testing:** Node.js native test runner + tsx for TypeScript

### Key Architecture Patterns

**State Management:**
- Uses Svelte stores (`stores.ts`) for reactive state management
- `SourceDocStore` derived store combines HTML/CSS/JS into complete document
- Debounced updates (250ms) prevent excessive re-renders

**Component Architecture:**
- Single reusable `CodeEditor` component for all language types
- Props-based configuration (language, title, collapsible)
- Clean separation between UI state and content state

**Layout System:**
- CSS Grid-based responsive layout with resizable panels
- Container queries for narrow screen adaptations
- Drag-and-drop resizing functionality

### Core Components

**`src/App.svelte`** - Main application layout with grid-based editor arrangement

**`src/components/Editors/CodeEditor.svelte`** - Reusable Monaco Editor wrapper
- Supports HTML, CSS, JavaScript with syntax highlighting
- Configurable collapse/expand functionality
- Responsive title rotation for narrow layouts

**`src/components/Output.svelte`** - Live preview component
- Sandboxed iframe for secure code execution
- Real-time updates via store subscriptions

**`src/stores.ts`** - Centralized state management
- Individual stores for each editor's content and open/closed state
- Derived store for complete document generation

### File Organization
```
src/
├── components/           # Reusable UI components
├── utils/               # Pure utility functions and types  
├── lib/                 # Sample content and library code
├── main.ts              # Application entry point
├── App.svelte           # Root component
└── stores.ts            # State management
```

## Development Guidelines

### Component Development
- Follow the established reusable component pattern (see `CodeEditor`)
- Use TypeScript interfaces for prop definitions
- Implement proper cleanup in `onDestroy` lifecycle
- Use Svelte's reactive statements (`$:`) for derived values

### State Management
- Add new editor states to `stores.ts` following existing patterns
- Use derived stores for computed values that depend on multiple stores
- Implement debouncing for performance-critical updates

### Testing Approach
- Co-locate tests with source files (`*.test.js`, `*.test.ts`)
- Use Node.js native test runner (no external frameworks)
- Mock Svelte stores in tests using custom implementations
- Comprehensive coverage expected for utilities and core logic

### Code Style (from Copilot Instructions)
- Use 2 spaces for indentation
- Prefer single quotes for strings
- Use trailing commas in multi-line structures
- Follow strict TypeScript configuration
- Use meaningful variable and function names
- Implement proper error handling and edge cases

### Monaco Editor Integration
- Monaco Editor excluded from Vite pre-bundling for proper web worker support
- Language services run in web workers for performance
- Custom theme and configuration in editor components

### Performance Considerations
- Debounced document generation prevents excessive iframe reloads
- Monaco Editor web workers handle language services
- Component lazy loading via Svelte's dynamic imports
- Vite provides optimized bundling and hot module replacement

### Testing Strategy
- Unit tests for utility functions (`src/utils/`)
- Component tests for editor functionality
- Store tests for state management logic
- Coverage reports generated in `coverage/` directory

## Key Dependencies

### Core Framework
- `svelte` - UI framework
- `vite` - Build tool and dev server  
- `typescript` - Type checking and compilation

### Editor Integration
- `monaco-editor` - VS Code editor component
- Various Monaco language packages for syntax highlighting

### Development Tools
- `sass` - SCSS preprocessing
- `prettier` with Svelte plugin - Code formatting
- `svelte-check` - Type checking and validation
- `c8` - Code coverage reporting
- `tsx` - TypeScript execution for tests