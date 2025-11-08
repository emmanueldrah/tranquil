'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import VendorGuard, { useVendorForCurrentUser } from '@/components/vendor/VendorGuard';
import { updateVendor } from '@/data';

export default function VendorProfilePage() {
  const { vendor, isAdmin } = useVendorForCurrentUser();
  const [form, setForm] = useState(() => vendor ? { ...vendor } : null);

  if (!vendor && !isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold">Access denied</h2>
        <p className="text-sm text-gray-600 mt-2">You must be the vendor owner or an admin to edit this profile.</p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const { id, ...updateData } = form;
    updateVendor(id, updateData);
    alert('Vendor profile updated (local storage)');
  };

  return (
    <VendorGuard>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Vendor Profile</h2>
        {form ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input value={form.contactInfo?.email} onChange={(e) => setForm({ ...form, contactInfo: { ...form.contactInfo, email: e.target.value } })} className="mt-1 block w-full rounded-md border-gray-300" />
            </div>
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="primary" className="px-4 py-2">Save</Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-500">No vendor selected.</p>
        )}
      </div>
    </VendorGuard>
  );
}
