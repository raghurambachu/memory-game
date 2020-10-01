````js
let cardsFlipped = [...this.state.cardsFlipped, { id, cid }];
console.log(cardsFlipped);
if (cardsFlipped.length === 2) {
  // Now do the comparision,
  let newCards = this.state.cards.slice();
  const [first, second] = cardsFlipped;
  //if both cids for the ids match for those squares set isFlipped : true
  if (first.cid === second.cid) {
    newCards = newCards.map((card) => {
      if (cardsFlipped.includes(card.id)) {
        return { ...card, isMatched: true, isFlipped: true };
      }
      return card;
    });
    this.setState({ cards: newCards, cardsFlipped });
  } else {
    // Else isFlipped : false
    setTimeout(() => {
      newCards = newCards.map((card) => {
        if (cardsFlipped.includes(card.id)) {
          return { ...card, isFlipped: false };
        }
        return card;
      });
      this.setState({ cards: newCards, cardsFlipped });
    }, 2000);
  }
} else if (cardsFlipped.length < 2) {
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
  this.setState({ cards: newCards, cardsFlipped });
}
````
