class Ship {
  constructor(length) {
    this.length = length; 
    this.hits = 0;        //Numnero de impactos recibidos
    this.sunk = false;}  //hundido o no

    hit() {
        this.hits += 1;
    }

    isSunk() {
        this.sunk = this.hits >= this.length;
        return this.sunk;
    }

  }

module.exports = Ship;