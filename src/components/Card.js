import React from "react"

export default function Card({ suit, rank, faceUp, handleClick, last, highlighted }) {
    let cardStyle
    let suitSvg
    let suitSvg2
    switch (suit) {
        case "Clubs":
            suitSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-suit-club-fill" viewBox="0 0 16 16">
                <path d="M11.5 12.5a3.5 3.5 0 0 1-2.684-1.254 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5"/>
                </svg>
            suitSvg2 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-suit-club-fill" viewBox="0 0 16 16">
                <path d="M11.5 12.5a3.5 3.5 0 0 1-2.684-1.254 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5"/>
                </svg>
            cardStyle = "club"
            break;
        case "Spades":
            suitSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-suit-spade-fill" viewBox="0 0 16 16">
                <path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907"/>
                </svg>
            suitSvg2 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-suit-spade-fill" viewBox="0 0 16 16">
                <path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 20 20 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a20 20 0 0 0 1.582-2.907"/>
                </svg>
            cardStyle = "spade"
            break;
        case "Hearts":
            suitSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                </svg>
            suitSvg2 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                </svg>
            cardStyle = "heart"
            break;
        case "Diamonds":
            suitSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-suit-diamond-fill" viewBox="0 0 16 16">
                <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2"/>
                </svg>
            suitSvg2 = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-suit-diamond-fill" viewBox="0 0 16 16">
                <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2"/>
                </svg>
            cardStyle = "diamond"
            break;
    }

    return (
        <div>
            <div className={`${!last && 'overlapped'} ${faceUp && 'face-up'}`}>
                { faceUp ? <div onClick={handleClick} className={`card card-front ${highlighted && "highlighted"} ${cardStyle} py-1 px-2`}>
                    <div className="card-rank-left">{rank}</div>
                    <div className="card-suit-left">{suitSvg}</div> 
                    <div className="card-suit-right">{suitSvg2}</div> 
                    <div className="card-rank-right">{rank}</div>
                </div> 
                : <div className="card card-back"><div className="inner-card-back"></div></div>}
            </div>
        </div>
      
    );
}
  