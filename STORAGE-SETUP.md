# Configuração do Storage - Supabase

## Configurar Bucket para Avatares

1. Acesse o painel do Supabase
2. Vá em **Storage**
3. Clique em **Create bucket**
4. Nome do bucket: `avatars`
5. Marque como **Public bucket**
6. Clique em **Create bucket**

## Configurar Políticas de Acesso

### Política para Upload (INSERT)
```sql
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Política para Visualização (SELECT)
```sql
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
```

### Política para Atualização (UPDATE)
```sql
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### Política para Exclusão (DELETE)
```sql
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Estrutura de Pastas

Os avatares serão salvos com a seguinte estrutura:
```
avatars/
  ├── user-id-1-timestamp.jpg
  ├── user-id-2-timestamp.png
  └── ...
```

## Limitações

- Tamanho máximo: 5MB por arquivo
- Formatos aceitos: Apenas imagens (jpg, png, gif, webp)
- Nomeação: `{userId}-{timestamp}.{extensão}`