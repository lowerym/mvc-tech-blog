// Function that allows users to post comments to blog posts
async function newCommentHandler(event) {
  event.preventDefault();

  console.log("clicked me");

  // get text and trim whitespace
  const comment = document.getElementById("comment").value.trim();
  // get post id from URL
  const url = window.location.toString().split("/");
  const blog_id = url[url.length - 1];

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        blog_id,
        comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// Event Listener
console.log("HERE!");
console.log(document.getElementById("comment-form"));
document
  .getElementById("comment-form")
  .addEventListener("submit", newCommentHandler);
