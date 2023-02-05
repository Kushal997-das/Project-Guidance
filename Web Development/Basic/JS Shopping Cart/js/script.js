let subtotal = 0;

const calculateTax = subtotal => {
  const tax = subtotal * 0.13;
  const formattedTax = tax.toFixed(2);
  return formattedTax;
};

const calculateTotal = subtotal => {
  const tax = calculateTax(subtotal);
  const total = parseFloat(subtotal) + parseFloat(tax);
  const formattedTotal = total.toFixed(2);
  return formattedTotal;
};

const getImgLink = title => {
  let imgLink;
  switch (title) {
    case 'French Fies with Ketchup':
      imgLink = 'https://assets.codepen.io/687837/plate__french-fries.png';
      break;
    case 'Salmon and Vegetables':
      imgLink = 'https://assets.codepen.io/687837/plate__salmon-vegetables.png';
      break;
    case 'Spaghetti with Sauce':
      imgLink = 'https://assets.codepen.io/687837/plate__spaghetti-meat-sauce.png';
      break;
    case 'Tortellini':
      imgLink = 'https://assets.codepen.io/687837/plate__tortellini.png';
      break;
    case 'Chicken Salad':
      imgLink = 'https://assets.codepen.io/687837/plate__chicken-salad.png';
      break;
    default:
      imgLink = 'https://assets.codepen.io/687837/plate__chicken-salad.png';}

  return imgLink;
};

$('.add-button').on('click', function () {
  const title = $(this).data('title');
  const price = $(this).data('price');
  const imgLink = getImgLink(title);

  const element = `
    <li class="cart-item">
      <img src="${imgLink}" alt="${title}">
      <div class="cart-item-dets">
        <p class="cart-item-heading">${title}</p>
        <p class="g-price">$${price}</p>
      </div>
    </li>
  `;
  $('.cart-items').append(element);

  subtotal = subtotal + price;

  const formattedSubtotal = subtotal.toFixed(2);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  $('.cart-math').html(`
    <p class="cart-math-item">
      <span class="cart-math-header">Subtotal:</span>
      <span class="g-price subtotal">$${formattedSubtotal}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Tax:</span>
      <span class="g-price tax">$${tax}</span>
    </p>
    <p class="cart-math-item">
      <span class="cart-math-header">Total:</span>
      <span class="g-price total">$${total}</span>
    </p>
  `);
});