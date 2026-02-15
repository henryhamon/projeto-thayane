# 🏔️ Projeto Thayane: O Protocolo Anti-Abandono

![Status](https://img.shields.io/badge/Status-Educational-green)
![Tech](https://img.shields.io/badge/Stack-Three.js_|_Vite_|_Pyodide-blue)

> *"Onde o algoritmo guloso falha, a busca em largura prevalece."*

## 📜 A Lenda (Contexto do Projeto)

Estamos em 2026. Após o incidente no Pico Paraná, onde a operadora (codinome: *T.H.A.Y.A.N.E.*) utilizou um algoritmo guloso (*Greedy Search*) focado apenas na velocidade devido ao Life Style, o ativo **R.O.B.E.R.T.O.** (Robô Operacional de Busca e Resgate em Terreno Ostensivo) foi dado como perdido por 5 dias em terreno hostil.

A falha foi identificada: o robô não possuía memória de estado, resultando em loops infinitos e tomadas de decisão baseadas apenas no "agora".

**Sua Missão:**
Como engenheiro de software, você deve reescrever o firmware do R.O.B.E.R.T.O. utilizando algoritmos de busca robustos (**BFS** - Busca em Largura ou **DFS** - Busca em Profundidade) para garantir que ele encontre o caminho da "Fazenda Antonina" (Saída), independentemente da complexidade do labirinto.

**Lembre-se: Nenhum Roberto fica para trás.**

---

## 🎯 Sobre o Projeto

Este é um simulador de labirintos desenvolvido para a prática de Estruturas de Dados e Algoritmos. Diferente de abordagens tradicionais, aqui o código do aluno ganha vida em um ambiente 3D simulado no navegador.

### 🛠️ Stack Tecnológica
* **Visualização:** [Three.js](https://threejs.org/) + Vite (Renderização 3D isométrica).
* **Engine:** Execução de Python no browser via [Pyodide](https://pyodide.org/) (WebAssembly).
* **Transpilação:** Suporte nativo a Portugol através da biblioteca **[meuPiá](https://github.com/meuPia)**.

---

## 🚀 Como Executar

Este é um projeto estático (client-side), o que facilita a execução.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/projeto-thayane.git](https://github.com/seu-usuario/projeto-thayane.git)
    cd projeto-thayane
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra seu navegador em `http://localhost:5173` e comece o resgate.

---

## 🎮 Como Jogar (Codar)

1.  No editor à esquerda, escreva seu algoritmo usando a sintaxe do **meuPiá** (Portugol) ou Python puro.
2.  Você tem acesso aos sensores do R.O.B.E.R.T.O.:
    * `roberto.olhar_frente()`: Retorna "LIVRE", "PAREDE" ou "SAIDA".
    * `roberto.mover()`: Avança uma casa.
    * `roberto.virar_esquerda()` / `roberto.virar_direita()`
3.  Clique em **"Compilar e Rodar"**.
4.  Assista a simulação no painel 3D. Se seu algoritmo falhar, o R.O.B.E.R.T.O. ficará preso (e você reprova na missão).

---

## 🏫 Créditos

Baseado no transpiler [meuPiá](https://github.com/meuPia).