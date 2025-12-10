# 🔄 Atualizações do Schema do Banco de Dados

## 📋 Problemas Corrigidos

### 1. **Policies Inválidas**
- ❌ **Problema**: Policy `"Dentists can view their patients"` fazia referência à tabela `appointments` que foi removida
- ✅ **Solução**: Criada nova policy `"Dentists can view patients in their service location"`

### 2. **Permissões para Service Locations**
- ❌ **Problema**: Dentistas não podiam criar/editar suas próprias localizações
- ✅ **Solução**: Adicionadas policies para INSERT e UPDATE em `service_locations`

### 3. **Criação de Perfis**
- ❌ **Problema**: Faltavam policies para criação de perfis de dentistas e pacientes
- ✅ **Solução**: Adicionadas policies de INSERT para ambas as tabelas

## 📁 Arquivos Criados

### `schema.sql` (Atualizado)
- Schema completo e corrigido para novos bancos
- Todas as policies corretas incluídas

### `migration-fix-policies.sql`
- Migração para bancos existentes
- Remove policies problemáticas e adiciona as corretas
- Inclui índices para melhor performance
- Adiciona cidades importantes

### `fix-policies.sql`
- Arquivo de correção rápida apenas para policies
- Use se quiser aplicar só as correções de permissão

## 🚀 Como Aplicar

### Para Banco Novo:
```sql
-- Execute apenas o schema.sql atualizado
-- Todas as correções já estão incluídas
```

### Para Banco Existente:
```sql
-- Execute o arquivo de migração
-- No Supabase SQL Editor, execute:
\i migration-fix-policies.sql
```

## 🔍 Principais Mudanças

### Policies Adicionadas:
1. `"Users can create dentist profile"` - Permite criação de perfil de dentista
2. `"Patients can create their own profile"` - Permite criação de perfil de paciente
3. `"Dentists can create service locations"` - Permite dentistas criarem localizações
4. `"Dentists can update their service locations"` - Permite edição de localizações próprias
5. `"Anyone can view active dentists or own profile"` - Permite ver perfil próprio mesmo se inativo

### Policies Removidas:
1. `"Dentists can view their patients"` - Referenciava tabela inexistente

### Índices Adicionados:
- `idx_dentists_user_id` - Melhora performance de consultas por usuário
- `idx_dentists_service_location_id` - Melhora joins com service_locations
- `idx_patients_user_id` - Melhora performance de consultas por usuário
- `idx_service_locations_city_id` - Melhora joins com cities
- `idx_cities_state_id` - Melhora joins com states

## ✅ Validação

Após aplicar as correções, teste:

1. **Criação de perfil de dentista** ✅
2. **Salvamento de localização** ✅
3. **Visualização de perfil próprio** ✅
4. **Edição de dados de localização** ✅

## 🔧 Troubleshooting

Se encontrar erros de permissão:

1. Verifique se o usuário tem role 'dentist' na tabela profiles
2. Confirme se as policies foram aplicadas corretamente
3. Teste com um usuário admin se necessário

## 📞 Suporte

Se precisar de ajuda, verifique:
- Logs do Supabase para erros específicos
- Policies ativas com: `SELECT * FROM pg_policies WHERE tablename = 'dentists';`
- Roles do usuário com: `SELECT role FROM profiles WHERE id = auth.uid();`