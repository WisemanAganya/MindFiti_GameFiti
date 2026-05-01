import React, { useEffect, useState } from 'react';
import { TimelineEvent } from '../../types';
import { api } from '../../services/apiService';

const AdminTimelineManager: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<TimelineEvent>>({});
    const [uploading, setUploading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await api.getTimelineEvents();
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
                await api.createTimeline(form as any);
            } else {
                await api.updateTimeline(editingId, form as any);
            }
            setForm({});
            setEditingId(null);
            setIsFormOpen(false);
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to save timeline event.');
        }
    };

    const handleEdit = (item: any) => {
        setEditingId(item.id || null);
        setForm(item);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await api.deleteTimeline(id);
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
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Timeline Management</h2>
                    <p className="text-gray-500 mt-1">Manage the historical journey and milestones.</p>
                </div>
                <button 
                    onClick={() => { setEditingId(null); setForm({}); setIsFormOpen(!isFormOpen); }} 
                    className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-calendar-plus'}`}></i>
                    {isFormOpen ? 'Cancel' : 'Add Milestone'}
                </button>
            </div>

            {/* Editor Form */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
                    <h3 className="font-bold font-montserrat text-xl mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
                        <i className="fas fa-calendar-alt text-primary"></i>
                        {editingId === null ? 'Create Timeline Milestone' : 'Edit Timeline Milestone'}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Period <span className="text-red-500">*</span></label>
                                    <input required placeholder="E.g. 2022 - 2023" value={form.period || ''} onChange={e => setForm({ ...form, period: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Milestone Title <span className="text-red-500">*</span></label>
                                    <input required placeholder="E.g. National Award" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Photo</label>
                                    <div className="flex flex-col space-y-3">
                                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" accept="image/*" />
                                        {uploading && <div className="text-sm text-primary flex items-center gap-2"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
                                        {form.imgSrc && (
                                            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
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
                                    <textarea required placeholder="Describe this milestone..." value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full flex-grow focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[150px]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                            <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
                                <i className="fas fa-save"></i> Save Milestone
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Timeline Grid */}
            {loading ? (
                <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Milestones...</p></div>
            ) : items.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                    <i className="fas fa-stream text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Milestones Found</h3>
                    <p className="text-gray-500 mb-6">Your timeline is empty. Add events to build your story.</p>
                    <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-5 py-2 rounded-lg font-bold">Add First Milestone</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((e, i) => (
                        <div key={e.id || i} className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all overflow-hidden flex flex-col group relative">
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button onClick={() => handleEdit(e)} className="w-8 h-8 bg-white/90 text-gray-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm" title="Edit">
                                    <i className="fas fa-pen text-xs"></i>
                                </button>
                                <button onClick={() => e.id && handleDelete(e.id)} className="w-8 h-8 bg-white/90 text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm" title="Delete">
                                    <i className="fas fa-trash text-xs"></i>
                                </button>
                            </div>

                            <div className="h-40 relative">
                                {e.imgSrc ? (
                                    <img src={e.imgSrc} alt={e.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                        <i className="fas fa-image text-4xl"></i>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-4">
                                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">{e.period}</span>
                                </div>
                            </div>
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold font-montserrat text-gray-800 mb-2">{e.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3">{e.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTimelineManager;
