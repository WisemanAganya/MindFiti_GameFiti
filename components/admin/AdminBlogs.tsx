import React, { useEffect, useState } from 'react';
import { BlogPost } from '../../types';
import { api } from '../../services/apiService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminBlogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogPosts();
      setPosts(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm('Delete this post?')) return;
    await api.deleteBlog(id);
    load();
  };

  const handleSave = async (form: Partial<BlogPost>) => {
    try {
      if (editing && editing.id) {
        await api.updateBlog(editing.id as number, form as any);
      } else {
        await api.createBlog(form as any);
      }
      setEditing(null);
      load();
    } catch (e) { console.error(e); alert('Failed to save'); }
  };

  if (editing) {
    return <BlogEditor post={editing} onCancel={() => setEditing(null)} onSave={handleSave} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold font-montserrat text-gray-800">Blog Posts</h2>
          <p className="text-sm text-gray-500 mt-1">Manage news and articles published on your site.</p>
        </div>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-blue-600 transition flex items-center gap-2" 
          onClick={() => setEditing({ id: undefined, slug: '', imgSrc: '', category: '', title: '', author: '', content: '', published_at: new Date().toISOString() })}
        >
          <i className="fas fa-plus"></i> New Post
        </button>
      </div>

      {loading && <div className="py-8 text-center text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i>Loading posts...</div>}
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
          <i className="fas fa-newspaper text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-600 mb-2">No Posts Found</h3>
          <p className="text-gray-500">Create your first blog post to engage your audience.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 relative bg-gray-100">
                {p.imgSrc ? (
                  <img src={p.imgSrc} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <i className="fas fa-image text-3xl"></i>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-primary uppercase">
                  {p.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">By {p.author} · {new Date(p.published_at).toLocaleDateString()}</p>
                <div className="flex space-x-2 mt-auto border-t pt-4">
                  <button onClick={() => setEditing(p)} className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition">
                    <i className="fas fa-trash mr-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BlogEditor: React.FC<{ post: Partial<BlogPost>, onCancel: () => void, onSave: (form: Partial<BlogPost>) => void }> = ({ post, onCancel, onSave }) => {
  const [form, setForm] = useState<Partial<BlogPost>>(post);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setForm(post), [post]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    try {
      const url = await api.uploadImage(e.target.files[0]);
      setForm({ ...form, imgSrc: url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h3 className="font-bold text-xl font-montserrat text-gray-800">{post.id ? 'Edit Blog Post' : 'Create New Post'}</h3>
        <button className="text-gray-400 hover:text-gray-600" onClick={onCancel}>
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
            <input 
              value={form.title || ''} 
              onChange={e => {
                const title = e.target.value;
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                setForm({ ...form, title, slug: form.slug ? form.slug : slug });
              }} 
              placeholder="E.g., 5 Ways to Improve Mental Toughness" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <div className="h-[400px] mb-12">
              <ReactQuill 
                theme="snow" 
                value={form.content || ''} 
                onChange={(content) => setForm({ ...form, content })} 
                modules={modules}
                style={{ height: '350px' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Meta */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL snippet)</label>
            <input 
              value={form.slug || ''} 
              onChange={e => setForm({ ...form, slug: e.target.value })} 
              placeholder="e.g., 5-ways-to-improve" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
            <input 
              value={form.author || ''} 
              onChange={e => setForm({ ...form, author: e.target.value })} 
              placeholder="John Doe" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              value={form.category || ''} 
              onChange={e => setForm({ ...form, category: e.target.value })} 
              placeholder="Mental Health, Fitness, etc." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <input 
              type="datetime-local"
              value={form.published_at ? new Date(form.published_at).toISOString().slice(0, 16) : ''} 
              onChange={e => setForm({ ...form, published_at: new Date(e.target.value).toISOString() })} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition relative group">
              <div className="space-y-1 text-center">
                {form.imgSrc ? (
                  <div className="relative">
                    <img src={form.imgSrc} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded">
                      <span className="text-white text-sm font-bold">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
                )}
                {!form.imgSrc && (
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-500">
                      <span>Upload a file</span>
                    </label>
                  </div>
                )}
                <input id="file-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                {uploading && <p className="text-sm text-primary font-bold mt-2">Uploading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
        <button 
          className="px-6 py-2.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow hover:bg-blue-600 transition flex items-center gap-2" 
          onClick={() => onSave({ ...form, published_at: form.published_at || new Date().toISOString() })}
        >
          <i className="fas fa-save"></i> Save Post
        </button>
      </div>
    </div>
  );
};

export default AdminBlogs;;
