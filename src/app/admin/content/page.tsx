'use client';

import { useState } from 'react';
import { FileText, Image, Video, Music, Upload, Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'post' | 'image' | 'video' | 'audio' | 'document';
  status: 'published' | 'draft' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  size?: string;
  url?: string;
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [uploadedFiles, setUploadedFiles] = useState<ContentItem[]>([]);

  // Mock content data
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Home Page',
      type: 'page',
      status: 'published',
      author: 'Admin User',
      createdAt: '2024-01-01',
      updatedAt: '2024-11-15'
    },
    {
      id: '2',
      title: 'About Us',
      type: 'page',
      status: 'published',
      author: 'Admin User',
      createdAt: '2024-01-01',
      updatedAt: '2024-11-10'
    },
    {
      id: '3',
      title: 'Product Showcase',
      type: 'post',
      status: 'draft',
      author: 'Admin User',
      createdAt: '2024-11-01',
      updatedAt: '2024-11-01'
    },
    {
      id: '4',
      title: 'hero-banner.jpg',
      type: 'image',
      status: 'published',
      author: 'Admin User',
      createdAt: '2024-10-15',
      updatedAt: '2024-10-15',
      size: '2.4 MB',
      url: '/images/hero-banner.jpg'
    },
    {
      id: '5',
      title: 'product-demo.mp4',
      type: 'video',
      status: 'published',
      author: 'Admin User',
      createdAt: '2024-11-01',
      updatedAt: '2024-11-01',
      size: '45.2 MB',
      url: '/videos/product-demo.mp4'
    }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = activeTab === 'all' || (activeTab === 'pages' && item.type === 'page') ||
                       (activeTab === 'posts' && item.type === 'post') ||
                       (activeTab === 'media' && ['image', 'video', 'audio'].includes(item.type));
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
      case 'post':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'draft':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'archived':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Content', count: contentItems.length },
    { id: 'pages', label: 'Pages', count: contentItems.filter(i => i.type === 'page').length },
    { id: 'posts', label: 'Posts', count: contentItems.filter(i => i.type === 'post').length },
    { id: 'media', label: 'Media', count: contentItems.filter(i => ['image', 'video', 'audio'].includes(i.type)).length }
  ];

  return (
    <div className="space-y-6">
  <Card className="card-admin p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage website content, pages, and media assets.
            </p>
          </div>
          <Button variant="primary" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant="ghost"
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </Button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft' | 'archived')}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(item.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</div>
                        {item.size && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.size}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white capitalize">{item.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button variant="ghost" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No content found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload New Content</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="primary" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Choose Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
