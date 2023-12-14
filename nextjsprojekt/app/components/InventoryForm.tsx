// components/InventoryForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import InventoryItem from '../../models/InventoryItem';
import { Form, Button,  Input, FormGroup, Label, Row } from 'reactstrap';
interface InventoryFormProps {
  sendData: (item: InventoryItem) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ sendData }) => {
  const { register, handleSubmit } = useForm<InventoryItem>();

  const handleFormSubmit = (data: InventoryItem) => {
    console.log("ANOoo")
    sendData(data);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 rounded shadow-md text-center" style={{backgroundColor: "#343030"}}>
      <FormGroup>
      <Label className="block mb-2" style={{color: "#ffffff", width: "80%"}}>
        Item Name: 

        <Row><input
          {...register('name', { required: true })}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 text-black"
        />
        </Row>
      </Label>
      </FormGroup>
      <FormGroup>
      <Label className="block mb-2" style={{color: "#ffffff", width: "80%"}}>
        Serial number:
        <Row>
        <input 
          {...register('serial_number', { required: true })}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 text-black"
        />
        </Row>
      </Label>
      </FormGroup>
      <FormGroup>
      <Label className="block mb-2" style={{color: "#ffffff"}}>
        Quantity: 
        <Row>
        <input
          type="number"
          {...register('count', { required: true, valueAsNumber: true })}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 text-black"
        />
        </Row>
      </Label>
      </FormGroup>
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Add to Inventory
      </Button>
      </Form>
  );
};

export default InventoryForm;
