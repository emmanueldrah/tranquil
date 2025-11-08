'use client';

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ComparisonProvider } from "@/context/ComparisonContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { NotificationProvider } from "@/context/NotificationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ComparisonProvider>
          <RecentlyViewedProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </RecentlyViewedProvider>
        </ComparisonProvider>
      </CartProvider>
    </AuthProvider>
  );
}
