var existingBlogs = document.querySelector("#existingBlogs");
var createNew = document.querySelector("#createNew");
var newPost = document.querySelector("#newPost");
var newBlog = document.querySelector("#newBlog");
var newComment = document.querySelector("#newComment");

function hideCreateNew() {
  createNew.hidden=true;
}

hideCreateNew();

newPost.addEventListener("submit", event => {
  event.preventDefault();
  console.log('click');
  existingBlogs.hidden=true;
  newPost.hidden=true;
  createNew.hidden=false;
});

newBlog.addEventListener("submit", event => {
  var title = document.querySelector("#title").value;
  var content = document.querySelector("#content").value;
  event.preventDefault();
  console.log('click');
  if (!title || !content) {
    alert('Please enter both the title and content!');
    return;
  }
  const blogObj = {
    title: title,
    content: content,
  }
  fetch('/api/blogs', {
    method:'POST',
    body:JSON.stringify(blogObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if(res.ok){
      createNew.setAttribute('hidden', 'false');
      location.reload();
    } else {
      alert('Error - Please Try Again');
    }
  })
})

newComment.addEventListener("submit", event => {
  event.preventDefault();
  const comment = {
    body:document.querySelector("#comment").value,
    blodID:document.querySelector("#hiddenCommentID").value,
  }
  fetch('/api/comments', {
    method:'POST',
    body:JSON.stringify(comment),
    headers: {
      'Content-Type':'application/json'
    }
  }).then(res => {
    if(res.ok) {
      console.log('Your Comment has been Posted!');
      location.reload();
    } else {
      alert('Please Try Again!');
    }
  })
})
