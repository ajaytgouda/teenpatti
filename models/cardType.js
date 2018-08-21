function CardType(type, rank, group, semi_ID) {
    this.type = type;
    this.group = group;
    this.rank = rank;
    this.id = semi_ID+"_"+this.getName(rank);
    this.name = this.getName(rank);
    this.priority = this.getPriority(rank);
}
CardType.prototype.getName = function() {
    switch (this.rank) {
        case 1:
            return "A";
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13:
            return "K";
        default:
            return this.rank.toString();
    }
}

CardType.prototype.getPriority = function() {
    switch (this.rank) {
        case 1:
            return 14;
        default:
            return this.rank;
    }
}

module.exports = CardType;