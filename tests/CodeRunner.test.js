import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeRunner } from '../src/system/CodeRunner.js';
import { pyLoader } from '../src/system/PyLoader.js';

// Mock pyLoader
vi.mock('../src/system/PyLoader.js', () => {
    return {
        pyLoader: {
            getPyodide: vi.fn(),
            installMeuPia: vi.fn()
        }
    };
});

describe('CodeRunner Output Parsing', () => {
    let mockPyodide;

    beforeEach(() => {
        vi.clearAllMocks();
        
        mockPyodide = {
            globals: {
                set: vi.fn(),
                get: vi.fn()
            },
            runPython: vi.fn(),
            runPythonAsync: vi.fn()
        };

        pyLoader.getPyodide.mockReturnValue(mockPyodide);
    });

    it('executes python user code and extracts logs', async () => {
        const runner = new CodeRunner();
        const mapData = [[1,1,1],[1,2,1],[1,1,1]];
        const userCode = "mover()\\nvirar_esquerda()";

        // Setup mock to simulate a successful run returning actions
        const mockRoberto = {
            logs: {
                toJs: vi.fn().mockReturnValue([
                    { action: 'MOVE' },
                    { action: 'TURN_LEFT' }
                ]),
                destroy: vi.fn()
            },
            destroy: vi.fn()
        };

        mockPyodide.globals.get.mockImplementation((key) => {
            if (key === 'roberto') return mockRoberto;
            return null;
        });

        const result = await runner.runUserCode(userCode, mapData, 'python');

        // We expect the result to be the simulated JS object returned by Pyodide's toJs()
        expect(result).toEqual([
            { action: 'MOVE' },
            { action: 'TURN_LEFT' }
        ]);

        expect(pyLoader.getPyodide).toHaveBeenCalled();
        expect(mockPyodide.globals.set).toHaveBeenCalledWith("GAME_MAP_RAW", mapData);
        // Ensure finalPythonLogic (our userCode) was executed
        expect(mockPyodide.runPython).toHaveBeenCalledWith(userCode);
        expect(mockRoberto.logs.destroy).toHaveBeenCalled();
        expect(mockRoberto.destroy).toHaveBeenCalled();
    });

    it('throws error when user code contains syntax errors', async () => {
        const runner = new CodeRunner();
        const mapData = [[1,1,1],[1,2,1],[1,1,1]];
        const invalidUserCode = "pront('hello') # syntax error";

        // Simulate a pyodide runtime error when user code is executed
        // We know that ROBERTO_PY_SOURCE is executed first, then finalPythonLogic.
        // We can mock runPython to throw an error on the second call (the user code).
        mockPyodide.runPython.mockImplementation((code) => {
            if (code === invalidUserCode) {
                // Mimic Pyodide error format
                throw new Error(`File "<exec>", line 1\n  pront('hello')\nNameError: name 'pront' is not defined\n`);
            }
        });

        // The try/catch in CodeRunner should catch the runPython exception and throw a formatted error
        await expect(runner.runUserCode(invalidUserCode, mapData, 'python'))
            .rejects
            .toThrow(`Erro no seu código:\npront('hello')\nNameError: name 'pront' is not defined`);
    });
});
