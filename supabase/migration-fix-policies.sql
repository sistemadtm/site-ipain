-- Migração para corrigir policies existentes
-- Execute este arquivo se você já tem um banco criado com o schema anterior

-- 1. Remover policies problemáticas
DROP POLICY IF EXISTS "Dentists can view their patients" ON patients;
DROP POLICY IF EXISTS "Anyone can view active dentists" ON dentists;

-- 2. Recriar policies corretas para dentists
CREATE POLICY "Anyone can view active dentists or own profile" ON dentists FOR SELECT USING (
  is_active = true OR user_id = auth.uid()
);

CREATE POLICY "Users can create dentist profile" ON dentists FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

-- 3. Adicionar policy correta para patients
CREATE POLICY "Patients can create their own profile" ON patients FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

CREATE POLICY "Dentists can view patients in their service location" ON patients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.is_active = true
  )
);

-- 4. Atualizar policies para service_locations
DROP POLICY IF EXISTS "Anyone can view active service locations" ON service_locations;

CREATE POLICY "Anyone can view active service locations" ON service_locations FOR SELECT USING (
  is_active = true OR 
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.service_location_id = service_locations.id
  )
);

CREATE POLICY "Dentists can create service locations" ON service_locations FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'dentist')
);

CREATE POLICY "Dentists can update their service locations" ON service_locations FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.service_location_id = service_locations.id
  )
);

-- 5. Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_dentists_user_id ON dentists(user_id);
CREATE INDEX IF NOT EXISTS idx_dentists_service_location_id ON dentists(service_location_id);
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_service_locations_city_id ON service_locations(city_id);
CREATE INDEX IF NOT EXISTS idx_cities_state_id ON cities(state_id);

-- 6. Adicionar algumas cidades importantes (se não existirem)
INSERT INTO cities (name, state_id) 
SELECT 'São Paulo', s.id FROM states s WHERE s.code = 'SP'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Rio de Janeiro', s.id FROM states s WHERE s.code = 'RJ'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Belo Horizonte', s.id FROM states s WHERE s.code = 'MG'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Brasília', s.id FROM states s WHERE s.code = 'DF'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Salvador', s.id FROM states s WHERE s.code = 'BA'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Fortaleza', s.id FROM states s WHERE s.code = 'CE'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Recife', s.id FROM states s WHERE s.code = 'PE'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Porto Alegre', s.id FROM states s WHERE s.code = 'RS'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Curitiba', s.id FROM states s WHERE s.code = 'PR'
ON CONFLICT DO NOTHING;

INSERT INTO cities (name, state_id) 
SELECT 'Goiânia', s.id FROM states s WHERE s.code = 'GO'
ON CONFLICT DO NOTHING;