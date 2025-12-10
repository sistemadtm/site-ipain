export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'dentist' | 'patient'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'dentist' | 'patient'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'dentist' | 'patient'
          created_at?: string
          updated_at?: string
        }
      }
      states: {
        Row: {
          id: number
          name: string
          code: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          code: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          code?: string
          created_at?: string
        }
      }
      cities: {
        Row: {
          id: number
          name: string
          state_id: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          state_id: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          state_id?: number
          created_at?: string
        }
      }
      service_locations: {
        Row: {
          id: string
          name: string
          type: 'university' | 'clinic' | 'hospital' | 'private_practice'
          address: string
          city_id: number | null
          phone: string | null
          email: string | null
          website: string | null
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'university' | 'clinic' | 'hospital' | 'private_practice'
          address: string
          city_id?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'university' | 'clinic' | 'hospital' | 'private_practice'
          address?: string
          city_id?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      dentists: {
        Row: {
          id: string
          user_id: string | null
          cro_number: string
          specialties: string[] | null
          is_volunteer: boolean
          bio: string | null
          is_active: boolean
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          cro_number: string
          specialties?: string[] | null
          is_volunteer?: boolean
          bio?: string | null
          is_active?: boolean
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          cro_number?: string
          specialties?: string[] | null
          is_volunteer?: boolean
          bio?: string | null
          is_active?: boolean
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          user_id: string | null
          birth_date: string | null
          phone: string | null
          address: string | null
          city_id: number | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          medical_conditions: string | null
          allergies: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          birth_date?: string | null
          phone?: string | null
          address?: string | null
          city_id?: number | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_conditions?: string | null
          allergies?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          birth_date?: string | null
          phone?: string | null
          address?: string | null
          city_id?: number | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_conditions?: string | null
          allergies?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Removido: appointments table
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string
          is_active?: boolean
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_id: string | null
          category_id: string | null
          status: 'draft' | 'published' | 'archived'
          is_featured: boolean
          meta_title: string | null
          meta_description: string | null
          tags: string[] | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Removido: blog_comments table
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}