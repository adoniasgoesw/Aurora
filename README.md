# Aurora Pro

**Automatize seu fluxo criativo no Meta AI.**

O **Aurora Pro** é uma extensão Chrome (Manifest V3) que automatiza a geração de imagens e animações no [Meta AI](https://meta.ai). Este repositório contém a **landing page** do produto e a documentação do sistema.

---

## Identificação do Projeto

| Campo | Valor |
|-------|-------|
| **Nome** | Aurora Pro |
| **Versão** | 1.0.3 |
| **Tipo** | Extensão Chrome (Manifest V3) |
| **Autor** | Adonias Goes |
| **Plataforma** | Meta AI (meta.ai / www.meta.ai) |

---

## Stack e Deploy

| Componente | Tecnologia |
|------------|------------|
| **Landing** | React 19, Vite 7, Tailwind CSS v4 |
| **Extensão** | Chrome Extension Manifest V3 |
| **Deploy da landing** | Netlify |

---

## O que é o Aurora Pro

Sistema de automação que opera sobre a página do Meta AI para:

1. **Enviar prompts em lote** — Um prompt por linha, processados automaticamente.
2. **Gerar imagens** — 4 imagens por prompt via IA do Meta.
3. **Animar imagens** — Envio automático de imagens para animação (opcional).
4. **Organizar arquivos** — Salvamento em pastas estruturadas (`assets/images`, `assets/animations`, `assets/videos`).

O sistema monitora o status de cada tarefa, trata erros automaticamente e permite pausar e retomar o processo.

---

## Funcionalidades

### Extensão (Meta AI)

- Prompts em lote (um por linha).
- Geração de imagens (4 por prompt) ou vídeos diretos (1 por prompt).
- Modo **Animar**: gera imagem → salva → envia para animação → baixa animação.
- Fila de tarefas com status em tempo real (pendente, pausado, concluído, erro).
- Fila de recuperação com retentativas (até 3x).
- Timeouts e proteções contra travamento (Circuit Breaker, Watchdog).
- Organização automática em diretório configurável.

### Landing Page

- Alternância de idioma **EN / PT-BR**.
- Tema **claro / escuro**.
- Download da extensão (`aurora-pro.zip`).
- Layout responsivo.

---

## Desenvolvimento

```bash
cd client
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

---

## Build

```bash
cd client
npm run build
```

- Gera o site estático em `client/dist/`.
- Inclui o zip da extensão (`aurora-pro.zip`) a partir de `Aurora Pro/dist/`.

---

## Deploy (Netlify)

| Configuração | Valor |
|--------------|-------|
| **Build command** | `npm run build` |
| **Publish directory** | `client/dist` |
| **Redirects** | `_redirects` em `public/` (SPA: `/* /index.html 200`) |

---

## Estrutura do Sistema (Extensão)

O painel flutuante da extensão é dividido em **5 abas**:

| Aba | Função |
|-----|--------|
| **Principal** | Configuração, prompts, controles e barra de progresso |
| **Fila** | Gerenciamento e status das tarefas (prompts ou animações) |
| **Images** | Lista de imagens geradas na sessão |
| **Animações** | Lista de animações geradas na sessão |
| **Pasta** | Arquivos em `assets/images` e correspondência com animações |

---

### Aba Principal

**Prompts**

- Um prompt por linha (separados por Enter); processamento automático um a um.

**Alternância de Animação**

- **Animar ativado:** Gerar imagem → Salvar → Enviar para animação → Gerar animação → Baixar.
- **Animar desativado:** Gerar imagem → Salvar.

**Tipo de Geração**

- **Imagens** — 4 imagens por prompt (padrão).
- **Vídeos** — 1 vídeo por prompt (sem etapa de imagem).

**Diretório base**

- Estrutura: `[Base]/assets/images/`, `assets/animations/`, `assets/videos/`.
- Recomendado: File System Access API (selecionar pasta).

**Controles**

| Botão | Ação |
|-------|------|
| Iniciar Download | Inicia o processamento |
| Pausar | Pausa o processo |
| Retomar | Continua (quando há pendentes) |
| Limpar | Remove prompts e limpa listas/estado |

---

### Aba Fila

- **Imagens:** filas de 10 prompts (`QUEUE_SIZE`); expansão por clique no cabeçalho.
- **Animações:** lotes de 12 imagens (`ANIMATION_BATCH_SIZE`).

**Cores de status**

| Cor | Significado |
|-----|-------------|
| Azul | Pendente |
| Laranja | Pausado |
| Verde (✓) | Concluído |
| Vermelho (✗) | Erro / aguardando recuperação |
| Cinza | Animado, não baixado |

**Recuperação:** falhas entram na fila de recuperação; até 3 tentativas (`MAX_RETRY_ATTEMPTS`).

---

### Abas Imagens e Animações

- **Imagens:** agrupadas por prompt; nomenclatura `01. nome_do_prompt_1.jpg` (zero à esquerda).
- **Animações:** agrupadas por prompt; `01. nome_do_prompt_1.mp4`.
- Verde (✓) = salvo; Vermelho (✗) = não salvo.

---

### Aba Pasta

- Lista todos os arquivos em `assets/images` (incluindo sessões anteriores).
- Cinza = sem animação; Amarelo = com animação correspondente em `assets/animations`.
- Correspondência por nome base: `01. Nome_1.jpg` ↔ `01. Nome_1.mp4`.

---

## Proteção contra Travamentos

| Etapa | Timeout | Mensagem |
|-------|---------|----------|
| Geração de imagem | 5 min | "Meta não está respondendo." |
| Clique em Animar | 2 min | "A extensão pode estar com problema." |
| Processamento da animação | 5 min | "Meta não está respondendo." |
| Watchdog (geral) | 5 min sem atividade | "Sistema travou (sem atividade)." |

- **Circuit Breaker:** após 1 falha do Meta, o sistema interrompe.
- **Watchdog:** verificação a cada 5 s.

---

## Casos de Erro e Recuperação

**Geração:** imagem/vídeo não gerado em 5 min → para e exibe "Meta não está respondendo". Botão enviar indisponível → para após 5 min.

**Animação:** imagem não enviada em 2 min → mensagem de problema na extensão; animação não gerada em 5 min → para; download falhou → item em vermelho, retentativa até 2x.

**Recuperação:** prompts com falha na fila de recuperação (até 3 tentativas). Ao pausar, use **Retomar** para continuar sem perder prompts.

---

## Fluxo Técnico Resumido

**Modo Imagens (sem Animar)**  
Envia prompt → aguarda 4 imagens (5 min máx) → baixa (FS ou Chrome). Delay entre prompts: 3–6 s; entre filas: 10 s.

**Modo Imagens + Animar**  
Gera e baixa todas as imagens → aguarda 10 s → processa animações em lotes de 12 (Animar por imagem, 2 min máx; vídeo 5 min máx; download com retry até 2x).

**Modo Vídeos**  
Envia prompt → aguarda 1 vídeo (5 min máx) → baixa.

---

## Recomendações de Uso

| Computador | Prompts recomendados |
|------------|----------------------|
| Fraco | até 50 |
| Mediano | até 100 |
| Potente | 100 a 200 |

Comece com menos e aumente gradualmente (ex.: 10 → 20 → 30 → 50). Modo Animar reduz o limite (ex.: 50 vs 200). Desempenho depende da internet e do serviço Meta AI.

---

## Estrutura de Arquivos

### Repositório (Landing + scripts)

```
web/
├── client/
│   ├── src/
│   │   ├── sections/    # HeroSection, Navbar
│   │   ├── contexts/    # ThemeContext, LocaleContext
│   │   └── pages/
│   ├── public/
│   │   ├── _redirects   # Netlify SPA
│   │   └── aurora-pro.zip
│   └── scripts/
│       └── zip-aurora.js
└── README.md
```

### Extensão (Aurora Pro)

```
Aurora Pro/
├── manifest.json
├── content.js          # Painel, fluxos, DOM
├── content.css
├── background.js       # Service worker (downloads, fetch)
├── popup.html / popup.js / popup.css
├── obfuscate-build.js  # Build com ofuscação
├── dist/               # Distribuição (JS ofuscado)
└── icons/              # 16, 48, 128px
```

Build da extensão: `npm run build` (gera `dist/` com JS ofuscado).

---

## Resumo

O Aurora Pro oferece:

- Organização automática de arquivos (imagens, animações, vídeos).
- Monitoramento de tarefas em tempo real e fila de recuperação.
- Controle de erros, timeouts e recuperação (pausar/retomar).
- Landing page moderna (React 19, Vite 7, Tailwind v4) com download da extensão, temas e localização EN/PT-BR.

Permite gerar grandes volumes de conteúdo visual no Meta AI com mínimo esforço manual.
