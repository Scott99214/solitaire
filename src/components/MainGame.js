import React from "react"
import CardPile from "./CardPile"
import Deck from "./Deck"
import DiscardDeck from "./DiscardDeck"

export default function MainGame({
    miniDecks,
    discardDeck,
    cardPiles,
    handleDeckClick,
    handleDiscardClick,
    handlePileClick,
    emptyDeckClick,
    handleSpareDeckClick,
    suits,
    ranks
  }) {
    return (
      <div>
        <div className="row mx-5 main-game mt-4">
          {miniDecks.slice(0, -1).map((deck, index) => (
            <Deck
              key={index}
              cards={deck}
              handleCardClick={handleDeckClick}
              emptyDeckClick={() => emptyDeckClick(index)}
              suits={suits}
              ranks={ranks}
            />
          ))}
        </div>
        <div className="row mx-5">
          <div className="col" onClick={() => handleSpareDeckClick(miniDecks[miniDecks.length - 1].length)}>
            {miniDecks[miniDecks.length - 1].length > 0 ? <div className="card card-back" ><div className="inner-card-back"></div></div> : <div className="empty-deck" ></div>}
          </div>
          <div className="col-3">
            <DiscardDeck
              cards={discardDeck}
              handleDiscardClick={handleDiscardClick}
              suits={suits}
              ranks={ranks}
            />
          </div>
          {cardPiles.map((pile, index) => (
            <CardPile
              key={index}
              pileIndex={index}
              cards={pile}
              handlePileClick={handlePileClick}
              suits={suits}
              ranks={ranks}
            />
          ))}
        </div>
      </div>
    );
  }
  