const API_URL = "http://localhost:5000/api/posts";

async function loadPosts() {
    const res = await fetch(API_URL);
    const posts = await res.json();

    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
            <p>${post.text}</p>
            <p>Likes: ${post.likes}</p>
            <button onclick="likePost(${post.id})">Like</button>
            <br><br>
            <input type="text" id="comment-${post.id}" placeholder="Add comment">
            <button onclick="addComment(${post.id})">Comment</button>
            <div>
                ${post.comments.map(c => `<p>💬 ${c}</p>`).join("")}
            </div>
        `;

        postsDiv.appendChild(div);
    });
}

async function createPost() {
    const text = document.getElementById("postInput").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    document.getElementById("postInput").value = "";
    loadPosts();
}

async function likePost(id) {
    await fetch(`${API_URL}/${id}/like`, {
        method: "POST"
    });
    loadPosts();
}

async function addComment(id) {
    const input = document.getElementById(`comment-${id}`);
    const comment = input.value;

    await fetch(`${API_URL}/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment })
    });

    input.value = "";
    loadPosts();
}

loadPosts();