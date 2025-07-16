# Alfrid - WebGL 3D Toolkit

A modern WebGL 3D toolkit built with TypeScript and Vite.

## Project Structure

```
Alfrid/
├── src/
│   ├── main.ts          # Development entry point
│   └── alfrid/
│       ├── index.ts     # Library entry point
│       └── types.ts     # TypeScript type definitions
├── dist/                # Built library files
├── index.html           # Development HTML
├── vite.config.ts       # Vite configuration
└── package.json         # Project configuration
```

## Development

### Start Development Server
```bash
npm run dev
```
This starts the development server at `http://localhost:3000` using `src/main.ts` as the entry point.

### Development Workflow
- Edit library code in `src/alfrid/`
- Test changes in development mode
- The development server provides hot module replacement (HMR)

## Building the Library

### Build for Production
```bash
npm run build
```

This builds the library from `src/alfrid/index.ts` and outputs:
- `dist/alfrid.umd.js` - UMD format for browser/Node.js
- `dist/alfrid.mjs` - ES module format
- Source maps for debugging

### Library Usage

#### ES Modules
```javascript
import Alfrid, { createCanvas, initWebGL } from 'alfrid'

const canvas = createCanvas()
const alfrid = new Alfrid(canvas)
```

#### UMD (Browser)
```html
<script src="dist/alfrid.umd.js"></script>
<script>
  const canvas = Alfrid.createCanvas()
  const alfrid = new Alfrid(canrid)
</script>
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build library for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Library API

### Core Class: Alfrid
```typescript
class Alfrid {
  constructor(canvas?: HTMLCanvasElement)
  init(canvas: HTMLCanvasElement): boolean
  getGL(): WebGLRenderingContext | WebGL2RenderingContext | null
  getCanvas(): HTMLCanvasElement | null
}
```

### Utility Functions
```typescript
function createCanvas(width?: number, height?: number): HTMLCanvasElement
function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext | WebGL2RenderingContext | null
```

## Configuration

The project uses Vite with different configurations for development and production:

- **Development**: Uses `src/main.ts` as entry point for testing
- **Production**: Uses `src/alfrid/index.ts` as library entry point

## TypeScript Support

Full TypeScript support with:
- Type definitions in `src/alfrid/types.ts`
- Strict type checking enabled
- Source maps for debugging

## Contributing

1. Make changes in `src/alfrid/`
2. Test with `npm run dev`
3. Build with `npm run build`
4. The library is ready for distribution 