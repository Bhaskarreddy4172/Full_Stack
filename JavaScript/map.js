const traineeMap = new Map([
    ["1", { id: "1", name: "Binnu", age: 22, department: "HR",  }],
    ["2", { id: "2", name: "Nani", age: 25, department: "Finance",  }],
    ["3", { id: "3", name: "Ayaan", age: 23, department: "IT",  }],
    ["4", { id: "4", name: "Laddu", age: 24, department: "Marketing",  }],
    ["5", { id: "5", name: "Gunna", age: 21, department: "Design",  }]
  ]);
                                                              
  window.onload = displayTrainees;

  function displayTrainees() {
    const tbody = document.querySelector("#traineeTable tbody");
    tbody.innerHTML = ""; 
    traineeMap.forEach(t => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.id}</td>
        <td>${t.name}</td>
        <td>${t.age}</td>
        <td>${t.department}</td>
        `;
      tbody.appendChild(row);
    });
  }

  function searchTrainee() {
    const id = document.getElementById("searchId").value.trim();
    const resultDiv = document.getElementById("searchResult");
    if (traineeMap.has(id)) {
      const t = traineeMap.get(id);
      resultDiv.innerHTML = `Trainee Found: ID: ${t.id}, Name: ${t.name}, 
      Age: ${t.age}, Department: ${t.department}`;
    } else {
      resultDiv.innerHTML = "Trainee not found!";
    }
  }

  function addTrainee() {
    const id = prompt("Enter new Trainee ID:");
    if (!id) return alert("ID is required.");
    if (traineeMap.has(id)) return alert("Trainee with this ID already exists!");

    const name = prompt("Enter Name:");
    const age = prompt("Enter Age:");
    const department = prompt("Enter Department:");

    if (!name || !age || !department) return alert("All fields are required.");

    traineeMap.set(id, { id, name, age, department });
    displayTrainees();
    alert("Trainee added successfully!");
  }

  function updateTrainee() {
    const id = prompt("Enter Trainee ID to update:");
    if (!id) return alert("ID is required.");
    if (!traineeMap.has(id)) return alert("Trainee not found!");

    const existing = traineeMap.get(id);
    const name = prompt("Enter new Name:", existing.name);
    const age = prompt("Enter new Age:", existing.age);
    const department = prompt("Enter new Department:", existing.department);

    if (!name || !age || !department) return alert("All fields are required.");

    traineeMap.set(id, { id, name, age, department});
    displayTrainees();
    alert("Trainee updated successfully!");
  }

  function deleteTrainee() {
    const id = prompt("Enter Trainee ID to delete:");
    if (!id) return alert("ID is required.");
    if (!traineeMap.has(id)) return alert("Trainee not found!");

    if (confirm("Are you sure you want to delete this trainee?")) {
      traineeMap.delete(id);
      displayTrainees();
      alert("Trainee deleted successfully!");
    }
  }