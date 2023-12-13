import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InventoryItem from "../../models/InventoryItem";

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
          });
      }, []);

    return ( 
        <ul>  
            <li>Karel</li>

        </ul>
    )
}