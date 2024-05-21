const loadPhone = async (searchPhone, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
  const data = await res.json();
  const phones = data.data;
  console.log(isShowAll);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // main div
  const mainContainer = document.getElementById("div-container");
  mainContainer.textContent = '';
  const divContainer = document.getElementById('show-all-data');
  if (phones.length > 12) {
    divContainer.classList.remove('hidden')
  }else{
    divContainer.classList.add('hidden')
  }
//display only first 12 phones if not shaw all
 if (!isShowAll) {
    phones = phones.slice(0,12)
 }

  phones.forEach((element) => {
    // console.log(element);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = "card w-80 mb-4 md:w-80 lg:w-96 border-2 hover:shadow-purple-600 mx-auto bg-base-100 shadow-xl";
    phoneDiv.innerHTML = `
    <figure><img class="md:p-10 p-5" src="${element.image}" alt="Shoes" /></figure>
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
  toggleLoadingSpinner(false)
};


const  handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true)
    const inputField = document.getElementById('search-field');
    const input = inputField.value;
    loadPhone(input, isShowAll)
}

// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true)
//     const inputElement = document.getElementById('search-field2');
//     const inputValue = inputElement.value;
//     loadPhone(inputValue);
// }

const toggleLoadingSpinner = (isLoadign) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoadign) {
        loadingSpinner.classList.remove('hidden') 
    }else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () =>{
    handleSearch(true)
}

// loadPhone();