import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://12th-assignment-server-side.vercel.app/classes');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApproveClick = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === cardId ? { ...card, isApproved: true } : card
      )
    );
  };

  const handleDenyClick = (cardId) => {
    // Deny button click logic here
  };

  const isButtonDisabled = (cardId) => {
    const card = cards.find((card) => card._id === cardId);
    return card && card.isApproved;
  };

  return (
    <div>
      {cards.map((card) => (
        <div key={card._id}>
          <div>{card.content}</div>
          <button
            onClick={() => handleApproveClick(card._id)}
            disabled={card.isApproved}
          >
            Approve
          </button> &nbsp;
          <button
            onClick={() => handleDenyClick(card._id)}
            disabled={isButtonDisabled(card._id)}
          >
            Deny
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
