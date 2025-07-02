// <div id="loadingIndicator" class="loading-indicator">
//   Loading characters...
// </div>

//<tr>
//<td>Luke Skywalker</td>
// </tr>;
const container = document.querySelector("#charactersTableBody");
const query = document.getElementById("characterName");
const form = document.getElementById("addCharacterForm");
const search = document.querySelector("#searchInput");
const saved = localStorage.getItem("saved");
console.log(JSON.parse(saved));

let allUsers;

async function fetchData() {
  try {
    const res = await fetch("https://swapi.tech/api/people/");
    const data = await res.json();
    const customCharacters = saved ? JSON.parse(saved) : [];
    allUsers = [...data.results, ...customCharacters];

    console.log(allUsers);

    drawUI(allUsers);
  } catch (error) {}
}
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

function drawUI(users) {
  container.innerHTML = "";
  users.forEach((user) => {
    const HTML = `
    <tr class="${user.unique ? "custom-character" : ""}">
      <td>${user.name}</td>
    </tr>
  `;
    container.insertAdjacentHTML("beforeend", HTML);
  });
}
form.addEventListener("submit", (e) => {
  if (!query.value) return;
  e.preventDefault();
  const newUser = {
    uid: crypto.randomUUID(),
    name: query.value,
    unique: true,
  };
  allUsers.push(newUser);
  localStorage.setItem(
    "saved",
    JSON.stringify(allUsers.filter((user) => user.unique))
  );
  drawUI(allUsers);
  query.value = "";
});

search.addEventListener("input", () => {
  const text = search.value.toLowerCase();
  const filteredUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(text);
  });
  drawUI(filteredUsers);
});
