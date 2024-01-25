document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');
  const filterBtn = document.querySelector('#good-dog-filter');

  let filterStatus = false;

  //fetch all the dogs data
  function fetchDogs() {
    fetch(' http://localhost:3000/pups')
      .then((resp) => resp.json())
      .then((data) => {
        const filteredData = filterStatus
          ? data.filter((pup) => pup.isGoodDog)
          : data;

        dogNames(filteredData);
        displayPupsInfo(filteredData[0]);
      })
      .catch((err) => console.error(err));
  }

  fetchDogs();

  //function to display animal names
  function dogNames(filteredData) {
    dogBar.innerHTML = '';

    filteredData.forEach((pup) => {
      const pupsName = document.createElement('p');
      pupsName.classList.add('pups-name');
      pupsName.innerHTML = `<span>${pup.name}</span>`;

      pupsName.addEventListener('click', () => {
        displayPupsInfo(pup);
      });

      dogBar.appendChild(pupsName);
    });
  }

  //function to display dogs info in the UI
  function displayPupsInfo(pup) {
    dogInfo.innerHTML = '';
    ``;

    const pupsName = document.createElement('h2');
    pupsName.classList.add('pups-name');
    pupsName.innerHTML = `Name: <span>${pup.name}</span>`;

    const isGoodDog = document.createElement('p');
    isGoodDog.classList.add('isDogGood');
    isGoodDog.innerHTML = `<p>Is Good Dog: ${
      pup.isGoodDog ? 'Yes' : 'No'
    } </p>`;

    const isGoodDogBtn = document.createElement('button');
    isGoodDogBtn.classList.add('isGoodDogBtn');
    isGoodDogBtn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

    isGoodDogBtn.addEventListener('click', () => {
      pup.isGoodDog = !pup.isGoodDog;
      isGoodDogBtn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog }),
      })
        .then((resp) => resp.json())
        .then((updateIsGoodBtn) => {
          if (filterStatus) {
            fetchDogs();
          }
        })
        .catch((err) => console.error(err));
    });

    const pupsImg = document.createElement('img');
    pupsImg.src = `${pup.image}`;
    pupsImg.alt = `${pup.name}`;

    dogInfo.appendChild(pupsName);
    dogInfo.appendChild(pupsImg);
    dogInfo.appendChild(isGoodDog);
    dogInfo.appendChild(isGoodDogBtn);
  }

  filterBtn.addEventListener('click', () => {
    filterStatus = !filterStatus;
    filterBtn.textContent = `Filters good dogs: ${filterStatus ? 'ON' : 'OFF'}`;
    fetchDogs();
  });
});
