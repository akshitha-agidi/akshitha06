let posts = [];

function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if (title === "" || content === "") {
    alert("Please fill all fields");
    return;
  }

  let post = {
    id: Date.now(),
    title: title,
    content: content,
    comments: []
  };

  posts.push(post);
  displayPosts();

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}

function deletePost(id) {
  posts = posts.filter(post => post.id !== id);
  displayPosts();
}

function addComment(postId) {
  let input = document.getElementById(`comment-${postId}`);
  let text = input.value;

  if (text === "") return;

  let post = posts.find(p => p.id === postId);
  post.comments.push(text);

  input.value = "";
  displayPosts();
}

function displayPosts() {
  let postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  posts.forEach(post => {
    let div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">Delete</button>

      <div class="comment-box">
        <input type="text" id="comment-${post.id}" placeholder="Add comment">
        <button onclick="addComment(${post.id})">Comment</button>
      </div>

      <div>
        ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
      </div>
    `;

    postsDiv.appendChild(div);
  });
}