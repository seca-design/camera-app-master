const img = document.getElementById('recall__img');


function setImage() {
  if (!img) return null;

  const imgData = localStorage.getItem('imgData');
  if (!imgData) return null;

  img.src = imgData;
};


window.onload = setImage;
