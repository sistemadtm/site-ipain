# Configuração do Supabase

Este guia explica como configurar o Supabase para o projeto Indicador Profissional.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Escolha sua organização
5. Preencha:
   - **Name**: indicador-profissional
   - **Database Password**: (escolha uma senha forte)
   - **Region**: South America (São Paulo) - sa-east-1
6. Clique em "Create new project"

## 2. Configurar Variáveis de Ambiente

1. No dashboard do Supabase, vá em **Settings > API**
2. Copie as seguintes informações:
   - **Project URL**
   - **anon public key**
   - **service_role key** (mantenha em segredo)

3. Crie o arquivo `.env.local` na raiz do projeto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

## 3. Executar o Schema do Banco

### Para Banco Novo:
1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor e clique em "Run"

### Para Banco Existente (Migração):
Se você já tem um banco criado com versão anterior do schema:
1. Execute o arquivo `supabase/migration-fix-policies.sql`
2. Isso corrigirá policies problemáticas e adicionará melhorias

Isso criará todas as tabelas, políticas de segurança e dados iniciais.

## 4. Configurar Autenticação

1. Vá em **Authentication > Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (desenvolvimento)
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

3. Em **Auth > Providers**, configure os provedores desejados (opcional):
   - Google
   - GitHub
   - etc.

## 5. Configurar Storage (Opcional)

Para upload de imagens de perfil e posts do blog:

1. Vá em **Storage**
2. Crie um bucket chamado `avatars`
3. Crie um bucket chamado `blog-images`
4. Configure as políticas de acesso conforme necessário

## 6. Testar a Conexão

Execute o projeto:

```bash
npm run dev
```

Acesse:
- `http://localhost:3000/register` - Para criar uma conta
- `http://localhost:3000/login` - Para fazer login
- `http://localhost:3000/admin` - Para acessar o painel admin (após criar um usuário admin)

## 7. Criar Usuário Admin

Após criar sua primeira conta, você precisa promovê-la para admin:

1. No dashboard do Supabase, vá em **Table Editor > profiles**
2. Encontre seu usuário
3. Edite o campo `role` para `admin`
4. Salve as alterações

Agora você pode acessar `/admin` com sua conta.

## 8. Estrutura do Banco

O banco possui as seguintes tabelas principais:

- **profiles**: Perfis de usuário (admin, dentist, patient)
- **dentists**: Dados específicos dos dentistas
- **patients**: Dados específicos dos pacientes
- **service_locations**: Locais de atendimento (universidades, clínicas)
- **appointments**: Agendamentos
- **blog_posts**: Posts do blog
- **blog_categories**: Categorias do blog
- **states/cities**: Estados e cidades do Brasil

## 9. Funcionalidades Implementadas

### Para Administradores:
- Dashboard com estatísticas
- Gerenciar dentistas
- Gerenciar pacientes
- Gerenciar locais de atendimento
- Gerenciar blog (posts e categorias)
- Visualizar agendamentos

### Para Dentistas:
- Perfil profissional
- Definir se é voluntário ou não
- Escolher local de atendimento
- Gerenciar disponibilidade
- Visualizar agendamentos

### Para Pacientes:
- Buscar dentistas
- Filtrar por localização e especialidade
- Agendar consultas
- Visualizar histórico

## 10. Próximos Passos

1. Implementar upload de imagens
2. Sistema de notificações
3. Integração com calendário
4. Sistema de avaliações
5. Chat entre dentista e paciente
6. Relatórios e analytics

## Troubleshooting

### Erro de conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de permissão
- Verifique as políticas RLS (Row Level Security)
- Confirme se o usuário tem o role correto

### Erro no schema
- Execute o SQL novamente
- Verifique se não há conflitos de nomes
- Para bancos existentes, use `migration-fix-policies.sql`

### Erro de policies
- Verifique se aplicou as correções de policies
- Execute: `SELECT * FROM pg_policies WHERE tablename = 'dentists';`
- Confirme se o usuário tem role correto na tabela profiles

## Suporte

Para dúvidas sobre o Supabase:
- [Documentação oficial](https://supabase.com/docs)
- [Discord da comunidade](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)