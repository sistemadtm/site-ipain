'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  UserCheck, 
  MapPin, 
  FileText, 
  Calendar,
  Settings,
  Home,
  LogOut
} from 'lucide-react'
import { signOut } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Painel', href: '/painel', icon: Home },
  { name: 'Dentistas', href: '/painel/dentistas', icon: UserCheck },
  { name: 'Pacientes', href: '/painel/pacientes', icon: Users },
  { name: 'Locais de Atendimento', href: '/painel/locais', icon: MapPin },
  { name: 'Blog', href: '/painel/blog', icon: FileText },
  { name: 'Configurações', href: '/painel/configuracoes', icon: Settings },
]

export function SidebarAdmin() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 className="text-xl font-bold text-white">Painel Admin</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  )
}