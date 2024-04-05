var login = document.querySelector("#login-form");
var existingBlogs = document.querySelector("#existingBlogs");
var createNew = document.querySelector("#createNew");
var newBlog = document.querySelector("#newBlog");
var newComment = document.querySelector("#newComment");
var update = document.querySelector("#update");
var remove = document.querySelector("#delete");

/*newBlog.addEventListener("submit", event => {
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
  fetch('/api/blog', {
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
})*/

/*newComment.addEventListener("submit", event => {
  event.preventDefault();
  const comment = {
    body:document.querySelector("#comment").value,
    blogID:document.querySelector("#hiddenCommentID").value,
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
})*/

login.addEventListener("submit", event => {
  event.preventDefault();

  const username = document.querySelector('#loginUsername');
  const password = document.querySelector('#loginPassword').value.trim();

  if (username && password) {
    const response = fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
});

update.addEventListener("click",event=>{
  event.preventDefault();
  const blogID = document.querySelector("#hiddenBlogID").value;
  const editBlog = {
      title:document.querySelector("#editedTitle").value,
      content:document.querySelector("#editedContent").value,
  }
  console.log(blogID);
  console.log(editBlog);
  fetch((`/api/blog/${blogID}`),{
      method: 'PUT',
      body:JSON.stringify(editBlog),
      headers:{
          'Content-Type': 'application/json'
      }
  }).then(res=>{
      if(res.ok){
          console.log('The Blog Has Been Updated!')
          location.href= '/dashboard';
      } else {
          alert('Please Try Again');
      }
  })
})

remove.addEventListener("click",event=>{
  event.preventDefault();
  const blogID = document.querySelector("#hiddenBlogID").value;
  fetch((`/api/blog/${blogID}`),{
      method: 'DELETE',
  }).then(res=>{
      if(res.ok){
          console.log('The Blog Has Been Deleted!');
          location.href= '/dashboard';
      } else {
          alert('Please Try Again');
      }
  })
})
