const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')

const updateNav = (user) => {
  //update navbar links depending on user login state
  if (user) {
    loggedInLinks.forEach((item) => item.style.display = 'block')
    loggedOutLinks.forEach((item) => item.style.display = 'none')
  }
  else {
    loggedInLinks.forEach((item) => item.style.display = 'none')
    loggedOutLinks.forEach((item) => item.style.display = 'block')
  }
}




const missingList = document.querySelector(".missing");
const loggedOutContainer = document.querySelector(".logged-out-container");
// var imgRef = storageRef.child('matthew-mcconaughey.jpg');

const setupMissingList = (data) => {
  let html = '<h1 class="missing-list-title " style="background-color:#7e57c2;"> List of currently missing people !! </h1>'
  loggedOutContainer.style.display = 'none'
  if (data.length) {
    data.forEach(doc => {
      const missingPerson = doc.data();
      var imgRef = storageRef.child(`${missingPerson.image}`);

      const li = `
            <div class="card-container col s12 m7 row">
              <div class="card horizontal">
                <div class="card-image">
                  <img src="${missingPerson.image}" class="missing-img"/>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <h1 class="missing-name"> ${missingPerson.firstName} ${missingPerson.lastName} </h1>
                    <p> Age: ${missingPerson.age}</p>
                    <p> Taille: ${missingPerson.taille}</p>
                    <p> Birth Date: ${missingPerson.birthDate}</p>
                    <p> Birth Place: ${missingPerson.birthPlace}</p>
                    <p> Last Seen: ${missingPerson.lastSeen}</p>
                  </div>
                  <div class="card-action">
                    <a href="#" class="blue-text">File a Sightening</a>
                  </div>
                </div>
              </div>
            </div>
          
        `;

      html += li;
    })
    missingList.innerHTML = html;

  }
  else {
    loggedOutContainer.style.display = 'block'
    missingList.innerHTML = ``
  }
}



// setup materialize modals
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

});