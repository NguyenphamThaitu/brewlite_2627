'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api, vnd } from '@/lib/api';
import type { Product } from '@/lib/types';

export default function MenuPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => api<Product[]>('/products'),
  });

  if (isLoading) return <p>Đang tải menu...</p>;
  if (error) return <p className="text-red-600">Lỗi: {(error as Error).message}</p>;
  if (!data?.length) return <p>Chưa có sản phẩm nào.</p>;

  return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {data.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="rounded-lg border p-3 hover:shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt={p.name} className="mb-2 h-32 w-full rounded object-cover" />
              <div className="font-semibold">{p.name}</div>
              <div>{vnd(p.price)}</div>
            </Link>
        ))}
      </div>
  );
}