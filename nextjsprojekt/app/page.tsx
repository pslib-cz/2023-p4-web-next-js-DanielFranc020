'use client'

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryItem from '../models/InventoryItem';
import InventoryList from './components/InventoryList';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() 
{
    const [inventory, setInventory]: [InventoryItem[], Dispatch<SetStateAction<InventoryItem[]>>] = useState<InventoryItem[]>([]);
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
        <Container>
        <Card className="my-4 text-center" style={{backgroundColor: "#343030"}}>
          <CardBody>
            <CardTitle tag="h1" className="display-4" style={{color: "#ffffff"}}>Inventory Manager</CardTitle>
            <CardSubtitle tag="p" className="lead" style={{color: "#eeeeee"}}>The best app for managing your company's inventory ever</CardSubtitle>
          </CardBody>
        </Card>
  
        <Row className="justify-content-center">
          <Col md={6}>
            <InventoryForm sendData={handleAddToInventory} />
          </Col>
        </Row>
        <Row className="justify-content-center">          
            <Col md={6}>
                <InventoryList data={inventory} setData={setInventory} />
            </Col>
          </Row>
      </Container>
    )
}