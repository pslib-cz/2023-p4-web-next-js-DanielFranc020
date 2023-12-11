'use client'

// pages/index.tsx
import React, { useState, useEffect } from 'react';
import InventoryForm from './components/InventoryForm';

interface InventoryItem {
  itemName: string;
  quantity: number;
}

const Home: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./api/inventory');
      const items = await response.json();
      setInventory(items);
    };

    fetchInventory();
  }, []);

  const handleAddToInventory = async (item: InventoryItem) => {
    const response = await fetch('./api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      const newItem = await response.json();
      setInventory((prevInventory) => [...prevInventory, newItem]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-black">Inventory Management</h1>
      <InventoryForm onSubmit={handleAddToInventory} />
      <ul className="mt-4">
        {inventory.map((item, index) => (
          <li
            key={index}
            className="bg-white p-4 mb-2 shadow-md rounded"
          >
            {item.itemName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
