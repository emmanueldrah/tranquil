'use client';

import { useState, useEffect } from 'react';
import { getAllVendors, deleteVendor } from '@/data';
import { Vendor } from '@/types';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadVendors = async () => {
    try {
      const data = await getAllVendors();
      setVendors(data);
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleDelete = async (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await deleteVendor(vendorId);
        await loadVendors();
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
  <Card className="card-admin p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Vendors</h1>
          <Button href="/admin/vendors/new" variant="primary">
            Add Vendor
          </Button>
        </div>
      </Card>

  <Card className="card-admin p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={vendor.logo}
                        alt={vendor.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {vendor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {vendor.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {vendor.contactInfo.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {vendor.contactInfo.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {vendor.products.length} products
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {vendor.rating.toFixed(1)} ({vendor.reviews} reviews)
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/vendors/edit/${vendor.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <Button onClick={() => handleDelete(vendor.id)} variant="ghost" className="text-red-600 hover:text-red-900">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Card>
    </div>
  );
}
