function loadFakeStoreAPI() {
  console.log("laddar api");

  fetch("https://fakestoreapi.com/products")
    .then((resp) => resp.json())
    .then((data) => {
      let output = `
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      `;

      data.forEach((element) => {
        output +=
          `
        <div class="col mb-5">
                          <div class="card h-100">
                              <!-- Product image-->
                              <img class="card-img-top" src=" 
                              ` +
          element.image +
          `
                              " alt=` +
          element.title +
          ` style = "max-height:200px; object-fit: contain;" />
                              <!-- Product details-->
                              <div class="card-body p-4">
                                  <div class="text-center">
                                      <!-- Product name-->
                                      <h5 class="fw-bolder">` +
          element.title +
          `</h5>
                                      <!-- Product price-->
                                      ` +
          element.price +
          `
                                  kr</div>
                              </div>
                              <!-- Product actions-->
                              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                  <div class="text-center">
                                  
                                  <button class="btn btn-outline-dark mt-auto buy-button" data-id="${element.id}"
                                  data-title="${element.title}" data-price="${element.price}"
                                  data-image="${element.image}">Buy</button>
                             
                                  </div>
                              </div>
                          </div>
                      </div>
        `;
      });

      output += `
            </div>
      `;

      document.getElementById("output").innerHTML = output;

      document.querySelectorAll(".buy-button").forEach((button) => {
        button.addEventListener("click", function () {
          const product = {
            title: this.getAttribute("data-title"),
            price: this.getAttribute("data-price"),
            image: this.getAttribute("data-image"),
          };
          localStorage.setItem("orderedProduct", JSON.stringify(product));
          window.location.href = "delivery.html";
        });
      });
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", loadFakeStoreAPI);

function getOrderedProduct() {
  const productData = localStorage.getItem("orderedProduct");

  if (productData) {
    const product = JSON.parse(productData);
    const productContainer = document.getElementById("product-ordered");

    productContainer.innerHTML = `
               
                  <tbody>
                    <!-- Product 1 -->
                    <tr>
                      <td>
                        <img
                          src="${product.image}"
                          class="img-thumbnail"
                          alt="Product"
                        />
                        ${product.title}
                      </td>
                      <td>${product.price}</td>
                    </tr>
                  </tbody>
        `;
  }
}

document.addEventListener("DOMContentLoaded", getOrderedProduct);
