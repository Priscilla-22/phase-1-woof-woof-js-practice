document.addEventListener('DOMContentLoaded', () => {
  const dogInfo = document.querySelector('#dog-info');

  //fetch all the dogs data
  fetch(' http://localhost:3000/pups', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      displayPupsInfo(data);
    });

  //function to display dogs info in the UI
  function displayPupsInfo(data) {
    dogInfo.innerHTML = '';
    data.forEach((pup) => {
      const pupsId = document.createElement('p');
      pupsId.classList.add('pups-id');
      pupsId.textContent = `ID: ${pup.id}`;

      const pupsName = document.createElement('p');
      pupsName.classList.add('pups-name');
      pupsName.innerHTML = `Name: <span>${pup.name}</span>`;

      const isGoodDog = document.createElement('p');
      isGoodDog.classList.add('isDogGood');
      isGoodDog.innerHTML = `<p>Is Good Dog: ${
        pup.isGoodDog ? 'Yes' : 'No'
      } </p>`;

      const pupsImg = document.createElement('img');
      pupsImg.src = `${pup.image}`;
      pupsImg.alt = `${pup.name}`;
      
      dogInfo.appendChild(pupsId);
      dogInfo.appendChild(pupsName);
      dogInfo.appendChild(pupsImg);
      dogInfo.appendChild(isGoodDog);
    });
  }
});
