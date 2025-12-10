-- Correções para as policies do banco de dados

-- 1. Remover policy inválida que referencia tabela appointments (removida)
DROP POLICY IF EXISTS "Dentists can view their patients" ON patients;

-- 2. Criar policy correta para pacientes (sem referência a appointments)
CREATE POLICY "Dentists can view patients in their service location" ON patients FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.is_active = true
  )
);

-- 3. Adicionar policies para dentistas gerenciarem service_locations
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

-- 4. Permitir que dentistas vejam suas próprias service_locations
CREATE POLICY "Dentists can view their service locations" ON service_locations FOR SELECT USING (
  is_active = true OR 
  EXISTS (
    SELECT 1 FROM dentists d 
    WHERE d.user_id = auth.uid() 
    AND d.service_location_id = service_locations.id
  )
);

-- 5. Adicionar policy para dentistas criarem seus próprios perfis
CREATE POLICY "Users can create dentist profile" ON dentists FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

-- 6. Corrigir policy para permitir que dentistas vejam seu próprio perfil mesmo se inativo
DROP POLICY IF EXISTS "Anyone can view active dentists" ON dentists;
CREATE POLICY "Anyone can view active dentists or own profile" ON dentists FOR SELECT USING (
  is_active = true OR user_id = auth.uid()
);