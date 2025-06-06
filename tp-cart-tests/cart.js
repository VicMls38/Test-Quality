
function createCart() {
  return { items: [], total: 0 };
}

function addItem(cart, item) {
  // Cherche l'item dans le panier
  const existingItem = cart.items.find(i => i.id === item.id);

  if (existingItem) {
    // Si trouvé, incrémente la quantité
    existingItem.quantity += item.quantity;
  } else {
    // Sinon ajoute une copie de l'item
    cart.items.push({ ...item });
  }
  
  // Met à jour le total dans tous les cas
  cart.total += item.price * item.quantity;
}


function removeItem(cart, itemId) {
  const index = cart.items.findIndex(i => i.id === itemId);
  if (index === -1) return;
  const item = cart.items[index];
  cart.total -= item.price * item.quantity;
  cart.items.splice(index, 1);
}

function applyDiscount(cart, code) {
  const validCodes = {
    WELCOME10: 0.1,
    SUMMER20: 0.2,
  };
  const discount = validCodes[code];
  if (!discount) throw new Error('Invalid discount code');
  cart.total = cart.total * (1 - discount);
}

function clearCart(cart) {
  cart.items = [];
  cart.total = 0;
}

module.exports = { createCart, addItem, removeItem, applyDiscount, clearCart };




