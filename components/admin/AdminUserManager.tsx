import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiService';
import { Profile } from '../../types';

const AdminUserManager: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = async () => {
        setLoading(true);
        try {
            const data = await api.getProfiles();
            setProfiles(data);
        } catch (e) {
            console.error('Failed to load profiles', e);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (id: string, newRole: string) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        try {
            await api.updateProfileRole(id, newRole);
            setProfiles(prev => prev.map(p => p.id === id ? { ...p, role: newRole as any } : p));
        } catch (e) {
            console.error(e);
            alert('Failed to update role');
        }
    };

    const filteredProfiles = profiles.filter(p =>
        (p.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (p.id || '').includes(searchTerm)
    );

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold font-montserrat text-gray-800">User Management</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md text-sm w-64"
                />
            </div>

            {loading && <div className="p-8 text-center">Loading users...</div>}

            {!loading && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProfiles.map((profile) => (
                                <tr key={profile.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{profile.full_name || 'No Name'}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-xs">{profile.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${profile.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                profile.role === 'delivery' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-green-100 text-green-800'}`}>
                                            {profile.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        -
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <select
                                            value={profile.role}
                                            onChange={(e) => handleRoleUpdate(profile.id, e.target.value)}
                                            className="ml-2 border rounded p-1 text-xs bg-white"
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="delivery">Delivery</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUserManager;
