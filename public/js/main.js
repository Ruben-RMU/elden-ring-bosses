document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("boss-list");
  list.innerHTML = ''; // Clear any previous content

  try {
    const response = await fetch('/api/bosses');
    const data = await response.json();

    if (!data?.data || !Array.isArray(data.data)) {
      list.innerHTML = "<p class='text-red-500'>Invalid data format from server.</p>";
      return;
    }

    data.data.forEach(boss => {
      const id = boss?.id || '';
      const name = boss?.name || 'Unknown Boss';
      const image = boss?.image && boss.image.startsWith('http')
        ? boss.image
        : 'https://via.placeholder.com/300x200?text=No+Image';

      const article = document.createElement('article');
      article.className = 'bg-white p-4 rounded shadow flex flex-col';

      const h2 = document.createElement('h2');
      h2.className = 'text-xl font-semibold mb-2';
      h2.textContent = name;

      const img = document.createElement('img');
      img.src = image;
      img.alt = name;
      img.className = 'mb-2 h-80 object-cover rounded';

      // Add error event listener to fallback image
      img.addEventListener('error', () => {
        img.src = 'https://placehold.co/300x200?text=No+Image';
      });

      const a = document.createElement('a');
      a.href = `/boss/${id}`;
      a.className = 'text-blue-600 hover:underline mt-auto';
      a.textContent = 'View Details';

      article.appendChild(h2);
      article.appendChild(img);
      article.appendChild(a);

      list.appendChild(article);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    list.innerHTML = "<p class='text-red-500'>Failed to load bosses.</p>";
  }
});
