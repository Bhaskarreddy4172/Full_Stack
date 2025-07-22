let employeeObj = null;

  class Employee {
    constructor(firstName, lastName, password, mobile, address, roles, experience) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.mobile = mobile;
      this.address = address;
      this.roles = roles;
      this.experience = experience;
    }
    getFullName() { return this.firstName + ' ' + this.lastName; }
    getDetails() {
      return `<strong>Name:</strong> ${this.getFullName()}<br>
              <strong>Mobile:</strong> ${this.mobile}<br>
              <strong>Address:</strong> ${this.address}<br>
              <strong>Roles:</strong> ${this.roles.join(', ') || 'None'}<br>
              <strong>Experience:</strong> ${this.experience} years<br>
              <strong>Password:</strong> ${this.password}`;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const firstName = fname.value, lastName = lname.value, password = pwd.value;
    const mobile = mobileNum.value, address = addr.value;
    const experience = +exp.value;
    const roles = [...document.getElementById('roles').selectedOptions].map(option => option.value);
    employeeObj = new Employee(firstName, lastName, password, mobile, address, roles, experience);
    showDetails();
  }

  function updateProfile() {
    if (!employeeObj) return;

    const firstName = prompt("First name:", employeeObj.firstName);
    const lastName = prompt("Last name:", employeeObj.lastName);
    const password = prompt("Password:", employeeObj.password);
    const mobile = prompt("Mobile number:", employeeObj.mobile);
    const address = prompt("Address:", employeeObj.address);
    const experience = +prompt("Experience (years):", employeeObj.experience);
    let roles = [];
    for (let r of ["Developer","Designer","Tester","Manager","DevOps"]) {
      if (confirm(`Include ${r}?`)) roles.push(r);
    }
    employeeObj = new Employee(firstName, lastName, password, mobile, address, roles, experience);
    showDetails();
  }

  function showDetails() {
    empOutput.innerHTML = employeeObj.getDetails() +
      `<br><button onclick="updateProfile()">Update Profile</button>`;
  }

  window.onload = () => employeeForm.onsubmit = handleSubmit;