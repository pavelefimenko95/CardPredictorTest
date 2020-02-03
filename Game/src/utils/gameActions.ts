const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const generateCard = () =>
    cards[Math.floor(Math.random() * cards.length)];

export const isUserWon = (prev, next, prediction) => {
    switch(prediction) {
        case 'LOW':
            return cards.indexOf(prev) > cards.indexOf(next);
        case 'HIGH':
            return cards.indexOf(prev) < cards.indexOf(next);
    }
};