import React from "react"
import './App.css';
import MainGame from './components/MainGame'
import {nanoid} from "nanoid"


function App() {
  const suits = ['Spades', 'Diamonds', 'Clubs',  'Hearts'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const discardDeckIndex = 8
  const [miniDecks, setMiniDecks] = React.useState(setUpDecks());
  const [discardDeck, setDiscardDeck] = React.useState([]);
  const [cardPiles, setCardPiles] = React.useState([[], [], [], []]);
  const [highlightedCard, setHighlightedCard] = React.useState(null);

  function setUpDecks() {
    const deckSizes = [1, 2, 3, 4, 5, 6, 7, 24];
    let miniDecks = [];
    let deck = [];

    for (let suit in suits) {
      for (let rank in ranks) {
        deck.push({ suit, rank, id: nanoid(), faceUp: false, deckNum: 0, highlighted: false });
      }
    }

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    let deckOffset = 0;
    for (let deckIndex = 0; deckIndex < deckSizes.length; deckIndex++) {
      miniDecks.push([...deck.slice(deckOffset, deckSizes[deckIndex] + deckOffset).map(card => {
        return { ...card, deckNum: deckIndex };
      })]);
      deckOffset += deckSizes[deckIndex];
    }
    return miniDecks;
  }

  function moveCards(oldDeckIndex, newDeckIndex) {
    setMiniDecks(oldMiniDecks => {
      let newMiniDecks = oldMiniDecks.map(deck => [...deck]);
      let oldDeck = oldDeckIndex === discardDeckIndex ? discardDeck : newMiniDecks[oldDeckIndex];
      let highlightedCardIndex = oldDeck.findIndex(card => card.id === highlightedCard.id);

      if (!Array.isArray(newMiniDecks[newDeckIndex])) {
        newMiniDecks[newDeckIndex] = [];
      }

      if (highlightedCardIndex === oldDeck.length - 1) {
        oldDeck.pop();
        newMiniDecks[newDeckIndex].push({ ...highlightedCard, deckNum: newDeckIndex });
      } else {
        let movingCards = oldDeck.splice(highlightedCardIndex); 
        movingCards.forEach(card => card.deckNum = newDeckIndex); 
        newMiniDecks[newDeckIndex].push(...movingCards);
      }

      return newMiniDecks;
    });
  } 

  function handleClick(id) {
    let clickedCard;
    for (let deck of miniDecks) {
      for (let card of deck) {
        if (card.id === id) {
          clickedCard = card;
          break;
        }
      }
    }

    for (let card of discardDeck) {
      if (card.id === id) {
        clickedCard = card;
        break;
      }
    }

    if (highlightedCard) {
      if (clickedCard.id === highlightedCard.id) {
        setHighlightedCard(null);
        clickedCard.highlighted = false;
      } else {
        if (((highlightedCard.suit % 2 === 0 && clickedCard.suit % 2 !== 0) || 
             (highlightedCard.suit % 2 !== 0 && clickedCard.suit % 2 === 0))) {
          if (Number(clickedCard.rank) === Number(highlightedCard.rank) + 1) {
            let oldDeckIndex = Number(highlightedCard.deckNum);
            let newDeckIndex = Number(clickedCard.deckNum);
            moveCards(oldDeckIndex, newDeckIndex);
            highlightedCard.highlighted = false
            setHighlightedCard(null);
          }
        } else {
          highlightedCard.highlighted = false
          setHighlightedCard(null)
        }
      }
    } else {
      if (highlightedCard) {
        highlightedCard.highlighted = false
      }
      setHighlightedCard(clickedCard);
      clickedCard.highlighted = true
    }
  }

  function emptyDeckClick(newDeckIndex) {
    if (highlightedCard) {
      if (Number(highlightedCard.rank) === 12) {
        let oldDeckIndex = Number(highlightedCard.deckNum);
        moveCards(oldDeckIndex, newDeckIndex);
        highlightedCard.highlighted = false
        setHighlightedCard(null);
      }
    }
  }

  function refillSpareDeck() {
    if (discardDeck.length > 0) {
      setMiniDecks(oldMiniDecks => {
        let newMiniDecks = [...oldMiniDecks];
        newMiniDecks[7] = [...discardDeck.reverse()];
        return newMiniDecks;
      });
      setDiscardDeck([]);
    }
  }

  function handleSpareDeckClick(deckLength) {
    if (deckLength > 0) {
      let movingCard;
      setMiniDecks(oldMiniDecks => {
        let newMiniDecks = [...oldMiniDecks];
        movingCard = newMiniDecks[newMiniDecks.length - 1].pop();
        movingCard.deckNum = discardDeckIndex;
        return newMiniDecks;
      });
      setDiscardDeck(oldDiscardDeck => [...oldDiscardDeck, movingCard]);
    } else {
      refillSpareDeck()
    }
    if (highlightedCard) {
      highlightedCard.highlighted = false
      setHighlightedCard(null)
    }
  }

  function discardDeckClick(id) {
    if (!highlightedCard) {
      handleClick(id);
    } else {
      if (highlightedCard.id === id) {
        highlightedCard.highlighted = false
        setHighlightedCard(null);
      }
    }
  }

  function deckPileClick(pileIndex) {
    if (highlightedCard) {
      let cardPile = cardPiles[pileIndex];
      if (cardPile.length > 0) {
        let topPileCard = cardPile[cardPile.length - 1];
        if (Number(highlightedCard.suit) === Number(topPileCard.suit) && Number(highlightedCard.rank) === Number(topPileCard.rank) + 1) {
          let oldDeck = highlightedCard.deckNum === discardDeckIndex ? [...discardDeck] : [...miniDecks[highlightedCard.deckNum]];
          if (oldDeck[oldDeck.length - 1].id === highlightedCard.id) {
            setCardPiles(oldCardPiles => {
              let newCardPiles = [...oldCardPiles];
              newCardPiles[pileIndex].push(highlightedCard);
              return newCardPiles;
            });
            if (highlightedCard.deckNum === discardDeckIndex) {
              setDiscardDeck(oldDiscardDeck => {
                let newDiscardDeck = [...oldDiscardDeck];
                newDiscardDeck.pop();
                return newDiscardDeck;
              });
            } else {
              setMiniDecks(oldMiniDecks => {
                let newMiniDecks = [...oldMiniDecks];
                newMiniDecks[highlightedCard.deckNum].pop();
                return newMiniDecks;
              });
            }
            highlightedCard.highlighted = false
            setHighlightedCard(null);
          }
        }
      } else {
        console.log(highlightedCard.rank)
        if (Number(highlightedCard.rank) === 0) {
          setCardPiles(oldCardPiles => {
            let newCardPiles = [...oldCardPiles];
            newCardPiles[pileIndex].push(highlightedCard);
            return newCardPiles;
          });
          if (highlightedCard.deckNum === discardDeckIndex) {
            setDiscardDeck(oldDiscardDeck => {
              let newDiscardDeck = [...oldDiscardDeck];
              newDiscardDeck.pop();
              return newDiscardDeck;
            });
          } else {
            setMiniDecks(oldMiniDecks => {
              let newMiniDecks = [...oldMiniDecks];
              newMiniDecks[highlightedCard.deckNum].pop();
              return newMiniDecks;
            });
          }
          highlightedCard.highlighted = false
          setHighlightedCard(null);
        }
      }
      
    } 
  }

  for (let i = 0; i < miniDecks.length; i++) {
    if (miniDecks[i].length > 0) {
      miniDecks[i][miniDecks[i].length-1].faceUp = true
    }
  }

  return (
    <div>
      <MainGame
        ranks={ranks}
        suits={suits}
        miniDecks={miniDecks}
        discardDeck={discardDeck}
        cardPiles={cardPiles}
        handleDeckClick={handleClick}
        handleDiscardClick={discardDeckClick}
        handlePileClick={deckPileClick}
        emptyDeckClick={emptyDeckClick}
        handleSpareDeckClick={handleSpareDeckClick}
      />
    </div>
  );
} 

export default App;
