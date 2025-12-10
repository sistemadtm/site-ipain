-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis de usuário
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'patient' CHECK (role IN ('admin', 'dentist', 'patient')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de estados
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de cidades
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de locais de atendimento (universidades, clínicas, etc.)
CREATE TABLE service_locations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('university', 'clinic', 'hospital', 'private_practice')),
  address TEXT NOT NULL,
  city_id INTEGER REFERENCES cities(id),
  phone TEXT,
  email TEXT,
  website TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dentistas/voluntários
CREATE TABLE dentists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cro_number TEXT UNIQUE NOT NULL,
  specialties TEXT[], -- Array de especialidades
  is_volunteer BOOLEAN DEFAULT false,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  -- Dados de contato e localização
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pacientes
CREATE TABLE patients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  birth_date DATE,
  phone TEXT,
  address TEXT,
  city_id INTEGER REFERENCES cities(id),
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_conditions TEXT,
  allergies TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Removido: Tabela de agendamentos (não será utilizada)

-- Tabela de categorias do blog
CREATE TABLE blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de posts do blog
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES blog_categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Removido: Tabela de comentários do blog (não será utilizada)

-- Inserir estados brasileiros
INSERT INTO states (name, code) VALUES
('Acre', 'AC'),
('Alagoas', 'AL'),
('Amapá', 'AP'),
('Amazonas', 'AM'),
('Bahia', 'BA'),
('Ceará', 'CE'),
('Distrito Federal', 'DF'),
('Espírito Santo', 'ES'),
('Goiás', 'GO'),
('Maranhão', 'MA'),
('Mato Grosso', 'MT'),
('Mato Grosso do Sul', 'MS'),
('Minas Gerais', 'MG'),
('Pará', 'PA'),
('Paraíba', 'PB'),
('Paraná', 'PR'),
('Pernambuco', 'PE'),
('Piauí', 'PI'),
('Rio de Janeiro', 'RJ'),
('Rio Grande do Norte', 'RN'),
('Rio Grande do Sul', 'RS'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Santa Catarina', 'SC'),
('São Paulo', 'SP'),
('Sergipe', 'SE'),
('Tocantins', 'TO');

-- Inserir algumas categorias padrão do blog
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Saúde Bucal', 'saude-bucal', 'Dicas e informações sobre cuidados com a saúde bucal', '#10B981'),
('Tratamentos', 'tratamentos', 'Informações sobre diferentes tipos de tratamentos odontológicos', '#3B82F6'),
('Prevenção', 'prevencao', 'Artigos sobre prevenção de problemas dentários', '#F59E0B'),
('Notícias', 'noticias', 'Últimas notícias do mundo da odontologia', '#EF4444'),
('Dicas', 'dicas', 'Dicas práticas para manter a saúde bucal', '#8B5CF6');

-- RLS (Row Level Security) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dentists ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
-- Removido: RLS para appointments
ALTER TABLE service_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
-- Removido: RLS para blog_comments

-- Policies para profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies para dentists
CREATE POLICY "Anyone can view active dentists or own profile" ON dentists FOR SELECT USING (
  is_active = true OR user_id = auth.uid()
);
CREATE POLICY "Users can create dentist profile" ON dentists FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Dentists can update their own profile" ON dentists FOR UPDATE USING (
  user_id = auth.uid()
);
CREATE POLICY "Admins can manage all dentists" ON dentists FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies para patients
CREATE POLICY "Patients can view their own data" ON patients FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Patients can update their own data" ON patients FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Patients can create their own profile" ON patients FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Dentists can view patients in their service location" ON patients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.is_active = true
  )
);

-- Removido: Policies para appointments

-- Policies para blog
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Authors can manage their own posts" ON blog_posts FOR ALL USING (author_id = auth.uid());
CREATE POLICY "Admins can manage all blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Anyone can view blog categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage blog categories" ON blog_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Removido: Policies para blog_comments

-- Policies para service_locations
CREATE POLICY "Anyone can view active service locations" ON service_locations FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage service locations" ON service_locations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dentists_updated_at BEFORE UPDATE ON dentists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Removido: Trigger para appointments
CREATE TRIGGER update_service_locations_updated_at BEFORE UPDATE ON service_locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();