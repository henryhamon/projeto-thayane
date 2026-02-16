export class PyLoader {
    constructor() {
        if (PyLoader.instance) return PyLoader.instance;
        PyLoader.instance = this;
        this.pyodide = null;
        this.ready = false;
    }

    async init() {
        if (this.ready) return;

        console.log("Initializing Pyodide (Python Native Mode)...");

        // Carrega o script do CDN se ainda não estiver na página
        if (!window.loadPyodide) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Inicializa o Pyodide sem carregar micropip ou pacotes extras
        this.pyodide = await window.loadPyodide();

        this.ready = true;
        console.log("Pyodide Ready.");
    }

    getPyodide() {
        if (!this.ready) throw new Error("Pyodide not initialized. Call init() first.");
        return this.pyodide;
    }
}

export const pyLoader = new PyLoader();