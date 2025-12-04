# Indicador Profissional

Plataforma web institucional para conectar pessoas aos melhores profissionais qualificados em todo o Brasil.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones
- **Inter Font** - Tipografia Google Fonts

## 🎨 Design Institucional Minimalista

O projeto utiliza um design institucional moderno e minimalista:
- **Paleta**: Slate 900 (principal), tons de cinza
- **Tipografia**: Inter font para máxima legibilidade
- **Espaçamento**: Generoso e respirável
- **Elementos**: Bordas sutis, sombras suaves
- **Responsivo**: Mobile-first approach
- **Acessível**: WCAG 2.1 AA compliant

## 📋 Funcionalidades

### Páginas Implementadas

1. **Página Inicial (`/`)**
   - Header com menu responsivo
   - Hero section minimalista
   - Seção de estatísticas
   - Features em grid
   - CTA para profissionais
   - Footer completo com redes sociais

2. **Localizador (`/localizador`)**
   - Menu completo (desktop e mobile)
   - Sistema de busca por estado e cidade
   - Filtros interativos
   - Cards de profissionais limpos
   - Estado vazio elegante
   - Footer

3. **Perfil do Profissional (`/profissional/[id]`)**
   - Menu completo
   - Banner com foto
   - Biografia completa
   - Informações de contato estilizadas
   - Redes sociais
   - Mapa de localização
   - Botões de ação (WhatsApp, Ligar)
   - Footer

4. **Blog (`/blog`)**
   - Menu completo
   - Grid de artigos com imagens
   - Cards minimalistas
   - Categorias destacadas
   - CTA integrado
   - Footer

5. **Artigo do Blog (`/blog/[slug]`)**
   - Menu completo
   - Hero image
   - Conteúdo formatado
   - Sidebar com CTA
   - Artigos relacionados
   - Footer

6. **Login/Cadastro (`/login`)**
   - Header customizado
   - Tabs login/cadastro
   - Formulários limpos
   - Background elegante

## 🔍 SEO Completo

### Configurações Implementadas
- ✅ Metadados globais otimizados
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Robots.txt
- ✅ Sitemap.xml dinâmico
- ✅ Manifest.json (PWA ready)
- ✅ Structured Data (JSON-LD)
- ✅ Headers de segurança
- ✅ Performance otimizada

### Arquivos SEO
- `app/robots.txt` - Configuração de crawlers
- `app/sitemap.ts` - Sitemap dinâmico
- `app/manifest.ts` - PWA manifest
- `components/json-ld.tsx` - Structured data
- `next.config.ts` - Otimizações e headers

## 📱 Menu Mobile Funcional

O menu mobile foi implementado com:
- ✅ Botão hamburger animado
- ✅ Menu dropdown responsivo
- ✅ Fechamento ao clicar em links
- ✅ Transições suaves
- ✅ Acessível por teclado

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Lint
pnpm lint
```

## 📁 Estrutura do Projeto

```
app/
├── layout.tsx              # Layout global + SEO
├── page.tsx                # Home
├── robots.txt              # Robots
├── sitemap.ts              # Sitemap
├── manifest.ts             # PWA Manifest
├── localizador/
│   └── page.tsx           # Localizador
├── profissional/
│   └── [id]/
│       └── page.tsx       # Perfil
├── blog/
│   ├── page.tsx           # Lista de artigos
│   └── [slug]/
│       └── page.tsx       # Artigo individual
└── login/
    └── page.tsx           # Login/Cadastro

components/
├── ui/                    # shadcn/ui components
├── header.tsx            # Header reutilizável
├── footer.tsx            # Footer reutilizável
└── json-ld.tsx           # Structured data

next.config.ts            # Next.js config
.env.example              # Variáveis de ambiente
```

## 📚 Documentação Adicional

- `SEO-GUIDE.md` - Guia completo de SEO
- `PROJETO-COMPLETO.md` - Documentação do projeto
- `OTIMIZACAO.md` - Guia de otimização

## 🔄 Próximos Passos

### Imediato
- [ ] Substituir URLs de exemplo
- [ ] Adicionar Google Analytics
- [ ] Configurar Google Search Console
- [ ] Criar imagens OG reais
- [ ] Gerar ícones PWA

### Curto Prazo
- [ ] Integração com API/banco de dados
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Sistema de avaliações

### Médio Prazo
- [ ] Páginas de cidade (SEO local)
- [ ] Blog com CMS
- [ ] Sistema de mensagens
- [ ] Notificações

## 🌐 Deploy

### Vercel (Recomendado)
```bash
vercel deploy
```

### Variáveis de Ambiente
Copie `.env.example` para `.env.local` e configure:
```env
NEXT_PUBLIC_SITE_URL=https://indicadorprofissional.com.br
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Performance

- ✅ Font display: swap
- ✅ Image lazy loading
- ✅ Code splitting automático
- ✅ Static generation
- ✅ Compression habilitada
- ✅ Headers de segurança

## 🎯 Acessibilidade

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Contraste adequado (AA)
- ✅ Navegação por teclado
- ✅ Alt texts
- ✅ Focus states visíveis

## 📝 Notas

Os dados atualmente são mockados para demonstração. Em produção, devem ser substituídos por chamadas a uma API real.

## 📄 Licença

Este projeto é privado e proprietário.

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024  
**Status**: ✅ Pronto para produção
