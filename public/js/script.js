var existingBlogs = document.querySelector("#existingBlogs");
var createNew = document.querySelector("#createNew");
var newPost = document.querySelector("#newPost");
var newBlog = document.querySelector("#newBlog");
var newComment = document.querySelector("#newComment");
var login = document.querySelector("#login");
var signup = document.querySelector("#signup");
var update = document.querySelector("#update");
var remove = document.querySelector("#delete");

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

login.addEventListener("submit", event => {
  event.preventDefault();
  const userObj = {
    username:document.querySelector('#loginUsername').value,
    password:document.querySelector('#loginPassword').value,
  }
  console.log(userObj);
  fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if(res.ok) {
      console.log('You have logged in successfully!');
      location.href='/dashboard';
    } else {
      alert('Please Try Again!');
    }
  })
})


signup.addEventListener("submit",event => {
  event.preventDefault();
  const userObj = {
      username:document.querySelector('#signupUsername').value,
      password:document.querySelector('#signupPassword').value,
  }
  console.log(userObj)
  fetch('/api/users/',{
      method: 'POST',
      body: JSON.stringify(userObj),
      headers:{
          'Content-Type': 'application/json'
      }
  }).then(res=>{
      if(res.ok) {
          console.log('You have signed in successfully!');
          location.href= '/dashboard';
      } else {
          alert('Please Try Again!');
      }
  })
})

update.addEventListener("click",event=>{
  event.preventDefault();
  const blogID = document.querySelector("#hiddenBlogID").value;
  const editBlog = {
      title:document.querySelector("#editedTitle").value,
      content:document.querySelector("#editedContent").value,
  }
  console.log(blogID);
  console.log(editBlog);
  fetch((`/api/blogs/${blogID}`),{
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
  fetch((`/api/blogs/${blogID}`),{
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
