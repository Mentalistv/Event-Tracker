document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("event-form");
  const list = document.getElementById("event-list");
  const localKey = "events";

  let events = JSON.parse(localStorage.getItem(localKey)) || [];

  function saveEvents() {
    localStorage.setItem(localKey, JSON.stringify(events));
  }

  function renderEvents() {
    list.innerHTML = "";
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (const event of events) {
      const li = document.createElement("li");
      li.className = "event-item";
      li.innerHTML = `
        <div class="date">${event.date}</div>
        <div class="title">${event.title}</div>
        <div class="description">${event.description || ""}</div>
      `;
      list.appendChild(li);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    events.push({ date, title, description });
    saveEvents();
    renderEvents();

    form.reset();
  });

  renderEvents();
});
