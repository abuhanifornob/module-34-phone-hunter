const loadPhone = async(searchText) => {

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data);
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phoneContainer');
    let noFoundText = document.getElementById('noFoundText');

    phoneContainer.innerHTML = '';
    // Show Button Add.................
    // if (phones.length >= 10) {
    //     showAll(phones.length);
    // } else {
    //     showAll(phones.length);
    // }
    //....................display onle 10 Phone.
    const showAllSection = document.getElementById('show-all');
    if (phones.length > 10) {
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
            console.log(phone);
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML =
                `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}e</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
                
        
        `;
            phoneContainer.appendChild(phoneDiv);
        })
        // Stop Spinner..............
    spinner(false);
}

function searchPhone() {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
    searchField.value = '';
    //   Start Loading Function.........................
    spinner(true);
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

// function showAll(limitation) {
//     const showAllSection = document.getElementById('show-all');
//     if (limitation >= 10) {
//         showAllSection.classList.remove('d-none');
//     } else {
//         showAllSection.classList.add('d-none');
//     }
// }