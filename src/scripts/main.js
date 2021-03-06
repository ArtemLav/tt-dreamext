'use strict';

const overlay = document.querySelector('.overlay');
const contacts = document.querySelector('.contact-numbers');
const showContactsBtn = document.querySelector('.main-info__contact-icon');
const closeContactsBtn = document.querySelector('.contact-numbers__button');
const servicesRight = document.querySelector('.services__arrow-right');
const servicesLeft = document.querySelector('.services__arrow-left');
const doctorsRight = document.querySelector('.doctors__arrow-right');
const doctorsLeft = document.querySelector('.doctors__arrow-left');
const galleryRight = document.querySelector('.gallery__arrow-right');
const galleryLeft = document.querySelector('.gallery__arrow-left');
const photos = [...document.querySelectorAll('.gallery__photo-preview')];
const mainPhoto = document.querySelector('.gallery__main-photo');
const gallery = document.querySelector('.gallery');
const showGalleryElement = document.querySelector('.main-info__show-photos');
const closeGalleryElement = document.querySelector('.gallery__close-button');
const showMapElement = document.querySelector('.main-info__show-map');
const closeMapElement = document.querySelector('.map-container__close-button');
const mapContainer = document.querySelector('.map-container');
const mapBox = document.querySelector('.map-container__map');

showContactsBtn.addEventListener('click', () => showContacts());
closeContactsBtn.addEventListener('click', () => closeContacts());

servicesRight.addEventListener('click', () => moveServices('right'));
servicesLeft.addEventListener('click', () => moveServices('left'));

doctorsRight.addEventListener('click', () => moveDoctors('right'));
doctorsLeft.addEventListener('click', () => moveDoctors('left'));

galleryRight.addEventListener('click', () => movePhoto('right'));
galleryLeft.addEventListener('click', () => movePhoto('left'));

showGalleryElement.addEventListener('click', () => {
  overlay.classList.add('overlay_active');
  gallery.style.display = 'block';
});

closeGalleryElement.addEventListener('click', () => {
  overlay.classList.remove('overlay_active');
  gallery.style.display = 'none';
});

showMapElement.addEventListener('click', () => {
  overlay.classList.add('overlay_active');
  mapContainer.style.display = 'flex';
});

closeMapElement.addEventListener('click', () => {
  overlay.classList.remove('overlay_active');
  mapContainer.style.display = 'none';
});

photos.forEach(photo => photo.addEventListener('click', (event) => {
  photos.forEach(photoPreview => {
    photoPreview.classList.remove('gallery__photo-preview_active');
  });
  mainPhoto.src = event.target.src;
  event.target.classList.add('gallery__photo-preview_active');
}));

function showContacts() {
  contacts.style.display = 'flex';
}

function closeContacts() {
  contacts.style.display = 'none';
}

function moveServices(direction) {
  const services = document.querySelectorAll('.services__card');
  const servicesContainer = document.querySelector('.services__cards');

  switch (direction) {
    case 'left':
      servicesContainer.append(services[0]);
      break;

    case 'right':
      servicesContainer.prepend(services[services.length - 1]);
      break;
  }
}

function moveDoctors(direction) {
  const doctors = document.querySelectorAll('.doctors__card');
  const doctorsContainer = document.querySelector('.doctors__cards');

  switch (direction) {
    case 'left':
      doctorsContainer.append(doctors[0]);
      break;

    case 'right':
      doctorsContainer.prepend(doctors[doctors.length - 1]);
      break;
  }
}

function movePhoto(direction) {
  const previousActive = photos.findIndex(photo => photo
    .classList.contains('gallery__photo-preview_active'));

  photos.forEach(photo => {
    photo.classList.remove('gallery__photo-preview_active');
  });

  switch (direction) {
    case 'left':
      if (previousActive === 0) {
        mainPhoto.src = photos[photos.length - 1].src;

        photos[photos.length - 1]
          .classList.add('gallery__photo-preview_active');
      } else {
        mainPhoto.src = photos[previousActive - 1].src;

        photos[previousActive - 1]
          .classList.add('gallery__photo-preview_active');
      }
      break;

    case 'right':
      if (previousActive === photos.length - 1) {
        mainPhoto.src = photos[0].src;

        photos[0].classList.add('gallery__photo-preview_active');
      } else {
        mainPhoto.src = photos[previousActive + 1].src;

        photos[previousActive + 1]
          .classList.add('gallery__photo-preview_active');
      }
      break;
  }
};

function initMap() {
  const mapPosition = {
    lat: 50.44992,
    lng: 30.52322,
  };

  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(mapBox, {
    center: mapPosition,
    zoom: 16,
  });

  // eslint-disable-next-line no-unused-vars,no-undef
  const marker = new google.maps.Marker({
    position: mapPosition,
    map: map,
  });
}

initMap();
