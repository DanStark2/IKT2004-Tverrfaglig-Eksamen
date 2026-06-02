document.addEventListener('DOMContentLoaded', () => {

    const mainLink = document.getElementById('mainLink');
    const adminLink = document.getElementById('adminLink');
    const mainPage = document.getElementById('mainPage');
    const adminPage = document.getElementById('adminPage');
    const saveBtn = document.getElementById('saveBtn');
    const output = document.getElementById('adminOutput');
    const refreshBtn = document.getElementById('refreshProductsBtn');
    const list = document.getElementById('productList');

    function showPage(isMain) {

        if (isMain) {
            mainPage.classList.add('active');
            adminPage.classList.remove('active');

            mainLink.classList.add('active');
            adminLink.classList.remove('active');
        }
        else {
            mainPage.classList.remove('active');
            adminPage.classList.add('active');

            mainLink.classList.remove('active');
            adminLink.classList.add('active');

            loadProducts();
        }
    }

    async function loadProducts() {

        list.textContent = 'Loading...';

        try {

            const res = await fetch('/api/products');
            const products = await res.json();

            if (!res.ok) {
                throw new Error(products.error);
            }

            if (products.length === 0) {
                list.textContent = 'No products found.';
                return;
            }

            let html = '';

            for (const product of products) {
                html += `
                    <div class="product-card">
                        <h3>${product.name}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                `;
            }

            list.innerHTML = html;

        } catch (err) {
            list.textContent = 'Error: ' + err.message;
        }
    }

    async function saveProduct() {

        const name = document.getElementById('productName').value.trim();
        const desc = document.getElementById('productDescription').value.trim();
        const price = document.getElementById('productPrice').value.trim();
        const img = document.getElementById('productImage').value.trim();

        if (!name || !desc || !price || !img) {
            output.textContent = 'All fields required.';
            return;
        }

        output.textContent = 'Saving...';

        try {

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: desc,
                    price: parseFloat(price),
                    pictureUrl: img
                })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error);
            }

            output.textContent = 'Saved with ID ' + result.id + '.';

            document.getElementById('productForm').reset();

        } catch (err) {
            output.textContent = 'Error: ' + err.message;
        }
    }

    mainLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(true);
    });

    adminLink.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(false);
    });

    saveBtn.addEventListener('click', saveProduct);
    refreshBtn.addEventListener('click', loadProducts);

});