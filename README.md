# Street Fitness - Website Institucional e Landing Page

Template moderno e responsivo para academias de ginástica, com arquitetura white-label totalmente configurável.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura do Projeto

```
/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Hero.tsx
│   │   ├── SEO.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ScrollReveal.tsx
│   ├── Content.ts          # ⭐ CONFIGURAÇÃO PRINCIPAL
│   ├── types.ts            # TypeScript interfaces
│   ├── index.css           # CSS global + variáveis
│   └── MainPage.tsx        # Layout principal
├── public/
│   └── images/            # Todas as imagens do site
├── App.tsx
├── index.tsx
└── index.html
```

## ⚙️ Configuração (White-Label)

### 1. Editar `src/Content.ts`

Este é o **único arquivo** que você precisa editar para personalizar o site:

```typescript
export const content: ContentConfig = {
  // Cores
  colors: {
    primary: '#FFC857',      // Cor principal
    primaryDark: '#ffbd37',  // Hover
    // ...
  },
  
  // Informações da empresa
  infos: {
    name: "Athlo",
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    email: "contato@athlo.com.br",
    address: "Rua dos Atletas, 123",
    // ...
  },
  
  // Textos do Hero
  hero: {
    headline: {
      line1: "ONDE ATLETAS",
      line2: "SÃO FORMADOS",
    },
    // ...
  },
  // ... e todas as outras seções
}
```

### 2. Substituir Imagens

Coloque suas imagens em `public/images/` mantendo os nomes:

- `hero-background.jpg` - Fundo do Hero (1920x1080)
- `member1.jpg` - `member4.jpg` - Avatares de membros
- `partner1.png` - `partner5.png` - Logos de parceiros
- `about.jpg` - Imagem da seção Sobre
- E outras conforme `Content.ts`

### 3. Atualizar Cores no CSS

Edite `src/index.css` (linhas 10-16) para coincidir com `Content.ts`:

```css
:root {
  --color-primary: #FFC857;  /* Mesma cor do Content.ts */
  --color-primary-dark: #ffbd37;
  /* ... */
}
```

## 🎨 Personalização Avançada

### Ativar/Desativar Seções

Em `Content.ts`, cada seção tem um `enabled: boolean`:

```typescript
hero: {
  enabled: true,  // true = mostrar, false = esconder
  // ...
},
```

### Adicionar Novos Componentes

1. Criar em `src/components/MeuComponente.tsx`
2. Importar e adicionar no `src/MainPage.tsx`
3. Configurar dados em `src/Content.ts`

## 🛠️ Stack Tecnológica

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animações)
- **React Helmet Async** (SEO)
- **Lucide React** (ícones)

## 📱 Mobile-First & Responsivo

O template é 100% responsivo e otimizado para:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## ♿ Acessibilidade

- ✅ Semântica HTML correta
- ✅ Alt text em todas as imagens
- ✅ Contraste de cores WCAG AA
- ✅ Navegação por teclado
- ✅ ARIA labels
- ✅ Focus states visíveis

## 🔒 Segurança

- Content Security Policy (CSP) configurado
- Proteção contra XSS
- Headers de segurança

## 🚢 Deploy

### Netlify (Recomendado)

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Criar arquivo `public/_redirects`:
   ```
   /*    /index.html   200
   ```

## 📄 Licença

Desenvolvido pela **TAKOA Digital**

---

**Dúvidas?** Consulte o `INTERNAL_README.md` para documentação técnica completa.
