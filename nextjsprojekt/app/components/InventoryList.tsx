import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InventoryItem from "../../models/InventoryItem";
import Link from "next/link";

interface InventoryListProps {
    data: InventoryItem[],
    setData: Dispatch<SetStateAction<InventoryItem[]>>;
  }

export default function InventoryList({ data, setData }: InventoryListProps) 
{
    useEffect(() => {
        fetch('/api/inventory')
          .then((response) => response.json())
          .then((data) => {
            setData(data)
            console.log(data);
          });
      }, []);
      
    function deleteItem(id: number) {
      fetch(`/api/inventory`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
      })
        .then((response) => {
          return response.json()
        })
        .then((deletedInventoryItem) => {
          setData(data.filter((InventoryItem) => InventoryItem.id !== deletedInventoryItem.id));
        })
    }
    
    return ( 
        <ul>  

            {data.map((val, i) => <li key={i}>{val.name} <Link href={`/inventory/${val.id}`}>ZOBRAZ VICE</Link><button key={i} onClick={() => deleteItem(val.id)}>SMAZAT</button></li>)}

        </ul>
    )
}