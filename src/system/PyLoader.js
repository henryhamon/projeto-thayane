export class PyLoader {
    constructor() {
        if (PyLoader.instance) return PyLoader.instance;
        PyLoader.instance = this;
        this.pyodide = null;
        this.ready = false;
        this.meuPiaInstalled = false; 
    }

    async init() {
        if (this.ready) return;

        console.log("Initializing Pyodide (Python Native Mode)...");
        if (!window.loadPyodide) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'; 
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        this.pyodide = await window.loadPyodide();
        this.ready = true;
        console.log("Pyodide Ready.");
    }

    async installMeuPia() {
        if (!this.ready) throw new Error("Pyodide not initialized.");
        if (this.meuPiaInstalled) return;

        console.log("Baixando Compilador meuPiá v1.1.8...");
        await this.pyodide.loadPackage("micropip");
        const micropip = this.pyodide.pyimport("micropip");
        
        await micropip.install("meupia-core==1.1.8");
        this.meuPiaInstalled = true;
        console.log("meuPiá-core instalado com sucesso!");
    }

    getPyodide() {
        if (!this.ready) throw new Error("Pyodide not initialized. Call init() first.");
        return this.pyodide;
    }
}

export const pyLoader = new PyLoader();