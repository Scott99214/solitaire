import React from "react"
import Card from "./Card"

export default function CardPile({ pileIndex, cards, handlePileClick, suits, ranks }) {
    return (
        <div className="col card-pile" onClick={() => handlePileClick(pileIndex)}>
        {cards.length > 0 ? (
            <Card
                key={cards[cards.length-1].id}
                suit={suits[cards[cards.length-1].suit]}
                rank={ranks[cards[cards.length-1].rank]}
                faceUp={true}
                last={true}
            />
            
        ) : (
            <div className="col card-pile empty-deck" ></div>
        )}
        </div>
    );
}
  