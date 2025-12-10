'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { getBlogPosts, deleteBlogPost, publishBlogPost } from '@/lib/services/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BlogPostWithRelations {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  created_at: string
  published_at: string | null
  profiles: {
    full_name: string | null
  } | null
  blog_categories: {
    name: string
    color: string
  } | null
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setPosts(data as BlogPostWithRelations[])
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await deleteBlogPost(id)
        fetchPosts()
      } catch (error) {
        console.error('Erro ao excluir post:', error)
        alert('Erro ao excluir post')
      }
    }
  }

  const handlePublish = async (id: string) => {
    try {
      await publishBlogPost(id)
      fetchPosts()
    } catch (error) {
      console.error('Erro ao publicar post:', error)
      alert('Erro ao publicar post')
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Gerencie os posts do blog</p>
        </div>
        <Link href="/painel/blog/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                          {post.is_featured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Destaque
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.blog_categories && (
                        <span 
                          className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                          style={{ backgroundColor: post.blog_categories.color }}
                        >
                          {post.blog_categories.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {post.profiles?.full_name || 'Autor não informado'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : post.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status === 'published' ? 'Publicado' : 
                         post.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {post.status === 'published' && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        <Link href={`/painel/blog/${post.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        {post.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePublish(post.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Publicar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum post encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}