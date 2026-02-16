# 🏔️ Projeto Thayane: O Protocolo Anti-Abandono

![Status](https://img.shields.io/badge/Status-Educational-green)
![Tech](https://img.shields.io/badge/Stack-Three.js_|_Vite_|_Pyodide-blue)

> *"Onde o algoritmo guloso falha, a busca em largura prevalece."*

## 1. 📜 Contexto

Estamos em 2026. Após o incidente no Pico Paraná, onde a operadora (codinome: *T.H.A.Y.A.N.E.*) utilizou um algoritmo guloso (*Greedy Search*) focado apenas na velocidade devido ao Life Style. 
O ativo **R.O.B.E.R.T.O.** (Robô Operacional de Busca e Resgate em Terreno Ostensivo) foi dado como perdido por 5 dias em terreno hostil.

A falha foi identificada: o robô não possuía memória de estado, resultando em loops infinitos e tomadas de decisão baseadas apenas no "agora".

**Sua Missão:**
Como engenheiro de software, você deve reescrever o firmware do R.O.B.E.R.T.O. utilizando algoritmos de busca robustos (**BFS** - Busca em Largura ou **DFS** - Busca em Profundidade) para garantir que ele encontre o caminho da "Fazenda Antonina" (Saída), independentemente da complexidade do labirinto.

**Lembre-se: Nenhum Roberto fica para trás.**

---

## 2. 🎯 Sobre o Projeto

Este é um simulador de labirintos desenvolvido para a prática de Estruturas de Dados e Algoritmos. Diferente de abordagens tradicionais, aqui o código do aluno ganha vida em um ambiente 3D simulado no navegador.

### 🛠️ Stack Tecnológica
* **Visualização:** [Three.js](https://threejs.org/) + Vite (Renderização 3D isométrica).
* **Engine:** Execução de Python no browser via [Pyodide](https://pyodide.org/) (WebAssembly).
* **Transpilação:** Suporte nativo a Portugol através da biblioteca **[meuPiá](https://github.com/meuPia)**.

---

## 3. 🚀 Como Executar

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

## 4. 🏔 Sua Missão:**
Como Engenheiro(a) de Software Sênior da divisão de resgate, você deve reescrever o firmware do R.O.B.E.R.T.O. O objetivo é garantir que ele saia do Cume (Ponto Azul) e encontre a **Fazenda Antonina** (Ponto Vermelho), independentemente da complexidade do labirinto gerado.

**Lembre-se: Nenhum Roberto fica para trás.**

---

## 5. ⚙️ Manual de Hardware

O R.O.B.E.R.T.O. opera com um interpretador **Python 3.11** embarcado. Você não controla o robô diretamente com as setas do teclado; você deve programar a inteligência dele.

Abaixo estão os métodos disponíveis no objeto global `roberto`:

| Método | Retorno | Descrição |
| --- | --- | --- |
| `roberto.mover()` | `None` | Move o robô **1 bloco para frente** na direção atual. <br>
| `roberto.virar_direita()` | `None` | Gira o robô 90º no sentido **horário**. |
| `roberto.virar_esquerda()` | `None` | Gira o robô 90º no sentido **anti-horário**. |
| `roberto.sensor()` | `String` | Escaneia o bloco imediatamente à frente. Retorna:<br>
| `roberto.escreva(msg)` | `None` | Envia uma mensagem de texto para a telemetria (Console). Útil para depurar o "pensamento" do robô. |

<br>⚠️ **Atenção:** Se houver um obstáculo, o robô sofrerá uma colisão (CRASH) e a simulação encerrará. |
<br>• `'LIVRE'`: Caminho livre (terra).<br>
<br>• `'PAREDE'`: Obstáculo (Pedra/Árvore/Abismo).<br>
<br>• `'SAIDA'`: A Fazenda Antonina (Objetivo). |

#### Exemplo de Código (Básico):

```python
def main():
    # Estratégia simples (que provavelmente falhará em labirintos complexos)
    if roberto.sensor() == 'LIVRE':
        roberto.escreva("Caminho limpo, avançando...")
        roberto.mover()
    elif roberto.sensor() == 'SAIDA':
        roberto.mover() # Vitória!
    else:
        roberto.virar_direita()

main()

```

---

## 6. 🎛️ Painel de Controle da Missão

Ao lado do mapa 3D, você encontrará os controles operacionais:

1. **EXECUTAR PROTOCOLO:** Compila seu código Python e inicia a missão. O robô executará as ações sequencialmente.
2. **REINICIAR POSIÇÃO:** Traz o robô de volta ao início (Azul) **sem mudar o labirinto**. Use isso para corrigir bugs no seu código mantendo o mesmo cenário de teste.
3. **🔄 NOVO MAPA:** Gera um labirinto **totalmente novo e aleatório**.
* *Dica de Engenharia:* Um algoritmo robusto não decora o caminho. Ele funciona em qualquer mapa. Antes de entregar, teste sua solução em pelo menos 3 mapas diferentes clicando neste botão.


4. **💾 DOWNLOAD .PY:** Exporta o código que está no seu editor para um arquivo `.py`. **Este é o arquivo que você deverá entregar.**

---

## 7. 📟 Telemetria e Depuração (Console)

Como saber o que seu código está "pensando" ou por que o robô tomou uma decisão errada?

1. No seu código, use `roberto.escreva("Verificando esquerda...")`.
2. No navegador, abra as **Ferramentas de Desenvolvedor** (Pressione `F12` ou `Ctrl+Shift+I`).
3. Vá para a aba **Console**.
4. Todas as mensagens do robô aparecerão lá. Se houver um erro de sintaxe no seu Python, ele também será exibido no Console (além da mensagem de status na tela).

---

## 8. ✅ Critérios de Aprovação

Para completar a missão, sua solução deve:

1. **Autonomia:** O robô deve chegar ao bloco Vermelho sem intervenção humana.
2. **Segurança:** O robô não pode colidir com paredes (Game Over).
3. **Robustez:** O código deve funcionar em mapas aleatórios (clique em "Novo Mapa" para provar).
4. **Entrega:** O arquivo `.py` baixado deve ser enviado na plataforma.

**Boa sorte, Operador. O Roberto conta com você.**

---

## 9. 🎖 Créditos

`Projeto Thayane` is developed with 💜 by  [Henry Hamon](https://github.com/henryhamon)