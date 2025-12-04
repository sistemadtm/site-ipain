import React, { useState, useEffect } from 'react';
import { User, DentistProfile, UserRole, BlogPost } from '../types';
import { profileService, userService, blogService } from '../services/storage';
import { BRAZIL_STATES, SPECIALTIES } from '../constants';
import { Save, Sparkles, Check, Trash, Plus } from 'lucide-react';
import { generateBio, suggestBlogTopics } from '../services/gemini';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Painel de Controle: <span className="text-primary">{user.name}</span>
        </h1>

        {user.role === UserRole.ADMIN ? (
          <AdminDashboard />
        ) : (
          <DentistDashboard user={user} />
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              DENTIST AREA                                  */
/* -------------------------------------------------------------------------- */

const DentistDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [profile, setProfile] = useState<DentistProfile>({
    userId: user.id,
    cro: '',
    specialties: [],
    bio: '',
    phone: '',
    address: { street: '', city: '', state: '', zipCode: '' },
    isRemoteCapable: false,
    socials: {}
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const existing = profileService.getByUserId(user.id);
    if (existing) setProfile(existing);
  }, [user.id]);

  const handleSave = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      profileService.save(profile);
      setLoading(false);
      setMsg('Perfil atualizado com sucesso!');
      setTimeout(() => setMsg(''), 3000);
    }, 800);
  };

  const handleAiBio = async () => {
    setAiLoading(true);
    const generated = await generateBio(user.name, profile.specialties, "Dor orofacial e acolhimento");
    setProfile(prev => ({ ...prev, bio: generated }));
    setAiLoading(false);
  };

  const toggleSpecialty = (spec: string) => {
    setProfile(prev => {
      const exists = prev.specialties.includes(spec);
      return {
        ...prev,
        specialties: exists 
          ? prev.specialties.filter(s => s !== spec)
          : [...prev.specialties, spec]
      };
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-3xl border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Editar Perfil Profissional</h2>
      
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">CRO</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
              value={profile.cro}
              onChange={e => setProfile({...profile, cro: e.target.value})}
              placeholder="Ex: 12345-SP"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone Principal</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
              value={profile.phone}
              onChange={e => setProfile({...profile, phone: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp (apenas números)</label>
          <input 
            type="text" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
            value={profile.whatsapp || ''}
            onChange={e => setProfile({...profile, whatsapp: e.target.value})}
          />
        </div>

        {/* Address */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900">Endereço do Consultório</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold">Estado</label>
              <select 
                className="w-full mt-1 p-2 border rounded"
                value={profile.address.state}
                onChange={e => setProfile({...profile, address: {...profile.address, state: e.target.value}})}
              >
                <option value="">Selecione</option>
                {BRAZIL_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold">Cidade</label>
              <input 
                type="text" 
                className="w-full mt-1 p-2 border rounded"
                value={profile.address.city}
                onChange={e => setProfile({...profile, address: {...profile.address, city: e.target.value}})}
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs uppercase text-gray-500 font-bold">Logradouro</label>
              <input 
                type="text" 
                className="w-full mt-1 p-2 border rounded"
                value={profile.address.street}
                onChange={e => setProfile({...profile, address: {...profile.address, street: e.target.value}})}
              />
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Especialidades Praticadas</label>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map(spec => (
              <button
                key={spec}
                onClick={() => toggleSpecialty(spec)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  profile.specialties.includes(spec)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Bio with AI */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Mini Biografia</label>
            <button 
              onClick={handleAiBio}
              disabled={aiLoading}
              className="text-xs flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-1 rounded hover:bg-purple-100 disabled:opacity-50"
            >
              <Sparkles size={14} />
              {aiLoading ? 'Gerando...' : 'Escrever com IA'}
            </button>
          </div>
          <textarea
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"
            value={profile.bio}
            onChange={e => setProfile({...profile, bio: e.target.value})}
            placeholder="Conte um pouco sobre sua formação e abordagem..."
          />
          <p className="text-xs text-gray-500 mt-1">Dica: Use o botão de IA para gerar um texto profissional.</p>
        </div>

        {/* Socials & Visibility */}
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram (@usuario)</label>
            <input 
               type="text" 
               className="mt-1 w-full p-2 border rounded"
               value={profile.socials?.instagram || ''}
               onChange={e => setProfile({...profile, socials: {...profile.socials, instagram: e.target.value}})}
            />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={profile.isRemoteCapable}
                onChange={e => setProfile({...profile, isRemoteCapable: e.target.checked})}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Realizo telemonitoramento</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6">
          <span className="text-green-600 font-medium">{msg}</span>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-teal-800 disabled:opacity-70 transition-colors shadow"
          >
            {loading ? 'Salvando...' : <><Save size={18} /> Salvar Alterações</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              ADMIN AREA                                    */
/* -------------------------------------------------------------------------- */

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'blog'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple stats
  const stats = {
    totalUsers: users.length,
    activeDentists: users.filter(u => u.role === UserRole.DENTIST && u.isActive).length,
    totalPosts: posts.length
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setUsers(userService.getAll());
    setPosts(blogService.getAll());
  };

  const toggleUserStatus = (u: User) => {
    userService.update({ ...u, isActive: !u.isActive });
    refreshData();
  };

  const deletePost = (id: string) => {
    if(confirm('Confirmar exclusão?')) {
      blogService.delete(id);
      refreshData();
    }
  };

  const [aiIdeas, setAiIdeas] = useState<string[]>([]);
  const handleAiIdeas = async () => {
    setLoading(true);
    const ideas = await suggestBlogTopics('Disfunção Temporomandibular');
    setAiIdeas(ideas);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">Total de Usuários</div>
          <div className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">Dentistas Ativos</div>
          <div className="text-3xl font-bold text-primary mt-2">{stats.activeDentists}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium uppercase">Artigos Publicados</div>
          <div className="text-3xl font-bold text-accent mt-2">{stats.totalPosts}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Gerenciar Usuários
        </button>
        <button 
          onClick={() => setActiveTab('blog')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'blog' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Gerenciar Blog
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'users' ? (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500 text-sm">
                    <th className="pb-3 font-medium">Nome</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Função</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map(u => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 font-medium">{u.name}</td>
                      <td className="py-4 text-gray-600">{u.email}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs ${u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`flex items-center gap-1 ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                          <div className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-green-600' : 'bg-red-500'}`}></div>
                          {u.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-4">
                        {u.role !== UserRole.ADMIN && (
                          <button 
                            onClick={() => toggleUserStatus(u)}
                            className="text-primary hover:underline text-xs"
                          >
                            {u.isActive ? 'Desativar' : 'Ativar'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Artigos Publicados</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleAiIdeas}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm transition"
                >
                  <Sparkles size={16} />
                  {loading ? 'Pensando...' : 'IA: Sugerir Temas'}
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-teal-800 text-sm transition">
                  <Plus size={16} /> Novo Artigo
                </button>
              </div>
            </div>

            {aiIdeas.length > 0 && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <Sparkles size={14} /> Sugestões do Gemini
                </h4>
                <ul className="list-disc pl-5 text-sm text-purple-900 space-y-1">
                  {aiIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
                </ul>
              </div>
            )}

            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/30 transition">
                   <div>
                     <h4 className="font-bold text-gray-900">{post.title}</h4>
                     <p className="text-xs text-gray-500 mt-1">Categoria: {post.category}</p>
                   </div>
                   <button 
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition"
                   >
                     <Trash size={18} />
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;