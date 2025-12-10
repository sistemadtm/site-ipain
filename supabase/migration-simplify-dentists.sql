-- Migração para simplificar a tabela dentists
-- Adiciona campos de contato e localização diretamente na tabela dentists
-- Remove campos desnecessários

-- 1. Adicionar novos campos à tabela dentists
ALTER TABLE dentists 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT;

-- 2. Remover campos desnecessários
ALTER TABLE dentists 
DROP COLUMN IF EXISTS experience_years,
DROP COLUMN IF EXISTS consultation_fee,
DROP COLUMN IF EXISTS accepts_insurance,
DROP COLUMN IF EXISTS available_days,
DROP COLUMN IF EXISTS available_hours_start,
DROP COLUMN IF EXISTS available_hours_end,
DROP COLUMN IF EXISTS service_location_id;

-- 3. Migrar dados existentes de service_locations para dentists (se existirem)
UPDATE dentists 
SET 
  phone = sl.phone,
  address = sl.address,
  city = c.name,
  state = s.name
FROM service_locations sl
LEFT JOIN cities c ON sl.city_id = c.id
LEFT JOIN states s ON c.state_id = s.id
WHERE dentists.service_location_id = sl.id;

-- 4. Atualizar comentários da tabela
COMMENT ON COLUMN dentists.phone IS 'Telefone de contato do dentista';
COMMENT ON COLUMN dentists.address IS 'Endereço do consultório/clínica';
COMMENT ON COLUMN dentists.city IS 'Cidade onde atende';
COMMENT ON COLUMN dentists.state IS 'Estado onde atende';

-- 5. Criar índices para melhor performance nas buscas
CREATE INDEX IF NOT EXISTS idx_dentists_city ON dentists(city);
CREATE INDEX IF NOT EXISTS idx_dentists_state ON dentists(state);
CREATE INDEX IF NOT EXISTS idx_dentists_is_active ON dentists(is_active);
CREATE INDEX IF NOT EXISTS idx_dentists_is_volunteer ON dentists(is_volunteer);

-- 6. Atualizar trigger de updated_at (já existe, mas garantindo)
DROP TRIGGER IF EXISTS update_dentists_updated_at ON dentists;
CREATE TRIGGER update_dentists_updated_at 
  BEFORE UPDATE ON dentists 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Verificar se há dados para migrar
DO $$
BEGIN
  -- Contar quantos dentistas têm service_location_id
  IF EXISTS (SELECT 1 FROM dentists WHERE service_location_id IS NOT NULL) THEN
    RAISE NOTICE 'Migração concluída. % dentistas tinham dados de localização que foram migrados.', 
      (SELECT COUNT(*) FROM dentists WHERE service_location_id IS NOT NULL);
  ELSE
    RAISE NOTICE 'Nenhum dado de localização encontrado para migrar.';
  END IF;
END $$;