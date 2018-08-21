var Card=require('../models/cardType.js');

function Deck() {
   
    var deck = [],
        types = {
            'heart': {
                priority: 3
            },
            'spade': {
                priority: 4
            },
            'diamond': {
                priority: 2
            },
            'club': {
                priority: 1
            }
        };

        
    function makeCards() {
        for (var type in types) {
            for (var a = 1; a <= 13; a++) {
                switch(type){
                    case 'heart':
                        deck.push(new Card(type, a,"HEART","H"));
                    break;
                    case 'spade':
                        deck.push(new Card(type, a,"SPADE","S"));
                    break;
                    case 'diamond':
                        deck.push(new Card(type, a,"DIAMOND","D"));
                    break;
                    case 'club':
                        deck.push(new Card(type, a,"CLUB","C"));
                    break;
                }
            }
        }
    }
    makeCards();

    function getCards() {
        return deck;
    }

    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min, 0);
    }

    function shuffle() {
        var len = deck.length,
            tempVal, randIdx;
        while (0 !== len) {
            randIdx = Math.floor(Math.random() * len);
            len--;
            deck[len].id_rand = Math.random();
            deck[randIdx].id_rand = Math.random();
            tempVal = deck[len];
            deck[len] = deck[randIdx];
            deck[randIdx] = tempVal;
        }
    }

    function getRandomCards(num) {
        var randCards = [];
        var cardInserted = {},
            nCard = null;
        for (var count = 1; count <= num;) {
            nCard = getRandomArbitrary(1, 52);
            if (!cardInserted[nCard]) {
                randCards.push($.extend({
                    id_rand: Math.random()
                }, deck[nCard - 1]));
                cardInserted[nCard] = true;
                count++;
            }
        }
        return randCards;
    }


    return {
        getCards: getCards,
        getRandomCards: getRandomCards,
        shuffle: shuffle
    }
}

module.exports = new Deck();