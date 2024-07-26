import React from "react"
import Card from "./Card"

export default function Deck({ cards, handleCardClick, emptyDeckClick, suits, ranks}) {
    return (
      <div className="col">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={card.id}
              suit={suits[card.suit]}
              rank={ranks[card.rank]}
              faceUp={card.faceUp}
              handleClick={() => handleCardClick(card.id)}
              last={index == cards.length-1}
              first={index == 0}
              highlighted={card.highlighted}
            />
          ))
        ) : (
          <div onClick={emptyDeckClick} className="empty-deck" ></div>
        )}
      </div>
    );
  }
  