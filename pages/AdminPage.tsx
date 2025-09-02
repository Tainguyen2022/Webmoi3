import React, { useState, useEffect } from 'react';
import { ADMIN_PASSWORD, LOCAL_STORAGE_KEYS } from '../constants';
import { vocab as defaultVocab } from '../data/vocab';
import { BugReport, VocabPack, NewsArticle } from '../types';
import { getNews, saveNews } from '../services/newsService';

const PasswordGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onUnlock();
        } else {
            setError('Sai mật khẩu!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Admin Area</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button type="submit" className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

const RichTextEditor: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [color, setColor] = React.useState('#000000');

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };
    
    const execCmd = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
        editorRef.current?.focus();
        handleInput();
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
        execCmd('foreColor', e.target.value);
    };

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="border border-gray-300 rounded-md shadow-sm">
            <div className="flex items-center p-2 border-b bg-gray-50 space-x-2">
                <button type="button" onClick={() => execCmd('bold')} className="font-bold w-8 h-8 hover:bg-gray-200 rounded">B</button>
                <button type="button" onClick={() => execCmd('italic')} className="italic w-8 h-8 hover:bg-gray-200 rounded">I</button>
                <button type="button" onClick={() => execCmd('underline')} className="underline w-8 h-8 hover:bg-gray-200 rounded">U</button>
                <input type="color" value={color} onChange={handleColorChange} className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer" title="Change text color" />
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="prose max-w-none p-3 h-48 overflow-y-auto font-mono"
                // The initial content is set by the useEffect hook
            />
        </div>
    );
};


const ArticleEditor: React.FC<{
    article: Partial<NewsArticle>;
    onSave: (article: NewsArticle) => void;
    onCancel: () => void;
}> = ({ article, onSave, onCancel }) => {
    const [formData, setFormData] = useState(article);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    const handleContentChange = (field: 'content_vi' | 'content_en', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            date: formData.date || new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString().split('T')[0],
        };
        onSave(finalData as NewsArticle);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <h3 className="text-xl font-bold p-4 border-b">{formData.id ? 'Sửa bài báo' : 'Thêm bài báo mới'}</h3>
                <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề (Tiếng Việt)</label>
                        <input type="text" name="title_vi" value={formData.title_vi || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề (Tiếng Anh)</label>
                        <input type="text" name="title_en" value={formData.title_en || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">URL Hình ảnh</label>
                        <input type="text" name="thumbnail" value={formData.thumbnail || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Nội dung (Tiếng Việt - Hỗ trợ HTML)</label>
                        <RichTextEditor value={formData.content_vi || ''} onChange={(value) => handleContentChange('content_vi', value)} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Nội dung (Tiếng Anh - Hỗ trợ HTML)</label>
                        <RichTextEditor value={formData.content_en || ''} onChange={(value) => handleContentChange('content_en', value)} />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" name="published" checked={formData.published !== false} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                        <label className="ml-2 block text-sm text-gray-900">Published</label>
                    </div>
                </form>
                 <div className="p-4 border-t flex justify-end space-x-2 bg-gray-50">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Hủy</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Lưu</button>
                </div>
            </div>
        </div>
    );
};


const AdminDashboard: React.FC = () => {
    const [vocab, setVocab] = useState<VocabPack>({});
    const [bugs, setBugs] = useState<BugReport[]>([]);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle> | null>(null);


    useEffect(() => {
        try {
            const storedVocab = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCAB);
            setVocab(storedVocab ? JSON.parse(storedVocab) : defaultVocab.packs);

            const storedBugs = localStorage.getItem(LOCAL_STORAGE_KEYS.BUGS);
            setBugs(storedBugs ? JSON.parse(storedBugs) : []);
            
            setNewsArticles(getNews({ onlyPublished: false }));
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    const handleExportVocab = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(vocab, null, 2))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "matcanban_vocab_pack.json";
        link.click();
    };
    
    const handleClearStorage = (key: string) => {
        if (window.confirm(`Bạn có chắc muốn xóa dữ liệu từ "${key}"? Hành động này sẽ tải lại trang.`)) {
            localStorage.removeItem(key);
            alert(`Đã xóa "${key}"`);
            window.location.reload();
        }
    }

    const handleSaveArticle = (articleToSave: NewsArticle) => {
        let updatedArticles;
        if (articleToSave.id) { // Update existing
            updatedArticles = newsArticles.map(a => a.id === articleToSave.id ? articleToSave : a);
        } else { // Create new
            const newArticle = { ...articleToSave, id: `article_${Date.now()}` };
            updatedArticles = [...newsArticles, newArticle];
        }
        setNewsArticles(updatedArticles);
        saveNews(updatedArticles);
        setEditingArticle(null);
    };
    
    const handleDeleteArticle = (id: string) => {
        if (window.confirm("Bạn có chắc muốn xóa bài báo này không?")) {
            const updatedArticles = newsArticles.filter(a => a.id !== id);
            setNewsArticles(updatedArticles);
            saveNews(updatedArticles);
        }
    };


    return (
        <div className="space-y-8">
            {editingArticle && (
                <ArticleEditor 
                    article={editingArticle} 
                    onSave={handleSaveArticle} 
                    onCancel={() => setEditingArticle(null)} 
                />
            )}

            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Quản lý Báo song ngữ ({newsArticles.length})</h3>
                    <button onClick={() => setEditingArticle({ published: true })} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                        Thêm bài báo mới
                    </button>
                </div>
                 <div className="h-64 overflow-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {newsArticles.map((article) => (
                                <tr key={article.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{article.title_vi}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        {article.published !== false ? 
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span> : 
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                                        }
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm space-x-2">
                                        <button onClick={() => setEditingArticle(article)} className="text-indigo-600 hover:text-indigo-900 font-semibold">Sửa</button>
                                        <button onClick={() => handleDeleteArticle(article.id)} className="text-red-600 hover:text-red-900 font-semibold">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Vocabulary Packs</h3>
                <p>Số mục từ: {Object.values(vocab).flat().length}</p>
                <p>Số tab: {Object.keys(vocab).length}</p>
                 <button onClick={handleExportVocab} className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Export Vocab Pack (JSON)
                </button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Storage Management</h3>
                <div className="space-y-2">
                    {Object.values(LOCAL_STORAGE_KEYS).map(key => (
                        <div key={key} className="flex justify-between items-center">
                            <code>{key}</code>
                            <button onClick={() => handleClearStorage(key)} className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600">
                                Clear
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Bug Reports ({bugs.length})</h3>
                <div className="h-64 overflow-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bugs.map((bug, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{new Date(bug.time).toLocaleString()}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">{bug.route}</td>
                                    <td className="px-4 py-2 text-sm">{bug.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

const AdminPage: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);

    if (!isUnlocked) {
        return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
    }

    return <AdminDashboard />;
};

export default AdminPage;