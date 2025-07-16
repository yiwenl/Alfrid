class GLTool {
  private canvas: HTMLCanvasElement | null = null;
  private gl: WebGL2RenderingContext | null = null;

  init(canvas?: HTMLCanvasElement, params?: {
        antialias?: boolean
        depth?: boolean
        stencil?: boolean
        premultipliedAlpha?: boolean
        preserveDrawingBuffer?: boolean
        powerPreference?: 'default' | 'high-performance' | 'low-power'
    }) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
    }
    this.canvas = canvas;

    this.gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext;
    if (!this.gl) {
      throw new Error('WebGL not supported');
    }
  }

  getGL() {
    return this.gl;
  }

  getCanvas() {
    return this.canvas;
  }

  resize(width: number, height: number) {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }
}


const GL = new GLTool();

export {GL, GLTool};
