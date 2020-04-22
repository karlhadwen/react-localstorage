import React, { useState } from 'react';

export function Basket({ items, removeFromBasket, clearBasket }) {
  const [basketOpen, setBasketOpen] = useState(false);

  return (
    <div className="basket">
      <div
        tabIndex={0}
        role="button"
        className="container"
        onClick={() => setBasketOpen(!basketOpen)}
        onKeyPress={() => setBasketOpen(!basketOpen)}
      >
        <div className="basket__header">
          <div className="basket__action">
            💰 {!basketOpen ? 'Open Basket' : 'Close Basket'}
          </div>
          <div className="basket__clear">
            <button type="button" onClick={() => clearBasket()}>
              Clear basket
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {basketOpen && (
          <>
            {items.map(item => (
              <div className="basket__item" key={`${item.id}`}>
                <p className="mb-0">
                  <span className="basket__item-size mr-2">
                    <span className="font-weight-bold">Size:</span>{' '}
                    {item.size.label}
                  </span>
                  <span className="basket__item-topping mr-2">
                    {item.toppings.length > 0 && (
                      <span className="font-weight-bold">Toppings: </span>
                    )}
                    {item.toppings.length > 0 &&
                      item.toppings.map(topping => (
                        <span
                          className="mr-2"
                          key={`${item.id}-${topping.value}`}
                        >
                          {topping.label}
                        </span>
                      ))}
                  </span>
                </p>
                <button type="button" onClick={() => removeFromBasket(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
