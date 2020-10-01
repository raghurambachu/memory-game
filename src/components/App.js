import React from "react";
import { v4 as uuidv4 } from "uuid";
import { FiRefreshCcw } from "react-icons/fi";
import { AiFillBank, AiFillCar, AiFillCrown, AiFillGift } from "react-icons/ai";
import {
  BsFillAlarmFill,
  BsFillBrightnessHighFill,
  BsCalendarFill,
  BsBriefcaseFill,
} from "react-icons/bs";

import Timer from "./Timer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      move: 0,
      cards: [],
      cardsFlipped: [],
      processing: false,
    };
    this.showCard = this.showCard.bind(this);
    this.showStars = this.showStars.bind(this);
  }

  componentDidMount() {
    this.setState({ cards: getData() });
  }

  showCard({ id, cid }) {
    let cardsFlipped = [...this.state.cardsFlipped, { id, cid }];
    const { cards } = this.state;
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isFlipped: !card.isFlipped,
        };
      }
      return card;
    });
    let processing = cardsFlipped.length === 2 ? true : false;
    this.setState({ cards: newCards, cardsFlipped, processing });
  }

  componentDidUpdate(prevProps, prevState) {
    let cardsFlipped = this.state.cardsFlipped;
    let newCards = this.state.cards.slice();
    if (cardsFlipped.length === 2) {
      let move = prevState.move + 1;
      const [first, second] = cardsFlipped;
      if (first.cid === second.cid) {
        newCards = newCards.map((card) => {
          if (cardsFlipped.some((flippedCard) => flippedCard.id === card.id)) {
            return { ...card, isMatched: true, isFlipped: true };
          }
          return card;
        });
        this.setState({
          cards: newCards,
          cardsFlipped: [],
          move,
          processing: false,
        });
      } else {
        setTimeout(() => {
          newCards = newCards.map((card) => {
            if (
              cardsFlipped.some((flippedCard) => flippedCard.id === card.id)
            ) {
              return { ...card, isFlipped: false, isMatched: false };
            }
            return card;
          });
          this.setState({
            cards: newCards,
            cardsFlipped: [],
            move,
            processing: false,
          });
        }, 1000);
      }
    }
  }

  showStars(moves) {
    if (moves <= 8) return "⭐".repeat(3);
    else if (moves > 8 && moves <= 16) return "⭐".repeat(2);
    else if (moves > 16) return "⭐";
  }

  render() {
    const { cards } = this.state;
    let stars = this.showStars(this.state.move);
    let haveWon = this.state.cards.every((card) => card.isMatched);

    return (
      <div className="min-h-screen flex justify-center pt-6 text-center text-2xl">
        <div className="memory-game">
          <div className="flex justify-center items-center">
            <h2 className="mr-8">
              <Timer haveWon={haveWon} />
            </h2>
            <a href="/">
              <FiRefreshCcw />
            </a>
          </div>
          <h3 className="font-bold text-2xl text-center  mb-4">
            <span className="mr-8">{stars}</span> Moves : {this.state.move}{" "}
            <span className="text-green text-lg mr-8">
              {haveWon && "Hurray won the game"}
            </span>
          </h3>
          <ul className="flex justify-between flex-wrap gap-4 p-4 bg-gray-500 shadow-2xl ">
            {cards.map((card) => {
              return card.isFlipped ? (
                <li
                  key={card.id}
                  className={
                    card.isMatched
                      ? "w-16 h-4 sm:w-32 sm:h-32 bg-green-200 flex items-center justify-center shadow-md"
                      : "w-16 h-16 sm:w-32 sm:h-32 bg-blue-400 flex items-center justify-center shadow-md "
                  }
                >
                  {card.icon}
                </li>
              ) : (
                <li
                  key={card.id}
                  className="w-16 h-16 sm:w-32 sm:h-32 bg-gray-900 shadow-md cursor-pointer"
                  onClick={() =>
                    !this.state.processing &&
                    this.showCard({ id: card.id, cid: card.cid })
                  }
                ></li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

function getData() {
  return [
    {
      id: uuidv4(),
      icon: <AiFillBank size={64} />,
      isFlipped: false,
      cid: 100,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillCar size={64} />,
      isFlipped: false,
      cid: 101,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillCrown size={64} />,
      isFlipped: false,
      cid: 102,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillGift size={64} />,
      isFlipped: false,
      cid: 103,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsFillAlarmFill size={64} />,
      isFlipped: false,
      cid: 104,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsFillBrightnessHighFill size={64} />,
      isFlipped: false,
      cid: 105,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsFillBrightnessHighFill size={64} />,
      isFlipped: false,
      cid: 105,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsCalendarFill size={64} />,
      isFlipped: false,
      cid: 106,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsBriefcaseFill size={64} />,
      isFlipped: false,
      cid: 107,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsBriefcaseFill size={64} />,
      isFlipped: false,
      cid: 107,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsCalendarFill size={64} />,
      isFlipped: false,
      cid: 106,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <BsFillAlarmFill size={64} />,
      isFlipped: false,
      cid: 104,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillGift size={64} />,
      isFlipped: false,
      cid: 103,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillCrown size={64} />,
      isFlipped: false,
      cid: 102,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillCar size={64} />,
      isFlipped: false,
      cid: 101,
      isMatched: false,
    },
    {
      id: uuidv4(),
      icon: <AiFillBank size={64} />,
      isFlipped: false,
      cid: 100,
      isMatched: false,
    },
  ];
}

export default App;
