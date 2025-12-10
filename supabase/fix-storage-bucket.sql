-- 🔧 Script de Correção do Storage - Bucket Avatars
-- Execute este arquivo no SQL Editor do Supabase Dashboard

-- ========================================
-- 1. DIAGNÓSTICO INICIAL
-- ========================================

-- Verificar se o bucket 'avatars' existe
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars') THEN
        RAISE NOTICE '✅ Bucket "avatars" já existe';
    ELSE
        RAISE NOTICE '❌ Bucket "avatars" NÃO existe - será criado';
    END IF;
END $$;

-- Listar todos os buckets existentes
SELECT 
    '📦 Buckets existentes:' as info,
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets;

-- ========================================
-- 2. CRIAÇÃO DO BUCKET (SE NÃO EXISTIR)
-- ========================================

-- Criar bucket 'avatars' com configurações corretas
INSERT INTO storage.buckets (
    id, 
    name, 
    public, 
    file_size_limit, 
    allowed_mime_types
)
VALUES (
    'avatars',
    'avatars', 
    true,                    -- Público para visualização
    5242880,                 -- 5MB em bytes
    ARRAY[                   -- Tipos de arquivo permitidos
        'image/jpeg', 
        'image/jpg',
        'image/png', 
        'image/gif', 
        'image/webp'
    ]
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ========================================
-- 3. LIMPEZA DE POLÍTICAS ANTIGAS
-- ========================================

-- Remover políticas antigas que podem estar conflitando
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Remover políticas com nomes genéricos que podem existir
DROP POLICY IF EXISTS "GERAL 1oj01fe_0" ON storage.objects;
DROP POLICY IF EXISTS "GERAL 1oj01fe_1" ON storage.objects;
DROP POLICY IF EXISTS "GERAL 1oj01fe_2" ON storage.objects;
DROP POLICY IF EXISTS "GERAL 1oj01fe_3" ON storage.objects;

-- ========================================
-- 4. CRIAÇÃO DE POLÍTICAS CORRETAS
-- ========================================

-- Política para visualização pública (SELECT)
CREATE POLICY "public_avatar_read" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- Política para upload (INSERT) - usuários autenticados
CREATE POLICY "authenticated_avatar_upload" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid() IS NOT NULL
);

-- Política para atualização (UPDATE) - usuários autenticados
CREATE POLICY "authenticated_avatar_update" 
ON storage.objects FOR UPDATE 
USING (
    bucket_id = 'avatars' 
    AND auth.uid() IS NOT NULL
);

-- Política para exclusão (DELETE) - usuários autenticados
CREATE POLICY "authenticated_avatar_delete" 
ON storage.objects FOR DELETE 
USING (
    bucket_id = 'avatars' 
    AND auth.uid() IS NOT NULL
);

-- ========================================
-- 5. VERIFICAÇÃO FINAL
-- ========================================

-- Confirmar que o bucket foi criado corretamente
SELECT 
    '✅ Configuração do Bucket:' as status,
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id = 'avatars';

-- Listar políticas criadas
SELECT 
    '🔐 Políticas de Segurança:' as status,
    policyname,
    cmd as operacao,
    CASE 
        WHEN cmd = 'SELECT' THEN '👁️ Visualização'
        WHEN cmd = 'INSERT' THEN '📤 Upload'
        WHEN cmd = 'UPDATE' THEN '✏️ Atualização'
        WHEN cmd = 'DELETE' THEN '🗑️ Exclusão'
        ELSE cmd
    END as descricao
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%avatar%'
ORDER BY cmd;

-- Verificar se RLS está habilitado
SELECT 
    '🛡️ Row Level Security:' as status,
    schemaname,
    tablename,
    rowsecurity as rls_habilitado
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- ========================================
-- 6. TESTE DE CONECTIVIDADE
-- ========================================

-- Verificar se conseguimos acessar o bucket
SELECT 
    '🔍 Teste de Acesso:' as status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars') 
        THEN '✅ Bucket acessível'
        ELSE '❌ Bucket não encontrado'
    END as resultado;

-- Mostrar resumo final
SELECT 
    '📋 RESUMO DA CONFIGURAÇÃO' as titulo,
    '=========================' as separador;

SELECT 
    '✅ Bucket "avatars" configurado' as item_1,
    '✅ Políticas de segurança criadas' as item_2,
    '✅ Acesso público para visualização' as item_3,
    '✅ Upload restrito a usuários autenticados' as item_4,
    '✅ Limite de 5MB por arquivo' as item_5,
    '✅ Formatos: JPG, PNG, GIF, WEBP' as item_6;

-- Instruções finais
SELECT 
    '🚀 PRÓXIMOS PASSOS:' as titulo,
    '1. Teste o upload no painel do dentista' as passo_1,
    '2. Verifique os logs no console do browser' as passo_2,
    '3. Se persistir erro, verifique variáveis de ambiente' as passo_3;