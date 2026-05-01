import React, { useEffect, useState } from 'react';
import { api } from '../../services/apiService';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_title: '',
    primary_color: '',
    footer_text: '',
    hero_title: '',
    hero_subtitle: '',
    about_heading: '',
    about_text: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    social_instagram: '',
    social_tiktok: ''
  });
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await api.getSettings();
      setSettings(prev => ({ ...prev, ...data }));
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    setSavingKey(key);
    try {
      await api.updateSetting(key, settings[key]);
    } catch (e) {
      console.error(e);
      alert('Failed to update setting');
    } finally {
      setSavingKey(null);
    }
  };

  if (loading) return <div className="py-12 text-center text-gray-500"><i className="fas fa-spinner fa-spin text-2xl mb-4"></i><p>Loading Global Settings...</p></div>;

  const renderInput = (key: string, label: string, placeholder: string, type = 'text', isTextarea = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex">
        {isTextarea ? (
          <textarea
            value={settings[key] || ''}
            onChange={e => handleChange(key, e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none h-24"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            value={settings[key] || ''}
            onChange={e => handleChange(key, e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder={placeholder}
          />
        )}
        <button
          onClick={() => handleSave(key)}
          disabled={savingKey === key}
          className="bg-primary text-white px-5 py-2 rounded-r-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400 flex items-center gap-2"
        >
          {savingKey === key ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-save"></i>}
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-montserrat text-gray-800">Global Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage global site content, branding, and contact information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Branding */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat mb-4 border-b pb-2 text-gray-800">Core Branding</h3>
          {renderInput('site_title', 'Site Title', 'Project MindStrong')}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Website Logo</label>
            <div className="flex items-center gap-4">
              {settings.site_logo && (
                <div className="w-16 h-16 bg-gray-50 rounded border flex items-center justify-center p-2">
                  <img src={settings.site_logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSavingKey('site_logo');
                      try {
                        const url = await api.uploadImage(e.target.files[0]);
                        handleChange('site_logo', url);
                        await api.updateSetting('site_logo', url);
                      } catch (err) {
                        alert('Upload failed');
                      } finally {
                        setSavingKey(null);
                      }
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>
              {savingKey === 'site_logo' && <i className="fas fa-spinner fa-spin text-primary"></i>}
            </div>
            <p className="text-xs text-gray-500 mt-1">Logo appears in header and footer.</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat mb-4 border-b pb-2 text-gray-800">Hero Section</h3>
          {renderInput('hero_title', 'Hero Title', 'Building Mental Resilience')}
          {renderInput('hero_subtitle', 'Hero Subtitle', 'Join the movement to conquer mental health challenges...', 'text', true)}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Background Image</label>
            <div className="flex items-center gap-4">
              {settings.hero_bg_image && (
                <img src={settings.hero_bg_image} alt="Hero" className="w-24 h-16 object-cover rounded border" />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSavingKey('hero_bg_image');
                      try {
                        const url = await api.uploadImage(e.target.files[0]);
                        handleChange('hero_bg_image', url);
                        await api.updateSetting('hero_bg_image', url);
                      } catch (err) {
                        alert('Upload failed');
                      } finally {
                        setSavingKey(null);
                      }
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>
              {savingKey === 'hero_bg_image' && <i className="fas fa-spinner fa-spin text-primary"></i>}
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat mb-4 border-b pb-2 text-gray-800">About Content</h3>
          {renderInput('about_heading', 'About Header Title', 'Our Journey')}
          {renderInput('about_text', 'About Subtext', 'The story of #MindFitiGameFiti')}
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat mb-4 border-b pb-2 text-gray-800">Contact & Support Info</h3>
          {renderInput('contact_email', 'Primary Email', 'info@example.com', 'email')}
          {renderInput('contact_phone', 'Phone Number', '+254 7XX XXX XXX', 'tel')}
          {renderInput('contact_address', 'Physical Address', 'Nairobi, Kenya')}
        </div>

        {/* Social & Footer */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold font-montserrat mb-4 border-b pb-2 text-gray-800">Social Media & Footer</h3>
          {renderInput('social_instagram', 'Instagram Link', 'https://instagram.com/...', 'url')}
          {renderInput('social_tiktok', 'TikTok Link', 'https://tiktok.com/@...', 'url')}
          {renderInput('footer_text', 'Footer Tagline', 'Championing mental wellness in sports...', 'text', true)}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
