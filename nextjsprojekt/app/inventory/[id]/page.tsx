'use client'

import InventoryItem from "../../../models/InventoryItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import formatDate from "../../../helpers/stringFormatHelper";
import { Container, Card, CardBody, CardTitle, Row, CardText, Button } from "reactstrap";

export default function Page({ params }: { params: { id: number } }) {
    let emptyInventoryItem: InventoryItem = {
        id: 0,
        name: "",
        serial_number: "",
        count: 0,
        createdAt: new Date()
    }

    const [inventoryItem, setInventoryItem] = useState<InventoryItem>(emptyInventoryItem);
    
    useEffect(() => {
        fetch('/api/inventory/' + params.id)
        .then((response) => response.json())
        .then((data) => {
          setInventoryItem(data)
          console.log(data);
        });
    }, []);
    
    return(
        <Container>
            <Row className="justify-content-center">
            <Card className="mt-5" style={{width: "40%", backgroundColor: "#343030"}}>
                <CardBody>
                    <CardTitle tag={"h1"} style={{color: "white"}}>{inventoryItem.name}</CardTitle>
                    <CardText tag={"h3"} style={{color: "white"}}>Počet: {inventoryItem.count}</CardText>
                    <CardText tag={"h3"} style={{color: "white"}}>Seriové číslo: {inventoryItem.serial_number}</CardText>
                    <CardText tag={"p"} style={{color: "white"}}>Vytvořeno: {formatDate(inventoryItem.createdAt)}</CardText>
                    
                </CardBody>
            </Card>
            </Row>
            <Row className="justify-content-center mt-4">
                <Button href={`/`} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" style={{width: "10rem", textAlign: "center", justifyContent: "center"}}>Jdi zpátky</Button>
            </Row>
        </Container>
    )
}
