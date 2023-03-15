const postTable = document.getElementById("post-table");
const companyFilter = document.getElementById("company-filter");
const keywordInput = document.getElementById("keyword-input");

let posts = [];
let users = [];

// Fetch Data dari Postlist
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    renderTable();
  });

// Fetch Data dari Userlist
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    users = data;
    renderFilter();
  });

// Render Data ke dalam Tabel
function renderTable() {
  // Hapus semua row di Tabel sebelumnya
  postTable.innerHTML = "";

  // Ambil data yang sudah difilter dan diurutkan
  const filteredPosts = getFilteredAndSortedPosts();

  // Input setiap Post dan render data ke dalam tabel
  filteredPosts.forEach((post) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = post.id;
    row.appendChild(idCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = post.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement("td");
    const author = users.find((user) => user.id === post.userId);
    authorCell.textContent = `${author.name} (${author.company.name})`;
    row.appendChild(authorCell);

    postTable.appendChild(row);
  });
}

// Render dropdown filter untuk company
function renderFilter() {
  // Ambil daftar company yang udah ada di DataUser
  const companies = [...new Set(users.map((user) => user.company.name))];

  // Buat option untuk dropdown filter
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "All Companies";
  companyFilter.appendChild(defaultOption);

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.textContent = company;
    companyFilter.appendChild(option);
  });

  // Tambahkan EventListener buat filter dan search
  companyFilter.addEventListener("change", renderTable);
  keywordInput.addEventListener("input", renderTable);
}

// Fungsi untuk mendapatkan data post yang sudah difilter dan diurutkan
function getFilteredAndSortedPosts() {
  let filteredPosts = posts;

  // Filter Data berdasarkan Company (Menghapus Data yang tidak dibutuhkan)
  if (companyFilter.value !== "All companies") {
    const filteredUsers = users.filter(
      (user) => user.company.name !== companyFilter.value
    );
    const filteredUserIds = filteredUsers.map((user) => user.id);
    filteredPosts = filteredPosts.filter((post) =>
      filteredUserIds.includes(post.userId)
    );
  }

  // Filter Data berdasarkan Title
  if (keywordInput.value !== "") {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.includes(keywordInput.value) ||
        post.body.includes(keywordInput.value)
    );
  }

  // Urutin Data berdasarkan ID
  filteredPosts.sort((a, b) => a.id - b.id);

  return filteredPosts;
}
