const currentUserJSON = localStorage.getItem("currentUser");
if (currentUserJSON) {
  const currentUser = JSON.parse(currentUserJSON);
  const firstName = currentUser.name.trim().split(" ")[0];
  document.getElementById("home_name").textContent =
    `Welcome, ${firstName}!`;
}
else{
     document.getElementById("home_name").textContent =
    `Welcome, Student!`;
}