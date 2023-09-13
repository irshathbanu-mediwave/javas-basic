let favMovies = [];
function makeMovieDiv(movie) {
  if (movie.isEdit) {
    // show edit form
    const div = document.createElement("form");
    div.setAttribute("class", "movie-card");
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", `edit-${movie.id}-name`);
    nameInput.setAttribute("placeholder", "Enter movie name");
    nameInput.setAttribute("id", `edit-${movie.id}-name`);
    nameInput.setAttribute("required", "true");
    nameInput.setAttribute("value", movie.title);

    const yearInput = document.createElement("input");
    yearInput.setAttribute("type", "number");
    yearInput.setAttribute("name", `edit-${movie.id}-year`);
    yearInput.setAttribute("placeholder", "Enter movie year");
    yearInput.setAttribute("id", `edit-${movie.id}-year`);
    yearInput.setAttribute("max", "2023");
    yearInput.setAttribute("min", "1500");
    yearInput.setAttribute("value", movie.releaseDate);

    const button = document.createElement("button");
    button.innerText = "Update movie";
    button.setAttribute("type", "submit");

    div.addEventListener("submit", function () {
      const newTitle = document.querySelector(`#edit-${movie.id}-name`).value;
      const newYear = document.querySelector(`#edit-${movie.id}-year`).value;

      const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id);
      if (toUpdateIndex != -1) {
        favMovies[toUpdateIndex]["title"] = newTitle;
        favMovies[toUpdateIndex]["releaseDate"] = newYear;
        favMovies[toUpdateIndex]["isEdit"] = false;
        updateMovieListUI();
      }
    });

    div.appendChild(nameInput);
    div.appendChild(yearInput);
    div.appendChild(button);

    return div;
  } else {
    // show card
    // outer div
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const id = `movie-${movie["id"]}`;
    div.setAttribute("id", id);

    // title
    const h2 = document.createElement("h2");
    h2.innerText = movie["title"];

    const h3 = document.createElement("h3");
    h3.innerText = movie["releaseDate"];

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delte";
    deleteBtn.addEventListener("click", function () {
      removeMovie(movie["id"]);
    });

    const editBtn = document.createElement("button");
    editBtn.innerText = "edit";
    editBtn.addEventListener("click", function () {
      editMovie(movie["id"]);
    });

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);

    return div;
  }
}

function removeMovie(movieId) {
  console.log("Deleting ", movieId);
  // const filteredArray = favMovies.filter(function(movie) {
  //   return movie.id != movieId
  // })
  const filteredArray = favMovies.filter((movie) => movie.id != movieId);
  favMovies = filteredArray;
  updateMovieListUI();
}

function editMovie(movieId) {
  console.log("Editing ", movieId);
  const toEditIndex = favMovies.findIndex((movie) => movie.id == movieId);
  if (toEditIndex != -1) {
    favMovies[toEditIndex]["isEdit"] = true;
    saveToLocalStorage();
    updateMovieListUI();
  }
}

function addMovie(movie) {
  favMovies.push(movie);
  saveToLocalStorage();
  updateMovieListUI();
}

function appendToApp(movieDiv) {
  const app = document.querySelector("#app");
  app.appendChild(movieDiv);
}

function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}

function updateMovieListUI() {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = makeMovieDiv(favMovies[i]);
    appendToApp(movieDiv);
  }
}

function hookForm() {
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#movie-name").value;
    const year = document.querySelector("#movie-year").value;

    const movie = {
      id: new Date().getTime(),
      title: name,
      releaseDate: year,
      isEdit: false,
    };
    addMovie(movie);
  });
}

function saveToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("my-movie-list", str);
}

function getFromLocalStorage() {
  const str = localStorage.getItem("my-movie-list");
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
}

// start of app
getFromLocalStorage();
updateMovieListUI();
hookForm();
