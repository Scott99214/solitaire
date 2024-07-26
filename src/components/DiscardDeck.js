import React from "react"
import Card from "./Card"

export default function DiscardDeck({ cards, handleDiscardClick, suits, ranks}) {
    return (
      <div>
        {cards.length > 0 ? (
            <Card
                key={cards[cards.length-1].id}
                suit={suits[cards[cards.length-1].suit]}
                rank={ranks[cards[cards.length-1].rank]}
                faceUp={true}
                handleClick={() => handleDiscardClick(cards[cards.length-1].id)}
                last={true}
                highlighted={cards[cards.length-1].highlighted}
            />
            
        ) : (
            <div className="empty-deck"></div>
        )}
      </div>
    );
}
  