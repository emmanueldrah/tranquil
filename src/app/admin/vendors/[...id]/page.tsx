'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getVendorById, addVendor, updateVendor } from '@/data';
import { Vendor } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function VendorForm({
  params,
}: {
  params: { id?: string[] };
}) {
  const router = useRouter();
  const isEditing = params.id?.[0] !== undefined;

  const [formData, setFormData] = useState<Partial<Vendor>>({
    name: '',
    description: '',
    logo: '',
    rating: 0,
    reviews: 0,
    products: [],
    joinedDate: '',
    contactInfo: {
      phone: '',
      email: '',
      address: '',
    },
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && params.id?.[0]) {
      const vendor = getVendorById(params.id[0]);
      if (vendor) {
        setFormData(vendor);
      }
    }
  }, [isEditing, params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('contactInfo.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo!,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && params.id?.[0]) {
        updateVendor(formData as Vendor);
      } else {
        const newVendor: Vendor = {
          ...formData as Vendor,
          id: uuidv4(),
          rating: 0,
          reviews: 0,
          products: [],
          joinedDate: new Date().toISOString(),
        };
        addVendor(newVendor);
      }
      router.push('/admin/vendors');
    } catch (err) {
      setError('Error saving vendor. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {isEditing ? 'Edit Vendor' : 'Add New Vendor'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo URL
          </label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            name="contactInfo.email"
            value={formData.contactInfo?.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contactInfo.phone"
            value={formData.contactInfo?.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="contactInfo.address"
            value={formData.contactInfo?.address}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Update Vendor' : 'Add Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
}