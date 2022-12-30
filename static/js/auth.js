auth.onAuthStateChanged( user => {
  if (user) {
    updateNav(user);
    //Get data from firestore database
    db.collection('missingDB').get().then(snapshot => {
      setupMissingList(snapshot.docs);
    });
  } else {
    updateNav();
    setupMissingList([]);
  }
}
)

//Sign Up form
const signupForm = document.querySelector("#signup-form")

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
      });
})

// Log out
const logoutLink = document.querySelector('#logout');
logoutLink.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
})

// Log in
const loginForm = document.querySelector("#login-form")

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
      });
})

const addForm = document.querySelector("#add-form")
addForm.addEventListener('submit', (e) => {
  e.preventDefault()
  var imgURL;
  const file = addForm['person-image'].files[0];
  const fileRef = storageRef.child(file.name)
  fileRef.put(file).then(() => {
    fileRef.getDownloadURL().then((url) => {
      console.log(url)
      imgURL = url
  
      db.collection('missingDB').add({
        firstName: addForm['first-name'].value,
        lastName: addForm['last-name'].value,
        age: addForm['age'].value,
        lastSeen: addForm['last-seen'].value,
        birthDate: addForm['birth-date'].value,
        birthPlace: addForm['birth-place'].value,
        taille: addForm['taille'].value,
        image: imgURL,
      }).then(() => {
        const modal = document.querySelector('#modal-add');
        M.Modal.getInstance(modal).close();
        addForm.reset();
      })
    })
    // console.log(fileRef.getDownloadURL())
    // imgURL = fileRef.getDownloadURL()
  })
})

// const findForm = document.querySelector("#find-form")
// findForm.addEventListener('submit', (e) => {
//   // e.preventDefault()
//   // var imgURL;
//   // const file = findForm['person-image-find'].files[0];
//   // const fileRef = storageRef.child(file.name)
//   // fileRef.put(file).then(() => {
//   //   fileRef.getDownloadURL().then((url) => {
//   //     console.log(url)
//   //     imgURL = url
//   //   })
//   //   // console.log(fileRef.getDownloadURL())
//   //   // imgURL = fileRef.getDownloadURL()
//   // })
// })

