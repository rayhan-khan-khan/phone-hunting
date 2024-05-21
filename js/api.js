const phoneApi = async (searchPhone = '13',isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
  console.log(searchPhone);
  const data = await res.json();
  const phone = data.data;
  dispalyPhone(phone, isShowAll);
};

const dispalyPhone = (phone, isShowAll) => {

  const showAllBtn = document.getElementById('show-all')
  if(phone.length > 12 && !isShowAll){
    showAllBtn.classList.remove('hidden')
  }
  else{
    showAllBtn.classList.add('hidden')
  }

  if (!isShowAll) {
    phone = phone.slice(0, 12);
  }
  const mainContainer = document.getElementById("main-container");
  mainContainer.textContent = '';
  console.log(phone);
  phone.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.classList = " border bg-base-100 shadow-xl";
    div.innerHTML = `
    <figure class="px-10 pt-10">
    <img class='mx-auto' src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, perspiciatis.</p>
    <p class='text-xl font-extrabold text-gray-500'>$999</p>
    <div class="card-actions">
      <button onclick="my_modal.showModal(); modalButton('${phone.slug}')" class="btn btn-info text-white">Show Details</button>
    </div>
  </div>
    `;
    mainContainer.appendChild(div)
  });
  loadingSpinner(false)
};

const searchPhoneName = (isShowAll) =>{
    const inputText = document.getElementById('input-field');
    const inputValue = inputText.value;
    phoneApi(inputValue, isShowAll)
    loadingSpinner(true)
}

const showAllDetails = () =>{
    searchPhoneName(true)
}

const loadingSpinner = (isLoading) =>{
   const loadSpinner = document.getElementById('load-spinner');
   if (isLoading) {
    loadSpinner.classList.remove('hidden')
   }
   else{
    loadSpinner.classList.add('hidden')
   }
}

const modalButton = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phoneData = data.data
    modalShowDetails(phoneData);
}

const modalShowDetails = (data) =>{
    console.log(data);
  const modalId = document.getElementById('my_modal');
modalId.classList = 'modal modal-bottom sm:modal-middle';
modalId.innerHTML = `
  <div class="modal-box">
  <img class='mx-auto' src="${data.image}" alt="">
  <h3 class="font-bold text-lg pt-2">${data.name}</h3>
  <p class="mt-2">Brand:  <span class='text-[16px] font-semibold text-[#333]'>${data.brand}</span></p>
  <p class="">ReleaseDate:  <span class='text-[16px] font-semibold text-[#333]'>${data.releaseDate}</span></p>
  <p class="">chipSet:  <span class='text-[16px] font-semibold text-[#333]'>${data.mainFeatures.chipSet}</span></p>
  <p class="">displaySize:  <span class='text-[16px] font-semibold text-[#333]'>${data?.mainFeatures?.displaySize}</span></p>
  <p class="">memory:  <span class='text-[16px] font-semibold text-[#333]'>${data?.mainFeatures?.memory}</span></p>
  <p class="">Bluetooth:  <span class='text-[16px] font-semibold text-[#333]'>${data?.others.Bluetooth}</span></p>
  <p class="">GPS:  <span class='text-[16px] font-semibold text-[#333]'>${data?.others.GPS}</span></p>
  <p class="">USB:  <span class='text-[16px] font-semibold text-[#333]'>${data?.others.USB}</span></p>
  <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </form>
  </div>
</div>
  `
}

phoneApi();
