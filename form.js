document.addEventListener("DOMContentLoaded", () => {

  let formValues = {}

  // DOM elements - Contact form
  const contactForm = document.querySelector('.contact-form')
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea')
  const formSubmit = document.querySelector('.contact-form button[type="submit"]')

  // don't validate form via HTML
  contactForm.setAttribute("novalidate", true)

  function handleSubmit() {

    // last name validation
    const lastName = document.querySelector('.contact-form #lname')
    if (/^([A-Za-zÀ-ÖØ-öø-ÿ])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+$/.test(lastName.value) === true) {
      lastName.classList.remove('invalid')
      formValues["Nom"] = lastName.value
    } else {
      lastName.classList.add('invalid')
    }

    // first name validation
    const firstName = document.querySelector('.contact-form #fname')
    if (/^([A-Za-zÀ-ÖØ-öø-ÿ])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+( |-)?([A-Za-zÀ-ÖØ-öø-ÿ?])+$/.test(firstName.value) === true) {
      firstName.classList.remove('invalid')
      formValues["Prénom"] = firstName.value
    } else {
      firstName.classList.add('invalid')
    }

    // phone validation
    const telephone = document.querySelector('.contact-form #phone')
    if (telephone.value === "") {
      telephone.classList.remove('invalid')
      formValues["Téléphone"] = telephone.value
    } else if (/^[0-9+()\. \/]{4,15}$/.test(telephone.value) === true) {
      telephone.classList.remove('invalid')
      formValues["Téléphone"] = telephone.value
    } else {
      telephone.classList.add('invalid')
    }

    // email validation - regex courtesy of Tripleaxis
    const email = document.querySelector('.contact-form #email')
    if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email.value) === true) {
      email.classList.remove('invalid')
      formValues["Adresse mail"] = email.value
    } else {
      email.classList.add('invalid')
    }

    // message validation
    const message = document.querySelector('.contact-form #message')
    if (message.value !== "") {
      message.classList.remove('invalid')
      formValues["Message"] = message.value
    } else {
      message.classList.add('invalid')
    }
  }

  // display data in console
  function displayInformation() {
    if (Object.keys(formValues).length === 5) {
      console.log(formValues)
    }
  }


  // DOM elements - modal
  const modal = document.querySelector('dialog')
  const body = document.querySelector('body')
  const overlay = document.querySelector('.overlay')
  const closeModal = document.querySelector('dialog .close')

  // display popup
  function openModal() {
    if (Object.keys(formValues).length === 5) {
      modal.classList.add("modal")
      overlay.style.display = "block"
      body.classList.add("modal-open")
    }
  }


  formSubmit.onclick = (event) => {
    // prevent form from refreshing page
    event.preventDefault()

    handleSubmit()
    displayInformation()
    openModal()
  }

  // close the modal
  closeModal.onclick = () => {
    modal.classList.remove("modal")
    overlay.style.display = "none"
    body.classList.remove("modal-open")
    formValues = {}
  }
})