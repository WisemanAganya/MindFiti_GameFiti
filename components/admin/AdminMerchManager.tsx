import React, { useEffect, useState } from 'react';
import { MerchandiseItem } from '../../types';
import { api } from '../../services/apiService';

const AdminMerchManager: React.FC = () => {
  const [items, setItems] = useState<MerchandiseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MerchandiseItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getMerch();
      setItems(data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (item: Partial<MerchandiseItem>) => {
    try {
      if (editing && editing.id) {
        await api.updateMerch(editing.id as number, item as any);
      } else {
        await api.createMerch(item as any);
      }
      setEditing(null);
      load();
    } catch (e) { console.error(e); alert('Failed to save'); }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    try { await api.deleteMerch(id); load(); } catch (e) { console.error(e); }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-montserrat text-gray-800">Merchandise Management</h2>
          <p className="text-gray-500 mt-1">Manage products, pricing, and stock in your store.</p>
        </div>
        <button 
          onClick={() => setEditing(editing ? null : { id: undefined, images: [], title: '', description: '', sizes: ['S', 'M', 'L'], price: 0, currency: 'KES' })} 
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
        >
          <i className={`fas ${editing ? 'fa-times' : 'fa-plus'}`}></i>
          {editing ? 'Cancel' : 'New Item'}
        </button>
      </div>

      {editing && (
        <MerchEditor item={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
      )}

      {loading ? (
        <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Merchandise...</p></div>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
          <i className="fas fa-tshirt text-5xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Merchandise Found</h3>
          <p className="text-gray-500 mb-6">Your store is currently empty. Add your first product.</p>
          <button onClick={() => setEditing({ id: undefined, images: [], title: '', description: '', sizes: ['S', 'M', 'L'], price: 0, currency: 'KES' })} className="bg-primary text-white px-5 py-2 rounded-lg font-bold">Add First Item</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(i => (
            <div key={i.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col group">
              <div className="h-48 bg-gray-100 relative">
                {i.images && i.images[0] ? (
                  <img src={i.images[0]} alt={i.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <i className="fas fa-tshirt text-4xl"></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button onClick={() => { setEditing(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg" title="Edit">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(i.id)} className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-lg" title="Delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-gray-800 shadow">
                  {i.currency} {i.price}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-md font-bold font-montserrat text-gray-800 mb-1 line-clamp-1" title={i.title}>{i.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-grow">{i.description}</p>
                <div className="flex gap-1 mt-auto">
                  {(i.sizes || []).slice(0, 3).map(s => (
                    <span key={s} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded border border-gray-200">{s}</span>
                  ))}
                  {(i.sizes || []).length > 3 && <span className="text-[10px] text-gray-400">+{i.sizes.length - 3}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MerchEditor: React.FC<{ item: Partial<MerchandiseItem>, onCancel: () => void, onSave: (i: Partial<MerchandiseItem>) => void }> = ({ item, onCancel, onSave }) => {
  const [form, setForm] = useState<Partial<MerchandiseItem>>(item);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setForm(item), [item]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    try {
      const url = await api.uploadImage(e.target.files[0]);
      const currentImages = form.images || [];
      setForm({ ...form, images: [...currentImages, url] });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.images || [];
    setForm({ ...form, images: currentImages.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
      <h3 className="font-bold font-montserrat text-xl mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
        <i className="fas fa-tags text-primary"></i>
        {item.id ? 'Edit Merchandise' : 'Create Merchandise'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Details */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Title <span className="text-red-500">*</span></label>
            <input required placeholder="E.g. MindStrong Premium Hoodie" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
              <input required type="number" placeholder="2500" value={form.price || ''} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
              <input placeholder="KES" value={form.currency || 'KES'} onChange={e => setForm({ ...form, currency: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sizes <span className="font-normal text-gray-400">(Comma separated)</span></label>
            <input placeholder="S, M, L, XL" value={(form.sizes || []).join(', ')} onChange={e => setForm({ ...form, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea required placeholder="Product details, material, fit..." value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full h-32 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" />
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="md:col-span-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Product Images</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(form.images || []).map((img, idx) => (
              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white">
                <img src={img} alt="Product" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" onClick={() => removeImage(idx)} className="text-white hover:text-red-400 bg-black/50 w-8 h-8 rounded-full flex items-center justify-center">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center relative hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" title="Add Image" />
              {uploading ? (
                <i className="fas fa-spinner fa-spin text-primary text-xl"></i>
              ) : (
                <>
                  <i className="fas fa-plus text-gray-400 group-hover:text-primary mb-1"></i>
                  <span className="text-xs text-gray-500 group-hover:text-primary font-medium">Add Image</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">First image will be the primary cover.</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button onClick={onCancel} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
        <button onClick={() => onSave(form)} disabled={uploading} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
          <i className="fas fa-save"></i> Save Merchandise
        </button>
      </div>
    </div>
  );
};

export default AdminMerchManager;
