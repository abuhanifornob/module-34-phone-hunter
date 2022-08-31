const loadPhone = async(searchText, limit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url)
        const data = await res.json()
        displayPhone(data.data, limit);
    } catch (error) {
        alert(error);
    }

}

const displayPhone = (phones, limit) => {
    const phoneContainer = document.getElementById('phoneContainer');
    let noFoundText = document.getElementById('noFoundText');

    phoneContainer.innerHTML = '';

    //....................display onle 10 Phone.
    const showAllSection = document.getElementById('show-all');
    if (limit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllSection.classList.remove('d-none');
    } else {
        showAllSection.classList.add('d-none');
    }

    // Not found Messes Show Section......................
    if (phones.length === 0) {
        noFoundText.classList.remove("d-none");
    } else {
        noFoundText.classList.add("d-none");
    }
    phones.forEach(phone => {

            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML =
                `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}e</h5>
                <p class="card-text">Brand : ${phone.brand}</p>
                <button class="btn btn-primary px-5 py-2 fw-bolder" onclick="showPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details</button>

            </div>
        </div>
                
        
        `;
            phoneContainer.appendChild(phoneDiv);
        })
        // Stop Spinner..............
    spinner(false);
}

function process(limit) {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, limit);

    //   Start Loading Function.........................
    spinner(true);
    console.log(searchText, limit);

}

function searchPhone() {
    process(10);

}

// Loader or Spiner Section

function spinner(isSpinner) {
    const loder = document.getElementById('loader');
    if (isSpinner) {
        loder.classList.remove('d-none');
    } else {
        loder.classList.add('d-none');
    }
}

// Display All Phone 
document.getElementById('show-all-btn').addEventListener('click', function() {
    process();

})

// Enter Key Event Status.......
document.getElementById("search-field").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        process(10);
    }
});

//   Show Phone All Details.....

const showPhoneDetails = async(id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (detailsData) => {
    const staticBackdropLabel = document.getElementById('staticBackdropLabel');
    staticBackdropLabel.innerText = `${detailsData.name}`;
    const phoneDetails = document.getElementById('modalBody');

    phoneDetails.innerHTML = `
         <div class="d-flex justify-content-center align-items-center">
            <img src="${detailsData.image}" alt="">
        </div>
      <p>Release Date: ${detailsData.releaseDate ? detailsData.releaseDate :"Release Date Inofrmation Not Found" }</p>
      <p>Storage : ${detailsData.mainFeatures.storage ? detailsData.mainFeatures.storage : "Storage Details Information Not Found" }</p>
    <p>chipSet : ${detailsData.mainFeatures.chipSet ? detailsData.mainFeatures.chipSet : "Chipset Details Information Not Abelabel"}</p>
    <p>Display Size : ${detailsData.mainFeatures.displaySize ? detailsData.mainFeatures.displaySize : "display Size Details Information Not Abelabel"}</p>
    <p>Memory : ${detailsData.mainFeatures.memory ? detailsData.mainFeatures.memory : "memory Details Information Not Abelabel"}</p>
    <p>Sensors : ${detailsData.mainFeatures.sensors ? detailsData.mainFeatures.sensors[0] : "Sensors Details Information Not Abelabel"} </p>
   
      `

}


loadPhone('phone');