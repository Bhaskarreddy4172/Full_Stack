
    let events = JSON.parse(localStorage.getItem('events')) || [];
    function saveEvents() {
      localStorage.setItem('events', JSON.stringify(events));
    }
    function renderEvents() {
      const eventsDiv = document.getElementById('events');
      eventsDiv.innerHTML = '';
      events.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
          <div class="event-title">${event.title}</div>
          <div class="category-badge category-${event.category}">${event.category}</div>
          <div>${event.description || ''}</div>
          <div class="countdown" id="countdown-${index}"></div>
          ${event.email ? `<div class="email-info"> Reminder set for: ${event.email}</div>` : ''}
          <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>
        `;
        eventsDiv.appendChild(card);
      });
    }
    function updateCountdowns() {
      const now = new Date().getTime();
      events.forEach((event, index) => {
        const eventTime = new Date(event.datetime).getTime();
        const distance = eventTime - now;
        if (!event.reminded && event.email && distance <= 24*60*60*1000 && distance > 0) {
          console.log(`Reminder: '${event.title}' is happening tomorrow. Email sent to: ${event.email}`);
          alert(`Reminder: '${event.title}' is happening tomorrow!`);
          event.reminded = true;
          saveEvents();
        }
        const el = document.getElementById(`countdown-${index}`);
        if (distance > 0) {
          const days = Math.floor(distance / (1000*60*60*24));
          const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
          const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
          const seconds = Math.floor((distance % (1000*60)) / 1000);
          if(el)
            el.innerText = `${days} Days ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
        } else {
          if(el)
            el.innerText = `🎉 ${event.title} is happening now!`;
        }
      });
    }
    function deleteEvent(index) {
      if (confirm('Are you sure you want to delete this event?')) {
        events.splice(index, 1);
        saveEvents();
        renderEvents();
      }
    }
    document.getElementById('eventForm').addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const description = document.getElementById('description').value.trim();
      const datetime = document.getElementById('datetime').value;
      const email = document.getElementById('email').value.trim();
      const category = document.getElementById('category').value;
      if (!title || !datetime) {
        alert('Title and Date/Time are required!');
        return;
      }
      const eventTime = new Date(datetime).getTime();
      if (eventTime <= new Date().getTime()) {
        alert('Please select a future date/time.');
        return;
      }
      events.push({ title, description, datetime, email, category, reminded: false });
      saveEvents();
      renderEvents();
      e.target.reset();
    });
    renderEvents();
    setInterval(updateCountdowns, 1000);
