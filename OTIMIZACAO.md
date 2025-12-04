# Guia de Otimização - Indicador Profissional

## 🚀 Performance

### 1. Imagens
```typescript
// Usar Next/Image para otimização automática
import Image from 'next/image'

<Image
  src="/profissional.jpg"
  alt="Nome do Profissional"
  width={400}
  height={400}
  loading="lazy"
  quality={85}
/>
```

### 2. Fonts
```typescript
// Já implementado com Inter
// Font display: swap para evitar FOIT
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
```

### 3. Code Splitting
```typescript
// Lazy loading de componentes pesados
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./Map'), {
  loading: () => <p>Carregando mapa...</p>,
  ssr: false
})
```

### 4. Caching
```typescript
// Configurar cache headers
export const revalidate = 3600 // 1 hora

// Ou usar ISR
export async function generateStaticParams() {
  // Gerar páginas estáticas
}
```

## 🔍 SEO Avançado

### 1. Páginas de Localização
Criar páginas para cada cidade:
```
/profissionais/sao-paulo
/profissionais/rio-de-janeiro
/profissionais/belo-horizonte
```

### 2. Schema Markup Adicional
```typescript
// LocalBusiness Schema
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dr. João Silva",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1000",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01310-100"
  },
  "telephone": "+55-11-98765-4321"
}
```

### 3. Breadcrumbs
```typescript
// Implementar breadcrumbs
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://indicadorprofissional.com.br"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Localizador",
    "item": "https://indicadorprofissional.com.br/localizador"
  }]
}
```

### 4. FAQ Schema
```typescript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Como encontrar um profissional?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Use nosso localizador..."
    }
  }]
}
```

## 📊 Analytics

### Google Analytics 4
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
```

### Eventos Personalizados
```typescript
// Rastrear cliques em profissionais
onClick={() => {
  event({
    action: 'click_professional',
    category: 'engagement',
    label: professional.name,
  })
}}

// Rastrear buscas
onSearch={(query) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
  })
}}
```

## 🎯 Conversão

### 1. Call-to-Actions
- Botões destacados
- Textos persuasivos
- Posicionamento estratégico
- Cores contrastantes

### 2. Formulários
- Campos mínimos necessários
- Validação em tempo real
- Mensagens de erro claras
- Auto-complete habilitado

### 3. Trust Signals
- Número de profissionais
- Selos de verificação
- Depoimentos
- Estatísticas

## 🔐 Segurança

### Headers Adicionais
```typescript
// next.config.ts
headers: [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
]
```

### Rate Limiting
```typescript
// Implementar rate limiting na API
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de requisições
})
```

## 📱 PWA

### Service Worker
```typescript
// Implementar service worker para offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

### Instalação
```typescript
// Prompt de instalação
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Mostrar botão de instalação
});
```

## 🧪 Testes

### Lighthouse
```bash
# Rodar Lighthouse
npx lighthouse https://indicadorprofissional.com.br --view

# Metas:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 95
# SEO: 100
```

### Testing Library
```typescript
// Testes de componentes
import { render, screen } from '@testing-library/react'

test('renders professional card', () => {
  render(<ProfessionalCard {...mockData} />)
  expect(screen.getByText('Dr. João Silva')).toBeInTheDocument()
})
```

## 📈 Monitoramento

### Ferramentas
1. **Google Search Console**
   - Monitorar indexação
   - Verificar erros
   - Analisar queries

2. **Google Analytics**
   - Tráfego
   - Conversões
   - Comportamento

3. **Sentry** (opcional)
   - Monitorar erros
   - Performance tracking

4. **Vercel Analytics**
   - Core Web Vitals
   - Real User Monitoring

## 🎨 Acessibilidade

### ARIA Labels
```typescript
<button aria-label="Buscar profissionais">
  <Search />
</button>
```

### Keyboard Navigation
```typescript
// Garantir navegação por teclado
onKeyDown={(e) => {
  if (e.key === 'Enter') {
    handleClick()
  }
}}
```

### Screen Readers
```typescript
// Texto para screen readers
<span className="sr-only">
  Profissional verificado
</span>
```

## 🌍 Internacionalização (Futuro)

### i18n
```typescript
// next.config.ts
i18n: {
  locales: ['pt-BR', 'en', 'es'],
  defaultLocale: 'pt-BR',
}
```

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Google Analytics instalado
- [ ] Search Console verificado
- [ ] Sitemap submetido
- [ ] SSL/HTTPS configurado
- [ ] CDN configurado
- [ ] Backup configurado
- [ ] Monitoramento ativo
- [ ] Testes de performance
- [ ] Testes de segurança

## 🔄 Manutenção

### Mensal
- Verificar broken links
- Atualizar dependências
- Revisar analytics
- Otimizar imagens

### Trimestral
- Audit de SEO
- Testes de performance
- Revisão de conteúdo
- Atualização de blog

### Anual
- Redesign (se necessário)
- Migração de tecnologias
- Expansão de features
- Análise competitiva
