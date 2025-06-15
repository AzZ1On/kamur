document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById('news-list');
  list.classList.add('news-feed'); // добавим стиль ленты

  const posts = JSON.parse(localStorage.getItem('news-posts') || '[]');

  posts.reverse().forEach(post => {
    const div = document.createElement('div');
    div.className = 'news-post';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      ${renderMedia(post.media, post.type)}
    `;
    list.appendChild(div);
  });

  function renderMedia(src, type) {
    if (!src || !type) return '';
    if (type.startsWith('image')) {
      return `<img src="${src}" alt="Фото">`;
    } else if (type.startsWith('video')) {
      return `<video controls src="${src}"></video>`;
    } else if (type === 'application/pdf') {
      return `<iframe src="${src}"></iframe>`;
    }
    return '';
  }
});