const Ship = require('../src/ship');

test('el barco tiene la longitud correcta', () => {
  const barco = new Ship(3);
  expect(barco.length).toBe(3);
});

test('el barco registra un impacto', () => {
  const barco = new Ship(3);
  barco.hit();
  expect(barco.hits).toBe(1);
});

test('el barco se hunde si recibe suficientes impactos', () => {
  const barco = new Ship(2);
  barco.hit();
  barco.hit();
  expect(barco.isSunk()).toBe(true);
});

test('el barco NO se hunde si le faltan impactos', () => {
  const barco = new Ship(3);
  barco.hit();
  expect(barco.isSunk()).toBe(false);
});