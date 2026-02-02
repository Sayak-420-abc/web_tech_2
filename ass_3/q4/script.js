/* Minimal cart behavior using localStorage */
(function() {
    const CART_KEY = 'cartItems';

    function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch (e) { return [] } }

    function saveCart(items) { localStorage.setItem(CART_KEY, JSON.stringify(items));
        updateCount() }

    function updateCount() { const el = document.getElementById('cart-count'); if (!el) return; const items = loadCart(); const count = items.reduce((s, i) => s + i.qty, 0);
        el.textContent = count }

    function addItem(item) { const items = loadCart(); const found = items.find(i => i.id === item.id); if (found) { found.qty += item.qty } else { items.push(item) }
        saveCart(items) }

    // Attach event listeners
    document.addEventListener('DOMContentLoaded', () => {
        updateCount();

        // Add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = btn.dataset.id;
                const name = btn.dataset.name;
                const price = parseFloat(btn.dataset.price) || 0;
                addItem({ id, name, price, qty: 1 });
                btn.textContent = 'Added ✓';
                setTimeout(() => btn.textContent = 'Add to Cart', 900);
            })
        })

        // Product page add
        const addBtn = document.getElementById('add-to-cart');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const id = addBtn.dataset.id;
                const name = addBtn.dataset.name;
                const price = parseFloat(addBtn.dataset.price) || 0;
                const qty = parseInt(document.getElementById('qty').value) || 1;
                addItem({ id, name, price, qty });
                addBtn.textContent = 'Added ✓';
                setTimeout(() => addBtn.textContent = 'Add to Cart', 900);
            })
        }

        // Render cart page
        const cartArea = document.getElementById('cart-area');
        if (cartArea) {
            const items = loadCart();
            if (items.length === 0) { cartArea.innerHTML = '<p>Your cart is empty.</p>' } else {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.innerHTML = `<thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>`;
                const tbody = document.createElement('tbody');
                let grand = 0;
                items.forEach(it => { const row = document.createElement('tr'); const total = it.price * it.qty;
                    grand += total;
                    row.innerHTML = `<td>${it.name}</td><td>$${it.price.toFixed(2)}</td><td><input type="number" min="1" value="${it.qty}" data-id="${it.id}" style="width:60px"></td><td>$${total.toFixed(2)}</td><td><button class="btn remove" data-id="${it.id}">Remove</button></td>`;
                    tbody.appendChild(row) });
                table.appendChild(tbody);
                const foot = document.createElement('div');
                foot.style.textAlign = 'right';
                foot.style.marginTop = '1rem';
                foot.innerHTML = `<strong>Grand Total: $${grand.toFixed(2)}</strong>`;
                cartArea.innerHTML = '';
                cartArea.appendChild(table);
                cartArea.appendChild(foot);

                // Qty change
                cartArea.querySelectorAll('input[type="number"]').forEach(input => {
                        input.addEventListener('change', () => {
                            const id = input.dataset.id;
                            const q = Math.max(1, parseInt(input.value) || 1);
                            const items = loadCart();
                            const it = items.find(x => x.id === id);
                            if (it) { it.qty = q;
                                saveCart(items);
                                location.reload() }
                        })
                    })
                    // Remove
                cartArea.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', () => { const id = btn.dataset.id; let items = loadCart();
                    items = items.filter(x => x.id !== id);
                    saveCart(items);
                    location.reload() }))
            }
        }

        // Clear cart
        const clearBtn = document.getElementById('clear-cart');
        if (clearBtn) clearBtn.addEventListener('click', () => { localStorage.removeItem(CART_KEY);
            updateCount();
            location.reload() })

        // Checkout handler
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) { checkoutForm.addEventListener('submit', e => { e.preventDefault();
                localStorage.removeItem(CART_KEY);
                updateCount();
                document.getElementById('checkout-msg').textContent = 'Order placed! Thank you.';
                checkoutForm.reset() }) }

        // Login/Register/Contact basic handlers
        const loginForm = document.getElementById('login-form');
        if (loginForm) { loginForm.addEventListener('submit', e => { e.preventDefault();
                alert('Demo login — no backend.');
                loginForm.reset() }) }
        const regForm = document.getElementById('register-form');
        if (regForm) { regForm.addEventListener('submit', e => { e.preventDefault();
                alert('Demo registration — no backend.');
                regForm.reset() }) }
        const contactForm = document.getElementById('contact-form');
        if (contactForm) { contactForm.addEventListener('submit', e => { e.preventDefault();
                alert('Message sent (demo).');
                contactForm.reset() }) }
    })
})();