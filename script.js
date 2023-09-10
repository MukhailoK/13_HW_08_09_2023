const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error when response data: ${response.status}`);
    }
    const users = response.json();
    return users;
  } catch (error) {
    console.log(`Error fetching users: ${error.message}`);
    throw error;
  }
}

async function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  try{
    const users = await fetchUsers();
    users.forEach((user)=>{
        const li = document.createElement("li");
        li.textContent = user.name;
        li.style.cursor = 'help';
        li.style.padding = '10px';
        li.style.border = '1px solid #ccc';
        li.style.marginBottom = '5px';
        li.addEventListener('click', () => displayUserDetails(user));
        userList.appendChild(li);
    });
  } catch(error){
    const li = document.createElement("li");
    li.textContent = "users not found: try again later";
    userList.appendChild(li);
  }
}
// fetch(`${BASE_URL}/users`)
//   .then((res) => res.json())
//   .then((users) => {
//     const userList = document.getElementById("userList");
//     users.forEach((user) => {
//       const li = document.createElement("li");
//       li.textContent = user.name;
//       li.addEventListener("click", () => displayUserDetails(user));
//       userList.appendChild(li);
//     });
//   })
//   .catch((err) => {
//     const li = document.createElement("li");
//     li.textContent = "Пользователи не найдены: попробуйте повторить позднее";
//     userList.appendChild(li);
//   })
//   .finally(console.log("Финиш"));

function displayUserDetails(user) {
  userDetails.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
}
displayUsers();