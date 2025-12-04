import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/storage';
import { Calendar, ArrowRight, Bookmark } from 'lucide-react';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const posts = blogService.getAll();

  const categories = ['Todos', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = activeCategory === 'Todos' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="bg-paper min-h-screen">
      {/* Modern Header */}
      <div className="bg-white py-24 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Blog
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 tracking-tight">Acervo Científico</h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed text-lg">
            Explorando as fronteiras da Dor Orofacial, DTM e Odontologia do Sono através de evidências e prática clínica.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Modern Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, idx) => (
              <article key={post.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <Link to={`/blog/${post.slug}`} className="block relative h-64 overflow-hidden">
                   <div className="absolute top-4 left-4 z-10">
                     <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                       {post.category}
                     </span>
                   </div>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                
                <div className="flex flex-col flex-grow p-8">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  
                  <Link to={`/blog/${post.slug}`} className="block mb-4">
                    <h2 className="text-2xl font-serif text-slate-900 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-3 font-light">
                    {post.summary}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-[8px] font-bold">IP</div>
                       <span className="text-xs text-gray-400 font-medium">Equipe Editorial</span>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 text-slate-900 group-hover:text-accent font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                      Ler <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <p className="font-serif text-gray-400 italic text-xl">Nenhuma publicação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;