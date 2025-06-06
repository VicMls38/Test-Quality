const cart = require('./cart');


describe('Cart', () => {
  let myCart;

  beforeEach(() => {
    myCart = cart.createCart();
  });

  describe('createCart', () => {
    test('doit créer un panier vide', () => {
      expect(myCart.items).toEqual([]);
      expect(myCart.total).toBe(0);
    });
  });

  describe('addItem', () => {
    test('ajoute un item dans un panier vide', () => {
      const item = { id: 1, price: 10, quantity: 2 };
      cart.addItem(myCart, item);
      expect(myCart.items).toHaveLength(1);
      expect(myCart.total).toBe(20);
    });

    test('ajoute un item déjà présent : incrémente la quantité et met à jour le total', () => {
      const item = { id: 1, price: 10, quantity: 2 };
      cart.addItem(myCart, item);
      cart.addItem(myCart, { id: 1, price: 10, quantity: 3 });
      expect(myCart.items).toHaveLength(1);
      expect(myCart.items[0].quantity).toBe(5);
      expect(myCart.total).toBe(50);
    });

    test('ajoute un nouvel item dans un panier non vide', () => {
      const item1 = { id: 1, price: 10, quantity: 2 };
      const item2 = { id: 2, price: 5, quantity: 1 };
      cart.addItem(myCart, item1);
      cart.addItem(myCart, item2);
      expect(myCart.items).toHaveLength(2);
      expect(myCart.total).toBe(25);
    });

    test('ajoute un item avec quantité zéro', () => {
      const item = { id: 3, price: 7, quantity: 0 };
      cart.addItem(myCart, item);
      expect(myCart.items).toHaveLength(1);
      expect(myCart.total).toBe(0);
    });
  });

  describe('removeItem', () => {
    test('supprime un item existant et met à jour le total', () => {
      const item = { id: 1, price: 10, quantity: 2 };
      cart.addItem(myCart, item);
      cart.removeItem(myCart, 1);
      expect(myCart.items).toHaveLength(0);
      expect(myCart.total).toBe(0);
    });

    test('supprime un item inexistant ne modifie rien', () => {
      const item = { id: 1, price: 10, quantity: 2 };
      cart.addItem(myCart, item);
      cart.removeItem(myCart, 999);
      expect(myCart.items).toHaveLength(1);
      expect(myCart.total).toBe(20);
    });

    test('supprime un item dans un panier vide ne fait rien', () => {
      cart.removeItem(myCart, 1);
      expect(myCart.items).toHaveLength(0);
      expect(myCart.total).toBe(0);
    });
  });

  describe('applyDiscount', () => {
    beforeEach(() => {
      cart.addItem(myCart, { id: 1, price: 100, quantity: 1 });
    });

    test.each([
      ['WELCOME10', 90],
      ['SUMMER20', 80]
    ])('applique le code de réduction %s', (code, expectedTotal) => {
      cart.applyDiscount(myCart, code);
      expect(myCart.total).toBeCloseTo(expectedTotal);
    });

    test('lance une erreur si code de réduction invalide', () => {
      expect(() => cart.applyDiscount(myCart, 'INVALID_CODE')).toThrow('Invalid discount code');
    });

    test('appliquer un code sur un panier vide (total 0) garde total à 0', () => {
      myCart = cart.createCart();
      expect(() => cart.applyDiscount(myCart, 'WELCOME10')).not.toThrow();
      expect(myCart.total).toBe(0);
    });
  });

  
   describe('clearCart', () => {
    test('vide le panier et remet le total à zéro', () => {
      cart.addItem(myCart, { id: 1, price: 10, quantity: 2 });
      cart.addItem(myCart, { id: 2, price: 5, quantity: 1 });
      cart.clearCart(myCart);
      expect(myCart.items).toHaveLength(0);
      expect(myCart.total).toBe(0);
    });
  });

  describe('résilience', () => {
    test('ajouter un item avec quantity = 0 ne modifie pas le total mais ajoute l’item', () => {
      const item = { id: 3, price: 10, quantity: 0 };
      cart.addItem(myCart, item);
      expect(myCart.items).toHaveLength(1);
      expect(myCart.total).toBe(0);
    });

    test('ajouter un item avec price < 0 diminue le total en conséquence', () => {
      const item = { id: 4, price: -10, quantity: 2 };
      cart.addItem(myCart, item);
      expect(myCart.items).toHaveLength(1);
      expect(myCart.total).toBe(-20);
    });
  });
});