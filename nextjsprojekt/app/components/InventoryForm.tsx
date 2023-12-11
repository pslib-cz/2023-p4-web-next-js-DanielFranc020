// components/InventoryForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface InventoryItem {
  itemName: string;
  quantity: number;
}

interface InventoryFormProps {
  onSubmit: (item: InventoryItem) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<InventoryItem>();

  const handleFormSubmit = (data: InventoryItem) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4 p-4 bg-white rounded shadow-md">
      <label className="block mb-2">
        Item Name:
        <input
          {...register('itemName', { required: true })}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 text-black"
        />
      </label>
      <label className="block mb-2">
        Quantity:
        <input
          type="number"
          {...register('quantity', { required: true })}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 text-black"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Add to Inventory
      </button>
    </form>
  );
};

export default InventoryForm;
