const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // main div
  const mainContainer = document.getElementById("div-container");
  phones.forEach((element) => {
    console.log(element);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = "card mx-auto bg-base-100 shadow-xl";
    phoneDiv.innerHTML = `
    <figure><img class="p-10" src="${element.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title mx-auto">${element.phone_name}</h2>
      <div class="card-actions justify-center text-center">
      <p class='text-xl font-bold'>${element.slug}</p>
      <h4 class='text-[16px] font-semibold'>Brand: <span class='text-xl font-bold'>${element.brand}</span></h4>
        <button class="btn btn-primary w-full">Buy Now</button>
      </div>
    </div>
    `;

    mainContainer.appendChild(phoneDiv)
  });
};

loadPhone();
