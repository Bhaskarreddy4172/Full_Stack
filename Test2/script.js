const form = document.getElementById('profileForm');
const nameInput = document.getElementById('name');
const bioInput = document.getElementById('bio');
const imageInput = document.getElementById('imageUpload');
const borderStyleSelect = document.getElementById('borderStyle');
const previewContainer = document.getElementById('previewContainer');
const cardsContainer = document.getElementById('cardsContainer');
const previewBtn = document.getElementById('previewBtn');

let cards = [];

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('profileCards');
  if (saved) {
    cards = JSON.parse(saved);
    cards.forEach(card => renderCard(card));
  }
});

function saveToLocalStorage() {
  localStorage.setItem('profileCards', JSON.stringify(cards));
}

function renderCard(cardData) {
  const card = document.createElement('div');
  card.className = 'profile-card';
  if (cardData.theme === 'dark') card.classList.add('dark');

  const img = document.createElement('img');
  img.src = cardData.image;
  img.className = cardData.borderStyle;

  const name = document.createElement('h3');
  name.textContent = cardData.name;

  const bio = document.createElement('p');
  bio.textContent = cardData.bio;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'card-buttons';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';
  deleteBtn.onclick = () => {
    cards = cards.filter(c => c.id !== cardData.id);
    saveToLocalStorage();
    cardsContainer.removeChild(card);
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit';
  editBtn.onclick = () => {
    nameInput.value = cardData.name;
    bioInput.value = cardData.bio;
    borderStyleSelect.value = cardData.borderStyle;
    previewImage(cardData.image, cardData.borderStyle);
    cards = cards.filter(c => c.id !== cardData.id);
    saveToLocalStorage();
    cardsContainer.removeChild(card);
  };

  const themeToggleBtn = document.createElement('button');
  themeToggleBtn.textContent = 'Toggle Theme';
  themeToggleBtn.className = 'theme-toggle';
  themeToggleBtn.onclick = () => {
    cardData.theme = cardData.theme === 'light' ? 'dark' : 'light';
    saveToLocalStorage();
    card.classList.toggle('dark');
  };

  buttonsDiv.appendChild(deleteBtn);
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(themeToggleBtn);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(bio);
  card.appendChild(buttonsDiv);

  cardsContainer.appendChild(card);
}

function previewImage(imageSrc, borderStyle) {
  previewContainer.innerHTML = '';
  const previewCard = document.createElement('div');
  previewCard.className = 'profile-card';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.className = borderStyle;

  const name = document.createElement('h3');
  name.textContent = nameInput.value;

  const bio = document.createElement('p');
  bio.textContent = bioInput.value;

  previewCard.appendChild(img);
  previewCard.appendChild(name);
  previewCard.appendChild(bio);

  previewContainer.appendChild(previewCard);
}

previewBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  if (!file) return alert('Please upload an image!');
  const reader = new FileReader();
  reader.onload = e => {
    previewImage(e.target.result, borderStyleSelect.value);
  };
  reader.readAsDataURL(file);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const file = imageInput.files[0];
  if (!file) return alert('Please upload an image!');
  const reader = new FileReader();
  reader.onload = e => {
    const newCard = {
      id: Date.now(),
      name: nameInput.value,
      bio: bioInput.value,
      image: e.target.result,
      borderStyle: borderStyleSelect.value,
      theme: 'light'
    };
    cards.push(newCard);
    saveToLocalStorage();
    renderCard(newCard);
    form.reset();
    previewContainer.innerHTML = '';
  };
  reader.readAsDataURL(file);
});
