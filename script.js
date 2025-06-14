document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("event-form");
  const list = document.getElementById("event-list");
  const localKey = "events";
  const themeBtn = document.getElementById("toggle-theme");

  let events = JSON.parse(localStorage.getItem(localKey)) || [];

  function saveEvents() {
    localStorage.setItem(localKey, JSON.stringify(events));
  }

  function renderEvents() {
    list.innerHTML = "";
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    events.forEach((event, index) => {
      const li = document.createElement("li");
      li.className = "event-item";
      li.innerHTML = `
        <div class="date">${event.date}</div>
        <div class="title">${event.title}</div>
        <div class="description">${event.description || ""}</div>
        <div class="actions">
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });

    // Add button listeners
    document.querySelectorAll(".delete").forEach(btn =>
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        events.splice(index, 1);
        saveEvents();
        renderEvents();
      })
    );

    document.querySelectorAll(".edit").forEach(btn =>
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        const event = events[index];
        document.getElementById("date").value = event.date;
        document.getElementById("title").value = event.title;
        document.getElementById("description").value = event.description;
        events.splice(index, 1);
        saveEvents();
        renderEvents();
      })
    );
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    events.push({ date, title, description });
    saveEvents();
    renderEvents();
    form.reset();
  });

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  renderEvents();
});
