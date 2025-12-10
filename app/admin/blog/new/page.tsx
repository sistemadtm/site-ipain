'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { createBlogPost, generateSlug, getBlogCategories } from '@/lib/services/blog'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

interface BlogCategory {
  id: string
  name: string
  slug: string
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const { profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    status: 'draft' as 'draft' | 'published',
    is_featured: false,
    meta_title: '',
    meta_description: '',
    tags: '',
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await getBlogCategories(true)
      setCategories(data)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setLoading(true)
    try {
      const postData = {
        ...formData,
        author_id: profile.id,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      }

      await createBlogPost(postData)
      router.push('/admin/blog')
    } catch (error) {
      console.error('Erro ao criar post:', error)
      alert('Erro ao criar post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
        <p className="text-gray-600">Criar um novo post para o blog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={15}
                  required
                />
              </div>

              <div>
                <Label htmlFor="meta_title">Meta Título (SEO)</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Descrição (SEO)</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="featured">Post em destaque</Label>
              </div>

              <div>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="saúde bucal, dicas, prevenção"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}