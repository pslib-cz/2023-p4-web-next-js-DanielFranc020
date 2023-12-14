import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InventoryItem from "../../models/InventoryItem";
import Link from "next/link";
import { Container, List, Row, ListGroupItem, Spinner, Button } from "reactstrap";

interface InventoryListProps {
    data: InventoryItem[],
    setData: Dispatch<SetStateAction<InventoryItem[]>>;
  }

export default function InventoryList({ data, setData }: InventoryListProps) 
{
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(true);
        fetch('/api/inventory')
          .then((response) => response.json())
          .then((data) => {
            setData(data)
            console.log(data);
            setIsLoading(false)
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
      <List className="mt-4 mb-4 text-center rounded" style={{backgroundColor: "#343030" }}>
        <ListGroupItem className="text-center"><h1 style={{color: "white"}}>Items</h1></ListGroupItem>
        {data.map((val, i) => <Row className="mb-2"><Container key={i} style={{color: "white", fontWeight: "bold"}}>{val.name} <Link href={`/inventory/${val.id}`} style={{color: "white", textDecoration: "none", padding: "10px", left: "0", fontWeight: "normal"}} color="primary">ZOBRAZ VICE</Link><Button key={i} onClick={() => deleteItem(val.id)} className="" style={{}}>SMAZAT</Button></Container></Row>)}
        {isLoading &&
            <Spinner className="mb-2"  color="white">
            Loading...
          </Spinner>
        }

      </List>

    )
}