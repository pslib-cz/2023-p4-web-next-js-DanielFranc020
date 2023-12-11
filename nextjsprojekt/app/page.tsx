'use client'

import React, { useState, useEffect } from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryItem from '../models/InventoryItem';
import InventoryList from './components/InventoryList';


export default function Home() 
{
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const handleAddToInventory = async (item: InventoryItem) => {
        console.log(JSON.stringify(item))
        const response = await fetch('/api/inventory', {
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
    }

    return ( 
        <div>
            <h1>Inventory manager</h1>
            <h2>The best app for managing your company's inventory ever</h2>
            <InventoryForm sendData={handleAddToInventory}/>
            <InventoryList/>
        </div>
    )
}