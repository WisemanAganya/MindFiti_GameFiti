import React, { useEffect, useState } from 'react';
import { Testimonial } from '../../types';
import { api } from '../../services/apiService';

const AdminTestimonialsManager: React.FC = () => {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<Testimonial>>({});
    const [uploading, setUploading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await api.getTestimonials();
            setItems(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId === null) {
                await api.createTestimonial(form as any);
            } else {
                await api.updateTestimonial(editingId, form as any);
            }
            setForm({});
            setEditingId(null);
            setIsFormOpen(false);
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to save testimonial.');
        }
    };

    const handleEdit = (item: Testimonial) => {
        setEditingId(item.id || null);
        setForm(item);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await api.deleteTestimonial(id);
            load();
        } catch (e) { console.error(e); }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        setUploading(true);
        try {
            const url = await api.uploadImage(e.target.files[0]);
            setForm({ ...form, imgSrc: url });
        } catch (err) {
            console.error('Upload failed', err);
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
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Testimonials</h2>
                    <p className="text-gray-500 mt-1">Manage success stories and quotes from clients.</p>
                </div>
                <button 
                    onClick={() => { setEditingId(null); setForm({}); setIsFormOpen(!isFormOpen); }} 
                    className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-plus'}`}></i>
                    {isFormOpen ? 'Cancel' : 'Add Testimonial'}
                </button>
            </div>

            {/* Editor Form */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
                    <h3 className="font-bold font-montserrat text-xl mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
                        <i className="fas fa-quote-left text-primary"></i>
                        {editingId === null ? 'Create Testimonial' : 'Edit Testimonial'}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name <span className="text-red-500">*</span></label>
                                    <input required placeholder="E.g. John Doe" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Author Photo</label>
                                    <div className="flex flex-col space-y-3">
                                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" accept="image/*" />
                                        {uploading && <div className="text-sm text-primary flex items-center gap-2"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
                                        {form.imgSrc && (
                                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm group">
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Testimonial Quote <span className="text-red-500">*</span></label>
                                    <textarea required placeholder="The testimonial content..." value={form.quote || ''} onChange={e => setForm({ ...form, quote: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full flex-grow focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[150px]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                            <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
                                <i className="fas fa-save"></i> Save Testimonial
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Testimonials Grid */}
            {loading ? (
                <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Testimonials...</p></div>
            ) : items.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                    <i className="fas fa-quote-left text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Testimonials Found</h3>
                    <p className="text-gray-500 mb-6">You haven't added any testimonials yet.</p>
                    <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-5 py-2 rounded-lg font-bold">Add Testimonial</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((t, i) => (
                        <div key={t.id || i} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all p-6 relative group flex flex-col">
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(t)} className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Edit">
                                    <i className="fas fa-pen text-xs"></i>
                                </button>
                                <button onClick={() => t.id && handleDelete(t.id)} className="w-8 h-8 bg-gray-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                                    <i className="fas fa-trash text-xs"></i>
                                </button>
                            </div>

                            <i className="fas fa-quote-left text-3xl text-gray-200 mb-4"></i>
                            <p className="text-gray-600 italic mb-6 flex-grow relative z-10">"{t.quote}"</p>
                            
                            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50">
                                {t.imgSrc ? (
                                    <img src={t.imgSrc} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <i className="fas fa-user"></i>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold font-montserrat text-gray-800">{t.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTestimonialsManager;
