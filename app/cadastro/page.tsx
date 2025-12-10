'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signUp } from '@/lib/auth'

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'dentist',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    if (formData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await signUp(formData.email, formData.password, formData.full_name)
      alert('Conta criada com sucesso! Verifique seu email para confirmar.')
      router.push('/entrar')
    } catch (error: any) {
      console.error('Erro ao criar conta:', error)
      alert(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link href="/entrar" className="font-medium text-blue-600 hover:text-blue-500">
              faça login se já tem uma conta
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Nome Completo</Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="role">Tipo de Conta</Label>
              <Select
                value={formData.role}
                onValueChange={(value: 'patient' | 'dentist') => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="dentist">Dentista</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                {formData.role === 'dentist' 
                  ? 'Você poderá completar seu perfil profissional após o cadastro'
                  : 'Você poderá buscar dentistas e agendar consultas'
                }
              </p>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/entrar" className="font-medium text-blue-600 hover:text-blue-500">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}