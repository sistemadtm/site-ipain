# Guia Rápido - Indicador Profissional

## 🚀 Início Rápido

### 1. Instalação
```bash
pnpm install
```

### 2. Desenvolvimento
```bash
pnpm dev
```

Acesse: http://localhost:3000

## 📱 Navegação

### Desktop
- Menu completo no topo de todas as páginas
- Links: Localizador, Blog, Área do Profissional

### Mobile
- Botão hamburger (☰) no canto superior direito
- Menu dropdown com todos os links
- Fecha automaticamente ao clicar em um link

## 🎨 Componentes Reutilizáveis

### Header
```typescript
import { Header } from "@/components/header";

<Header />
```

### Footer
```typescript
import { Footer } from "@/components/footer";

<Footer />
```

## 📄 Páginas

### Home (/)
- Hero section
- Estatísticas
- Features
- CTA
- Footer

### Localizador (/localizador)
- Filtros por estado e cidade
- Cards de profissionais
- Resultados dinâmicos

### Perfil (/profissional/[id])
- Informações completas
- Contato direto (WhatsApp, Telefone)
- Redes sociais

### Blog (/blog)
- Listagem de artigos
- Grid responsivo
- CTA integrado

### Artigo (/blog/[slug])
- Conteúdo completo
- Sidebar
- Artigos relacionados

### Login (/login)
- Tabs login/cadastro
- Formulários validados

## 🎨 Paleta de Cores

```css
/* Principal */
--slate-900: #0f172a
--slate-800: #1e293b

/* Secundário */
--gray-600: #4b5563
--gray-400: #9ca3af

/* Background */
--white: #ffffff
--gray-50: #f9fafb
--slate-50: #f8fafc

/* Bordas */
--gray-100: #f3f4f6
--gray-200: #e5e7eb
```

## 🔧 Customização

### Alterar Logo
Edite `components/header.tsx` e `components/footer.tsx`:
```typescript
<div className="w-10 h-10 bg-slate-900 rounded-lg">
  <span className="text-white font-bold text-lg">IP</span>
</div>
```

### Alterar Cores
Edite `app/globals.css` ou use classes Tailwind diretamente.

### Adicionar Página
1. Crie arquivo em `app/nova-pagina/page.tsx`
2. Adicione link no `components/header.tsx`
3. Adicione ao sitemap em `app/sitemap.ts`

## 📊 Dados Mockados

### Profissionais
Localização: `app/localizador/page.tsx`
```typescript
const profissionais = [
  {
    id: 1,
    nome: "Dr. João Silva",
    // ...
  }
]
```

### Artigos do Blog
Localização: `app/blog/page.tsx`
```typescript
const posts = [
  {
    id: 1,
    titulo: "...",
    // ...
  }
]
```

## 🔍 SEO

### Alterar Metadados de Página
```typescript
// Em qualquer page.tsx
export const metadata: Metadata = {
  title: "Título da Página",
  description: "Descrição da página",
};
```

### Atualizar URL Base
Edite `app/layout.tsx`:
```typescript
metadataBase: new URL('https://seu-dominio.com.br')
```

## 🚀 Deploy

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas
```bash
# Build
pnpm build

# Os arquivos estarão em .next/
```

## 🐛 Troubleshooting

### Menu mobile não abre
- Verifique se o componente Header está importado
- Verifique console do navegador por erros

### Imagens não carregam
- Verifique `next.config.ts` para domínios permitidos
- Use Next/Image para otimização

### Erros de build
```bash
# Limpar cache
rm -rf .next
pnpm install
pnpm build
```

## 📞 Suporte

Para dúvidas:
1. Verifique a documentação em `SEO-GUIDE.md`
2. Consulte `PROJETO-COMPLETO.md`
3. Leia `OTIMIZACAO.md` para performance

## ✅ Checklist Pré-Deploy

- [ ] Testar todas as páginas
- [ ] Verificar menu mobile
- [ ] Testar responsividade
- [ ] Validar formulários
- [ ] Verificar links
- [ ] Testar performance (Lighthouse)
- [ ] Configurar variáveis de ambiente
- [ ] Atualizar URLs
- [ ] Adicionar Google Analytics
- [ ] Submeter sitemap

## 🎯 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev

# Build
pnpm build

# Produção local
pnpm start

# Lint
pnpm lint

# Limpar cache
rm -rf .next

# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📱 Testes Mobile

### Chrome DevTools
1. F12 para abrir DevTools
2. Ctrl+Shift+M para toggle device toolbar
3. Testar diferentes dispositivos

### Dispositivos Reais
- Acesse via IP local: `http://192.168.x.x:3000`
- Use ngrok para teste externo

## 🎨 Adicionar Ícones

```typescript
import { IconName } from "lucide-react";

<IconName size={20} className="text-slate-900" />
```

Biblioteca: https://lucide.dev/icons/

## 📝 Boas Práticas

1. **Sempre use componentes reutilizáveis**
2. **Mantenha consistência no design**
3. **Teste em mobile primeiro**
4. **Otimize imagens antes de usar**
5. **Valide acessibilidade**
6. **Documente mudanças importantes**

---

**Dica**: Mantenha este guia atualizado conforme o projeto evolui!
