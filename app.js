$(function() {
  
  // your code here
  let userId = 1;

  $('.container').find('button:first').on('click', function() {
    userId === 1 ? userId = 30 : userId -= 1;
    getUserInfo(userId);
  });

  $('.container').find('button:first').next().on('click', function() {
    userId === 30 ? userId = 1 : userId += 1;
    getUserInfo(userId);
  });

  $('.posts').children('h3').on('click', function() {
    $('.posts').children('ul').slideToggle();
  });

  $('.todos').children('h3').on('click', function() {
    $('.todos').children('ul').slideToggle();
  });

  const getUserInfo = (userId) => {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      type: 'GET',
      success: function(res) {
        $('.info__image').children('img').attr('src', res.image);
        $('.info__content').html('').append(`
          <h3>${res.firstName} ${res.lastName}</h3>
          <div><span>Age</span>: ${res.age}</div>
          <div><span>Email</span>: ${res.email}</div>
          <div><span>Phone</span>: ${res.phone}</div>
          `)
        $('.posts').children('h3').text(`${res.firstName}'s Posts`);
        $('.todos').children('h3').text(`${res.firstName}'s To Dos`);
      },
      error: function(err) {
        console.error(err);
      }
    })

    $.ajax({
      url: `https://dummyjson.com/users/${userId}/posts`,
      type: 'GET',
      success: function(res) {
        const posts = res.posts;
        $('.posts').children('ul').html('')
        if (posts.length === 0) {
          $('.posts').children('ul').append(`
            <li>User has no posts</li>
            `)
        } else {
          posts.forEach(post => {
            $('.posts').children('ul').append(`
              <li>
                <h4>${post.title}</h4>
                <p>${post.body}</p>
              </li>
            `)

              $('.posts').children('ul').children('li:first').on('click', function() {
                getPostDetail(post.id);
              })
          });
        }
      },
      error: function(err) {
        console.error(err);
      }
    })

    $.ajax({
      url: `https://dummyjson.com/users/${userId}/todos`,
      type: 'GET',
      success: function(res) {
        const todos = res.todos;
        $('.todos').children('ul').html('')
        if (todos.length === 0) {
          $('.todos').children('ul').append(`
            <li>User has no todos</li>
            `)
        } else {
          todos.forEach(todo => {
            $('.todos').children('ul').append(`
              <li>${todo.todo}</li>
              `)
          });
        }
      },
      error: function(err) {
        console.error(err);
      }
    })
  }

  const getPostDetail = (postId) => {
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      type: 'GET',
      success: function(res) {
        const modalElement = `
          <div class="overlay">
            <div class="modal">
              <h3>${res.title}</h3>
              <p>${res.body}</p>
              <p>${res.views}</p>
              <button class="modal_close">Close Modal</button>
            </div>
          </div>
          `;
        $('body').append(modalElement);
        $('body').addClass('overlay');
        $('.modal_close').on('click', function() {
          $('.modal').remove();
          $('.overlay').removeClass();
        });
      },
      error: function(err) {
        console.error(err);
      }
    })
  }

  getUserInfo(userId);
})