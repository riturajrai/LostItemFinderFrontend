
'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function QRTagsPage() {
  const [quantity, setQuantity] = useState({});
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  // Sticker data
  const stickers = [
    { id: 1, name: 'Standard QR Sticker', description: 'Durable, waterproof QR sticker for everyday items.', price: 2.99, image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop', category: 'standard' },
    { id: 2, name: 'Premium QR Sticker', description: 'High-durability with UV protection for luggage.', price: 4.99, image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=400&h=300&fit=crop', category: 'premium' },
    { id: 3, name: 'Custom QR Sticker', description: 'Personalized design with your choice of logo.', price: 6.99, image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop', category: 'custom' },
    { id: 4, name: 'Mini QR Sticker', description: 'Compact size perfect for earbuds and jewelry.', price: 1.99, image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=400&h=300&fit=crop', category: 'standard' },
    { id: 5, name: 'Large QR Sticker', description: 'Easy scanning on bikes, scooters, and bags.', price: 3.99, image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop', category: 'standard' },
    { id: 6, name: 'Metal QR Sticker', description: 'Premium metal finish for laptops and phones.', price: 5.99, image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop', category: 'premium' },
    { id: 7, name: 'Standard QR Sticker', description: 'Durable, waterproof QR sticker for everyday items.', price: 2.99, image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop', category: 'standard' },
    { id: 8, name: 'Premium QR Sticker', description: 'High-durability with UV protection for luggage.', price: 4.99, image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=400&h=300&fit=crop', category: 'premium' },
    { id: 9, name: 'Custom QR Sticker', description: 'Personalized design with your choice of logo.', price: 6.99, image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop', category: 'custom' },
    { id: 10, name: 'Mini QR Sticker', description: 'Compact size perfect for earbuds and jewelry.', price: 1.99, image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=400&h=300&fit=crop', category: 'standard' },
    { id: 11, name: 'Large QR Sticker', description: 'Easy scanning on bikes, scooters, and bags.', price: 3.99, image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop', category: 'standard' },
    { id: 12, name: 'Metal QR Sticker', description: 'Premium metal finish for laptops and phones.', price: 5.99, image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop', category: 'premium' },
  ];

  // Filter + sort
  const filteredStickers = stickers
    .filter((s) => filter === 'all' || s.category === filter)
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  // Cart
  const addToCart = useCallback((itemName, price, qty) => {
    const totalPrice = (price * qty).toFixed(2);
    toast.success(`${qty} x ${itemName} added! $${totalPrice}`, { position: 'top-right', autoClose: 2500, className: 'text-xs' });
    setQuantity((prev) => ({ ...prev, [itemName]: qty }));
  }, []);

  // Quantity update
  const handleQuantityChange = useCallback((itemName, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantity((prev) => ({ ...prev, [itemName]: qty }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-xs">
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-8"
          >
            <h2 className="text-[14px] font-semibold text-gray-800">QR Stickers</h2>
            <p className="mt-2 text-xs text-gray-600 max-w-2xl mx-auto leading-5">
              Protect your valuables with our secure QR stickers. Attach them to your belongings, such as keys, bags, or electronics, and increase the chances of recovering them if lost. Our stickers are designed for durability and easy scanning, ensuring seamless integration with the Lost & Found Tracker platform.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 max-w-md mx-auto sm:max-w-none">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] shadow-sm"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="custom">Custom</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-200 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] shadow-sm"
              aria-label="Sort stickers"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredStickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-md border border-gray-200 p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative w-full h-32 sm:h-40 mb-3 overflow-hidden rounded-md">
                  <Image
                    src={sticker.image}
                    alt={sticker.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Name + Desc */}
                <h3 className="text-[14px] font-semibold text-gray-800 text-center mb-1">{sticker.name}</h3>
                <p className="text-xs text-gray-600 text-center leading-5 mb-2">{sticker.description}</p>

                {/* Price */}
                <p className="text-xs font-semibold text-[#00BFFF] mb-3">${sticker.price.toFixed(2)}</p>

                {/* Qty + Button */}
                <div className="flex items-center w-full gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity[sticker.name] || 1}
                    onChange={(e) => handleQuantityChange(sticker.name, e.target.value)}
                    className="w-16 px-2 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                    aria-label={`Quantity for ${sticker.name}`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(sticker.name, sticker.price, quantity[sticker.name] || 1)}
                    className="flex-1 py-1.5 px-3 rounded-md text-xs font-medium text-white bg-[#00BFFF] hover:bg-[#00BFFF]/80 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                    aria-label={`Add ${sticker.name} to cart`}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
