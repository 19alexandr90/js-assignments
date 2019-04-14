'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    let s = bankAccount.split('\n');
    let n = [[],[],[]];
    let j = 0;
    while (j < 3) {
        for (let i = 0; i <= s[j].length - 3; i = i + 3) n[j].push(s[j].substr(i, 3));
        j++;
    }
    let acc = '';
    for (let i = 0; i < n[0].length; i++) {
        if (n[0][i]==='   ' && n[1][i]==='  |' && n[2][i]==='  |') acc=acc+1;
        if (n[0][i]===' _ ' && n[1][i]===' _|' && n[2][i]==='|_ ') acc=acc+2;
        if (n[0][i]===' _ ' && n[1][i]===' _|' && n[2][i]===' _|') acc=acc+3;
        if (n[0][i]==='   ' && n[1][i]==='|_|' && n[1][i]==='|_|') acc=acc+4;
        if (n[0][i]===' _ ' && n[1][i]==='|_ ' && n[2][i]===' _|') acc=acc+5;
        if (n[0][i]===' _ ' && n[1][i]==='|_ ' && n[2][i]==='|_|') acc=acc+6;
        if (n[0][i]===' _ ' && n[1][i]==='  |' && n[2][i]==='  |') acc=acc+7;
        if (n[0][i]===' _ ' && n[1][i]==='|_|' && n[2][i]==='|_|') acc=acc+8;
        if (n[0][i]===' _ ' && n[1][i]==='|_|' && n[2][i]===' _|') acc=acc+9;
        if (n[0][i]===' _ ' && n[1][i]==='| |' && n[2][i]==='|_|') acc=acc+0;
    }
    return Number(acc);
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    while (text) {
        let position = columns;
        if (text.length > position)
            while (text[position] != " ") position--;
        yield text.slice(0, position);
        text = text.slice(position + 1);
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let values = { 2 : 0, 3 : 0, 4 : 0, 5 : 0, 6 : 0, 7 : 0, 8 : 0, 9 : 0, 10 : 0, 'J' : 0, 'Q' : 0, 'K' : 0, 'A' : 0};
    let num = new Array(14);
    num.fill(0);
    let suits = {'♣' : 0, '♦' : 0, '♠' : 0, '♥' : 0};
    for (let i = 0; i < 5; i++) {
        values[hand[i].substring(0, hand[i].length - 1)]++;
        suits[hand[i][hand[i].length - 1]]++;
    }
    for (let key in values) {
        if (values[key]) {
            if (key == 'A') {num[0] = values[key]; num[13] = values[key];
            } else if (key == 'K') {num[12] = values[key];
            } else if (key == 'Q') {num[11] = values[key];
            } else if (key == 'J') {num[10] = values[key];
            } else {num[Number(key) - 1] = values[key];
            }
        }
    }
    let straight = false;
    let flush = false;
    for (let i = 0; i < 10; i++) {
        if (num[i] && num[i + 1] && num[i + 2] && num[i + 3] && num[i + 4]) straight = true;
    }
    for (let key in suits) {
        if (suits[key] == 5) flush = true;
    }
    if (straight) {
        if (flush) {
            return PokerRank.StraightFlush;
        } else {
            return PokerRank.Straight;
        }
    }
    if (flush) return PokerRank.Flush;
    for (let i = 0; i < 13; i++) {
        if (num[i] == 4) return PokerRank.FourOfKind;
        if (num[i] == 3) {
            for (let j = 0; j < 13; j++) {
                if ((j != i) && (num[j] == 2)) return PokerRank.FullHouse;
            }
            return PokerRank.ThreeOfKind;
        }
        if (num[i] == 2) {
            for (let j = 0; j < 13; j++) {
                if ((j != i) && (num[j] == 3)) return PokerRank.FullHouse;
                if ((j != i) && (num[j] == 2)) return PokerRank.TwoPairs;
            }
        return PokerRank.OnePair;
        }
    }
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
