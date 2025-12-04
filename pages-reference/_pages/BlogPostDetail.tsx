import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../services/storage';
import { BlogPost } from '../types';
import { Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const data = blogService.getBySlug(slug);
      setPost(data || null);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Artigo não encontrado</h1>
        <Link to="/blog" className="text-primary hover:underline">Voltar para o blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="w-full h-[400px] relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 text-white">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Voltar para o Blog
          </Link>
          <div className="flex items-center gap-4 mb-4 text-sm font-medium">
            <span className="bg-accent text-white px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold">
              {post.category}
            </span>
            <div className="flex items-center gap-1 opacity-90">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid md:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="prose prose-lg prose-teal max-w-none text-gray-700">
            {/* Simple paragraph splitting for demo purposes since we don't have a markdown parser installed */}
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Share / Tags Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Tag size={16} />
              <span>Tags: {post.category}, Odontologia, Saúde</span>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold hover:bg-teal-50 px-4 py-2 rounded-lg transition">
              <Share2 size={18} /> Compartilhar
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block space-y-8">
           <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
             <h3 className="font-bold text-gray-900 mb-4">Sobre o Autor</h3>
             <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                 IP
               </div>
               <div>
                 <p className="font-bold text-sm">Equipe Editorial</p>
                 <p className="text-xs text-gray-500">Indicador Profissional</p>
               </div>
             </div>
             <p className="text-sm text-gray-600 mb-4">
               Trazendo informações baseadas em evidências sobre dor orofacial e odontologia do sono.
             </p>
             <Link to="/locator" className="block w-full text-center bg-white border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition">
               Encontrar Dentista
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;