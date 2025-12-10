# 🧹 Simplificação da Tabela Dentists

## 📋 Mudanças Realizadas

### ✅ **Campos Adicionados**
- `phone` - Telefone de contato
- `address` - Endereço do consultório
- `city` - Cidade onde atende
- `state` - Estado onde atende

### ❌ **Campos Removidos**
- `experience_years` - Anos de experiência (desnecessário)
- `consultation_fee` - Taxa de consulta (não usado)
- `accepts_insurance` - Aceita convênio (não usado)
- `available_days` - Dias disponíveis (não usado)
- `available_hours_start` - Horário início (não usado)
- `available_hours_end` - Horário fim (não usado)
- `service_location_id` - Referência para service_locations (simplificado)

## 🎯 **Estrutura Final da Tabela Dentists**

```sql
CREATE TABLE dentists (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  cro_number TEXT UNIQUE NOT NULL,
  specialties TEXT[],
  is_volunteer BOOLEAN DEFAULT false,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  -- Dados de contato e localização
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## 🔄 **Como Aplicar as Mudanças**

### Para Banco Novo:
```sql
-- Use o schema.sql atualizado
-- Todas as mudanças já estão incluídas
```

### Para Banco Existente:
```sql
-- Execute a migração
\i migration-simplify-dentists.sql
```

## 📝 **Benefícios da Simplificação**

1. **Menos Complexidade** - Tabela mais simples e focada
2. **Melhor Performance** - Menos campos = consultas mais rápidas
3. **Manutenção Fácil** - Menos código para manter
4. **Dados Centralizados** - Tudo do dentista em uma tabela
5. **Interface Limpa** - Formulário mais simples e direto

## 🔧 **Arquivos Atualizados**

- `supabase/schema.sql` - Schema principal atualizado
- `lib/database.types.ts` - Tipos TypeScript atualizados
- `app/painel-dentista/actions.ts` - Actions simplificadas
- `app/painel-dentista/page.tsx` - Formulário limpo
- `supabase/migration-simplify-dentists.sql` - Migração para bancos existentes

## ✅ **Funcionalidades Mantidas**

- ✅ Cadastro de dentista
- ✅ Dados de contato (telefone)
- ✅ Localização (endereço, cidade, estado)
- ✅ Especialidades
- ✅ Biografia profissional
- ✅ Status de voluntário
- ✅ Status ativo/inativo
- ✅ Número do CRO

## 🚫 **Funcionalidades Removidas**

- ❌ Anos de experiência
- ❌ Taxa de consulta
- ❌ Aceita convênio
- ❌ Horários de disponibilidade
- ❌ Dias da semana disponíveis
- ❌ Vinculação com service_locations

## 🎯 **Resultado**

O painel-dentista agora é mais simples, rápido e focado no essencial. Todos os dados necessários estão centralizados na tabela `dentists`, eliminando a complexidade desnecessária.