import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type BlogCategory = Database['public']['Tables']['blog_categories']['Row']
export type BlogCategoryInsert = Database['public']['Tables']['blog_categories']['Insert']
export type BlogCategoryUpdate = Database['public']['Tables']['blog_categories']['Update']

// Blog Posts
export const getBlogPosts = async (filters?: {
  status?: string
  categoryId?: string
  authorId?: string
  featured?: boolean
  limit?: number
}) => {
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      profiles:author_id (
        full_name,
        avatar_url
      ),
      blog_categories:category_id (
        name,
        slug,
        color
      )
    `)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.categoryId) {
    query = query.eq('category_id', filters.categoryId)
  }

  if (filters?.authorId) {
    query = query.eq('author_id', filters.authorId)
  }

  if (filters?.featured !== undefined) {
    query = query.eq('is_featured', filters.featured)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getBlogPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      profiles:author_id (
        full_name,
        avatar_url
      ),
      blog_categories:category_id (
        name,
        slug,
        color
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      profiles:author_id (
        full_name,
        avatar_url
      ),
      blog_categories:category_id (
        name,
        slug,
        color
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) throw error
  return data
}

export const createBlogPost = async (post: BlogPostInsert) => {
  const { data, error } = await (supabase as any)
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateBlogPost = async (id: string, updates: BlogPostUpdate) => {
  const { data, error } = await (supabase as any)
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const publishBlogPost = async (id: string) => {
  const { data, error } = await (supabase as any)
    .from('blog_posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Blog Categories
export const getBlogCategories = async (activeOnly = false) => {
  let query = supabase
    .from('blog_categories')
    .select('*')

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query.order('name')

  if (error) throw error
  return data
}

export const getBlogCategoryById = async (id: string) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createBlogCategory = async (category: BlogCategoryInsert) => {
  const { data, error } = await (supabase as any)
    .from('blog_categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateBlogCategory = async (id: string, updates: BlogCategoryUpdate) => {
  const { data, error } = await (supabase as any)
    .from('blog_categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteBlogCategory = async (id: string) => {
  const { error } = await supabase
    .from('blog_categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}