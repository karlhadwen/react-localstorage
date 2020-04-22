import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const optionsToppings = [
  { value: 'extra-cheese', label: '🧀 Extra Cheese' },
  { value: 'onions', label: '🧅 Onions' },
  { value: 'bacon', label: '🥓 Bacon' },
  { value: 'basil', label: '🌿 Basil' },
];

const optionsSize = [
  { value: '9', label: '🍕 Small - 9 Inches' },
  { value: '12', label: '🍕 Medium - 12 Inches' },
  { value: '14', label: '🍕 Large - 14 Inches' },
  { value: '18', label: '🍕 Extra-large - 18 Inches' },
];

export function PizzaCard({ data, addToBasket }) {
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState(false);
  const [inBasket, setInBasket] = useState(false);

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: 'green',
      },
    };
  }

  function handleAddToBasket(pizzaId) {
    addToBasket({ id: pizzaId, size, toppings });
    setInBasket(true);
  }

  return (
    <Card className="h-100 shadow-sm bg-white rounded">
      <Card.Img variant="top" src={data.image} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex mb-2 justify-content-between">
          <Card.Title className="mb-0 font-weight-bold">{data.name}</Card.Title>
          <Badge pill className="mb-1" variant="warning">
            £{data.price}
          </Badge>
        </div>
        <Card.Text className="text-secondary">{data.desc}</Card.Text>
        <Select
          components={makeAnimated()}
          theme={customTheme}
          onChange={setToppings}
          options={optionsToppings}
          className="mb-3"
          placeHolder="Select Pizza toppings"
          noOptionsMessage={() => 'No other pizza toppings :('}
          isMulti
          isDisabled={inBasket}
          isSearchable
        />
        <Select
          theme={customTheme}
          options={optionsSize}
          onChange={setSize}
          className="mb-3"
          placeholder="Select Pizza size"
          isDisabled={inBasket}
          isSearchable
        />
        <Button
          onClick={!inBasket && size ? () => handleAddToBasket(data.id) : null}
          className="mt-auto font-weight-bold"
          variant="success"
          disabled={inBasket}
          block
        >
          {inBasket ? 'In Basket' : 'Order Pizza 🍕'}
        </Button>
      </Card.Body>
    </Card>
  );
}
