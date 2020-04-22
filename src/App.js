/* eslint-disable no-case-declarations */
import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Container, Row, Col } from 'react-bootstrap';
import { Basket } from './components/Basket';
import { PizzaCard } from './components/PizzaCard';

import pizzas from './data';

function basketReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      let updatedState = [...state];
      const pizzasInLocalStorage =
        JSON.parse(localStorage.getItem('pizzas')) || [];

      if (!pizzasInLocalStorage.find(pizza => pizza.id === action.item.id)) {
        localStorage.setItem('pizzas', JSON.stringify([...state, action.item]));
      }
      updatedState = [...state, action.item];
      return updatedState;
    case 'REMOTE_ITEM':
      localStorage.setItem(
        'pizzas',
        JSON.stringify([...state.filter(item => item.id !== action.id)])
      );
      return [...state.filter(item => item.id !== action.id)];
    case 'CLEAR_ALL':
      localStorage.removeItem('pizzas');
      return [];
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    basketReducer,
    JSON.parse(localStorage.getItem('pizzas')) || []
  );

  function addToBasket(item) {
    dispatch({ type: 'ADD_ITEM', item });
  }

  function removeFromBasket(id) {
    dispatch({ type: 'REMOTE_ITEM', id });
  }

  function clearBasket() {
    dispatch({ type: 'CLEAR_ALL' });
  }

  return (
    <>
      <Container>
        <Row>
          {pizzas &&
            pizzas.map(data => (
              <Col xs={3} className="mb-5" key={`${data.id}`}>
                <PizzaCard data={data} addToBasket={addToBasket} />
              </Col>
            ))}
        </Row>
      </Container>

      {state.length > 0 && (
        <Basket
          items={state}
          removeFromBasket={removeFromBasket}
          clearBasket={clearBasket}
        />
      )}
    </>
  );
}

export default App;
