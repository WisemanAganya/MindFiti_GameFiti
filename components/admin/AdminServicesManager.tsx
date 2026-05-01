import React, { useEffect, useState } from 'react';
import { Service } from '../../types';
import { api } from '../../services/apiService';

const AdminServicesManager: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});
  const [uploading, setUploading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getServices();
      setItems(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId === null) {
        await api.createService(form as any);
      } else {
        await api.updateService(editingId, form as any);
      }
      setForm({});
      setEditingId(null);
      setIsFormOpen(false);
      load();
    } catch (e) { console.error(e); alert('Failed to save service.'); }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id || null);
    setForm(item);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try { await api.deleteService(id); load(); } catch (e) { console.error(e); }
  };

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

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-montserrat text-gray-800">Services Management</h2>
          <p className="text-gray-500 mt-1">Add, update, or remove services offered on the platform.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setForm({}); setIsFormOpen(!isFormOpen); }} 
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
        >
          <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-plus'}`}></i>
          {isFormOpen ? 'Cancel' : 'New Service'}
        </button>
      </div>

      {/* Editor Form */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
          <h3 className="font-bold font-montserrat text-xl mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
            <i className="fas fa-edit text-primary"></i>
            {editingId === null ? 'Create New Service' : 'Edit Service'}
          </h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title <span className="text-red-500">*</span></label>
                  <input required placeholder="E.g. Mental Conditioning" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image</label>
                  <div className="flex flex-col space-y-3">
                    <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" accept="image/*" />
                    {uploading && <div className="text-sm text-primary flex items-center gap-2"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
                    {form.imgSrc && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={form.imgSrc} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button type="button" onClick={() => setForm({ ...form, imgSrc: undefined })} className="text-white hover:text-red-400"><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex-grow flex flex-col">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea required placeholder="Detailed description of the service..." value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full flex-grow focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[150px]" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
                <i className="fas fa-save"></i> Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid */}
      {loading ? (
        <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Services...</p></div>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
          <i className="fas fa-box-open text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Services Found</h3>
          <p className="text-gray-500 mb-6">You haven't added any services yet. Create one to get started.</p>
          <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-5 py-2 rounded-lg font-bold">Add Your First Service</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <div key={s.id || i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col">
              <div className="h-48 bg-gray-100 relative group">
                {s.imgSrc ? (
                  <img src={s.imgSrc} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <i className="fas fa-image text-4xl"></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button onClick={() => handleEdit(s)} className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg" title="Edit Service">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button onClick={() => s.id && handleDelete(s.id)} className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-lg" title="Delete Service">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold font-montserrat text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServicesManager;
