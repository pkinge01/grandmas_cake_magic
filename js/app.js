$(document).ready(function () {
  // Tells the function to wait to preform until everything on the page has loaded.
  $(window).scroll(function () {
    // Says this function is preformed continuisly while scrolling.
    var Scroll = $(window).scrollTop() + 1, // This variable finds the distance you have scrolled from the top.
      SectionOneOffset = $("#banner").offset().top, // This variable finds the distance between #section-one and the top. Replace #section-one with the ID of your section.
      SectionTwoOffset = $("#about").offset().top; // This variable finds the distance between #section-two and the top. Replace #section-two with the ID of your section. You can duplicate this for as many sections as you want.
    SectionThreeOffset = $("#product").offset().top;
    if (Scroll >= SectionOneOffset) {
      // If you have scrolled past section one do this.
      $(".one").addClass("active"); // Adds class of current-menu-item to the menu item with a class of menu-item-1
    } else {
      // If you have not scrolled section one do this.
      $(".one").removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-1
    }
    if (Scroll >= SectionTwoOffset) {
      // If you have scrolled past section two do this.You can duplicate this for as many sections as you want.
      $(".two").addClass("active"); // Adds class of current-menu-item to the menu item with a class of menu-item-2
      $(".one").removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-1
    } else {
      // If you have not scrolled section two do this.
      $(".two").removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-2
    }
    if (Scroll >= SectionThreeOffset) {
      // If you have scrolled past section two do this.You can duplicate this for as many sections as you want.
      $(".three").addClass("active"); // Adds class of current-menu-item to the menu item with a class of menu-item-2
      $(".two").removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-1
    } else {
      // If you have not scrolled section two do this.
      $(".three").removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-2
    }
  });
});

// .....................................................................filter buttons
(function () {
  const buttons = document.querySelectorAll(".btn");
  const productItems = document.querySelectorAll(".product-item");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = e.target.dataset.filter;

      productItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
})();

// ..................................................................filter search box
(function () {
  const searchBox = document.querySelector("#search-item");
  const productItems = document.querySelectorAll(".product-item");

  searchBox.addEventListener("keyup", (e) => {
    const searchFilter = e.target.value.toLowerCase().trim();

    //..........................................display only items that contain filter input
    productItems.forEach((item) => {
      if (item.textContent.includes(searchFilter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
})();

// ..........................................................................show cart
(function () {
  //................................................................target cart button

  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();

// .............................................................add items to the cart
(function () {
  const cartBtn = document.querySelectorAll(".product-item-icon");
  cartBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      // .........................event fires only if it has a parent of a certain class
      if (event.target.parentElement.classList.contains("product-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3; //use the 3 to get rid of the 'img' string
        let partPath = fullPath.slice(pos);
        const item = {};
        item.img = `img-cart${partPath}`;
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name;
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flix",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3"><img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
              <div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p><span>$</span>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span></div><a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a></div>`;

        //.................................................................select cart

        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, total);
        alert("item added to the cart");
        showTotals();
      }
    });
  });

  // ......................................................................show totals
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");
    items.forEach(function (item) {
      total.push(parseFloat(item.textContent));
    });
    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);
    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();
