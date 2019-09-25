document.addEventListener('DOMContentLoaded', e => {
  console.log('sanity check');
  // an all front end -- SPA -- application utilizing javascript

  // fetch all posts regardless of if user is logged in
  defaultUser = {
    username: 'theunflash2',
    email: 'theunflash2@superhero.com',
    password: 'zoom',
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGVmbGFzaEBzdXBlcmhlcm8uY29tIiwiZXhwIjoxNTY5Mzc2MDg2LCJpYXQiOjE1NjkzNTgwODZ9.evEXDFpdnJUPMgwOnoWx4D8Ymf4pWJZvjD7Zrc6cknwDWSaf8ePUvkF8KOGEPW5Kl3c1eKWnxaSdxdUepa2Ojg',
  };

  const getAllPostRoute = `http://thesi.generalassemb.ly:8080/post/list`;
  const getProfileRoute = `http://thesi.generalassemb.ly:8080/profile`;
  const getPostsByUserRoute = `http://thesi.generalassemb.ly:8080/user/post`;
  const getCommentsByUserRoute = `http://thesi.generalassemb.ly:8080/user/comment`;
  const getCommentsByPostIdRoute = `http://thesi.generalassemb.ly:8080/post/${postId}/comment`;

  const postSignUpRoute = `http://thesi.generalassemb.ly:8080/signup`;
  const postLoginRoute = `http://thesi.generalassemb.ly:8080/login`;
  const postPostRoute = `http://thesi.generalassemb.ly:8080/post`;
  const postCommentRoute = `http://thesi.generalassemb.ly:8080/comment/${postId}`;
  const postProfileRoute = `http://thesi.generalassemb.ly:8080/profile`;
  const postUpdateProfileRoute = `http://thesi.generalassemb.ly:8080/profile`;

  const deletePostByPidRoute = `http://thesi.generalassemb.ly:8080/post/1`;
  const deleteCommentByCidRoute = `http://thesi.generalassemb.ly:8080/comment/2`;

  // ==================== Spiking on API for practice ====================

  function apiRequest(route, method, data, authData, pid = null, cid = null) {
    console.log('apiRequest to: ' + route);
    // switch case for different methods with string interpolation?
    fetch(route, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + authData.token,
      },
      body: JSON.stringify(data),
    });
  }

  function getPosts() {
    fetch(getAllPostRoute, {
      method: 'GET',
      // method: 'POST',
      // add something here
      // mode: 'no-cors',
      // 'Content-Type': 'application/json',
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log('data:', data); // returns an Array of Post Objects
        // Noted for Future pagination option?
        data.forEach(item => {
          renderPost(item);
        });
      })
      .catch((res, err) => {
        console.log(res);
        console.log('err:' + err);
      });
  }

  function createPost() {
    let data = {
      title: 'this is as title',
      description: 'this is the body of a post aka the description',
    };
    console.log(defaultUser.token);
    fetch(postPostRoute, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + defaultUser.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function signUpSpike() {
    let testSpike = {
      email: 'theunflash2@superhero.com',
      password: 'zoom',
      username: 'theunflash2',
    };
    fetch(postSignUpRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testSpike),
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.dir(err);
      });
  }

  // ==================== Practice code for DOM Maniuplayion ====================
  function renderPost(item) {
    let newDiv = document.createElement('div');
    let newH2 = document.createElement('h2');
    let newP = document.createElement('p');
    newDiv.className = 'post-container';
    newP.className = 'post';
    newH2.innerText = `${item.user.username} says ${item.title}...`;
    newP.innerText = `${item.description}`; // flesh this out maybe drawing what you want it to look like
    newDiv.append(newH2);
    newDiv.append(newP);

    document.getElementById('postholder').append(newDiv);
  }

  function createModal() {
    let newModal = document.create('div');
    newModal.className = 'modal';
  }
  // initial get Posts for everyone
  getPosts();
});
