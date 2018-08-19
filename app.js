let Utils = class {
    constructor() {
        this.tagStrings = ['p', 'div', 'span', 'a', 'xd', 'box']
        this.elemFactory = function(number) {
            switch (number) {
                case 0: {
                    return new Tag();
                    break;
                }
                case 1: {
                    return new Text();
                    break;
                }
            }
        }

        this.ruleFactory = function(orig, elem, number) {
            switch (number) {
                case 0: {
                    if (elem.addIntoTag != undefined) {
                        return elem.addIntoTag(orig);
                    }
                    else return orig;
                    break;
                }
                case 1: {
                    if (elem.concatLeft != undefined) {
                        return elem.concatLeft(orig)
                    }
                    else return orig;
                    break;
                }
                case 2: {
                    if (elem.concatRight != undefined) {
                        return elem.concatRight(orig)
                    }
                    else return orig;
                    break;
                }
            }
        }

        this.getRandomNumber = function(to) {
            return Math.floor(to * Math.random());
        }
    }
}

class Tag {
    constructor(...args) {
        this.elems = []
        this.setTagString = function(item) {
            this.tagString = item;
        }
        this.addIntoTag = function(...items) {
            this.elems.push(items);
            return this;
        }
        this.concatRight = function (item) {
            return new Text(this, item);
        };
        this.concatLeft = function (item) {
            return new Text(item, this);
        };
    }
}

class Text {
    constructor(...args) {
        this.items = args;
        this.setTextString = function(item) {
            this.textString = item;
            return this;
        }
        this.concatRight = function (item) {
            return new Text(this, item);
        };
        this.concatLeft = function (item) {
            return new Text(item, this);
        };
    }
}

// init

var utils = new Utils();
var orig = "this is initial text"


// builder randomly selects a rule and builds smth, then applies a rule into what he build etc.
let i = 0;

while (i < 10) {
     let objNmb = utils.getRandomNumber(2);
     let ruleNmb = utils.getRandomNumber(3);

     let elem = utils.elemFactory(objNmb);
     orig = utils.ruleFactory(orig, elem, ruleNmb);
     i++;
}
