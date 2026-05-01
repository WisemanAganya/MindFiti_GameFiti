import React, { useEffect, useState } from 'react';
import { TeamMember } from '../../types';
import { api } from '../../services/apiService';

const AdminTeamManager: React.FC = () => {
    const [items, setItems] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<Partial<TeamMember>>({});
    const [uploading, setUploading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await api.getTeamMembers();
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
                await api.createTeamMember(form as any);
            } else {
                await api.updateTeamMember(editingId, form as any);
            }
            setForm({});
            setEditingId(null);
            setIsFormOpen(false);
            load();
        } catch (e) {
            console.error(e);
            alert('Failed to save team member.');
        }
    };

    const handleEdit = (item: TeamMember) => {
        setEditingId(item.id || null);
        setForm(item);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;
        try {
            await api.deleteTeamMember(id);
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
                    <h2 className="text-3xl font-bold font-montserrat text-gray-800">Team Management</h2>
                    <p className="text-gray-500 mt-1">Manage profiles for the board, coaches, and staff.</p>
                </div>
                <button 
                    onClick={() => { setEditingId(null); setForm({}); setIsFormOpen(!isFormOpen); }} 
                    className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2"
                >
                    <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-user-plus'}`}></i>
                    {isFormOpen ? 'Cancel' : 'Add Team Member'}
                </button>
            </div>

            {/* Editor Form */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 animate-fade-in-up">
                    <h3 className="font-bold font-montserrat text-xl mb-6 text-gray-800 flex items-center gap-2 border-b pb-4">
                        <i className="fas fa-id-badge text-primary"></i>
                        {editingId === null ? 'Create Team Member Profile' : 'Edit Team Member'}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                    <input required placeholder="E.g. Jane Doe" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Position <span className="text-red-500">*</span></label>
                                    <input required placeholder="E.g. Lead Therapist" value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Photo</label>
                                    <div className="flex flex-col space-y-3">
                                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" accept="image/*" />
                                        {uploading && <div className="text-sm text-primary flex items-center gap-2"><i className="fas fa-spinner fa-spin"></i> Uploading...</div>}
                                        {form.imgSrc && (
                                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm group">
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Biography</label>
                                    <textarea placeholder="Background, qualifications, and experience..." value={(form as any).bio || ''} onChange={e => setForm({ ...form, bio: e.target.value } as any)} className="p-3 border border-gray-200 rounded-lg w-full flex-grow focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none min-h-[150px]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                            <button type="submit" disabled={uploading} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 shadow-md shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2">
                                <i className="fas fa-save"></i> Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Team Grid */}
            {loading ? (
                <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-3xl mb-4"></i><p>Loading Team Roster...</p></div>
            ) : items.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                    <i className="fas fa-users text-5xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Team Members Found</h3>
                    <p className="text-gray-500 mb-6">Your team roster is empty. Add profiles to showcase your team.</p>
                    <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-5 py-2 rounded-lg font-bold">Add First Member</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((m, i) => (
                        <div key={m.id || i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all flex flex-col items-center p-6 relative group">
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(m)} className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Edit Profile">
                                    <i className="fas fa-pen text-xs"></i>
                                </button>
                                <button onClick={() => m.id && handleDelete(m.id)} className="w-8 h-8 bg-gray-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete Profile">
                                    <i className="fas fa-trash text-xs"></i>
                                </button>
                            </div>

                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-gray-50 shadow-inner">
                                {m.imgSrc ? (
                                    <img src={m.imgSrc} alt={m.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <i className="fas fa-user text-3xl"></i>
                                    </div>
                                )}
                            </div>
                            
                            <h3 className="text-lg font-bold font-montserrat text-gray-800 text-center line-clamp-1">{m.name}</h3>
                            <p className="text-sm font-medium text-primary mb-3 text-center">{m.role}</p>
                            
                            {(m as any).bio && (
                                <p className="text-xs text-gray-500 text-center line-clamp-3 mt-auto">{(m as any).bio}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTeamManager;
