# Atendimento Voluntário - Documentação

## Visão Geral

O módulo de Atendimento Voluntário conecta pacientes que precisam de atendimento odontológico com dentistas voluntários e centros de atendimento gratuito em todo o Brasil.

## Estrutura de Páginas

### 1. `/voluntario` - Página Principal
- Apresentação do programa de atendimento voluntário
- Dois cards principais:
  - **Sou Paciente**: Link para cadastro de pacientes
  - **Sou Dentista**: Link para visualização de pacientes
- Lista de centros de atendimento gratuito (universidades)

### 2. `/voluntario/pacientes` - Cadastro de Pacientes
Formulário para pacientes solicitarem atendimento voluntário:
- Nome completo
- Telefone/WhatsApp
- E-mail (opcional)
- Cidade e Estado
- Descrição da necessidade (opcional)

**Funcionalidades:**
- Validação de campos obrigatórios
- Mensagem de sucesso após cadastro
- Informações sobre como funciona o processo

### 3. `/voluntario/dentistas` - Área do Dentista Voluntário
Interface para dentistas visualizarem pacientes cadastrados:
- Filtro por estado
- Busca por cidade ou nome
- Cards com informações dos pacientes:
  - Nome e localização
  - Descrição da necessidade
  - Telefone e e-mail
  - Data de cadastro
  - Botão para contato direto via WhatsApp

## Dados Mock

Atualmente o sistema usa dados mock (simulados). Para implementação em produção, você precisará:

### Backend/API
1. Criar tabela no banco de dados para pacientes voluntários:
```sql
CREATE TABLE pacientes_voluntarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  descricao TEXT,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'ativo'
);
```

2. Criar endpoints da API:
- `POST /api/voluntario/pacientes` - Cadastrar novo paciente
- `GET /api/voluntario/pacientes?estado=SP` - Listar pacientes (com filtros)
- `PUT /api/voluntario/pacientes/:id` - Atualizar status

3. Criar tabela para centros de atendimento:
```sql
CREATE TABLE centros_atendimento (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  endereco TEXT NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(255),
  especialidades TEXT[],
  horario VARCHAR(255),
  ativo BOOLEAN DEFAULT true
);
```

### Frontend - Integração com API

#### Cadastro de Pacientes (`app/voluntario/pacientes/page.tsx`)
Substituir o `handleSubmit` simulado por:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const response = await fetch('/api/voluntario/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setSubmitted(true);
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        cidade: '',
        estado: '',
        descricao: ''
      });
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  } finally {
    setLoading(false);
  }
};
```

#### Listagem de Pacientes (`app/voluntario/dentistas/page.tsx`)
Substituir os dados mock por:
```typescript
const [pacientes, setPacientes] = useState([]);

useEffect(() => {
  const fetchPacientes = async () => {
    const params = new URLSearchParams();
    if (estadoSelecionado !== 'Todos') {
      params.append('estado', estadoSelecionado);
    }
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    
    const response = await fetch(`/api/voluntario/pacientes?${params}`);
    const data = await response.json();
    setPacientes(data);
  };
  
  fetchPacientes();
}, [estadoSelecionado, searchTerm]);
```

## Melhorias Futuras

### Funcionalidades Adicionais
1. **Autenticação de Dentistas**
   - Login obrigatório para visualizar pacientes
   - Verificação de credenciais profissionais

2. **Sistema de Match**
   - Notificações quando novo paciente se cadastra na região
   - Histórico de atendimentos realizados

3. **Dashboard Administrativo**
   - Gerenciar centros de atendimento
   - Estatísticas de atendimentos
   - Moderação de cadastros

4. **Proteção de Dados**
   - LGPD compliance
   - Termo de consentimento
   - Opção de remover cadastro

5. **Gamificação**
   - Badges para dentistas voluntários
   - Ranking de atendimentos
   - Certificados de participação

### Integrações
- WhatsApp Business API para notificações automáticas
- Google Maps para visualização de distâncias
- Sistema de agendamento integrado

## Segurança e Privacidade

### Considerações Importantes
1. **Dados Sensíveis**: Telefone e e-mail são dados pessoais - implementar criptografia
2. **Acesso Restrito**: Apenas dentistas autenticados devem ver dados de pacientes
3. **Consentimento**: Adicionar checkbox de aceite de termos no cadastro
4. **Tempo de Retenção**: Definir política de exclusão de dados antigos

### LGPD
- Adicionar página de Política de Privacidade específica
- Termo de consentimento explícito
- Opção de exclusão de dados a qualquer momento
- Transparência sobre uso dos dados

## Navegação

O módulo está integrado ao site principal:
- Link no header: "Atendimento Voluntário"
- Seção destacada na home page
- Acessível via `/voluntario`

## Estilo Visual

O design segue o padrão do site:
- Cores principais: Teal/Verde-azulado para voluntário
- Ícones: Lucide React (Heart, Users, GraduationCap)
- Layout responsivo (mobile-first)
- Animações suaves e transições

## Próximos Passos

1. ✅ Estrutura de páginas criada
2. ✅ Design e UX implementados
3. ⏳ Criar API endpoints
4. ⏳ Integrar com banco de dados
5. ⏳ Implementar autenticação
6. ⏳ Adicionar sistema de notificações
7. ⏳ Testes e validação
8. ⏳ Deploy em produção
