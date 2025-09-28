//по длиннам поля title
function fetchs(callback) {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error:", error));
}

function handle(data) {
    //console.log("Fetched Data:", data);
    const sortedPosts = data.sort((a, b) => b.title.length - a.title.length);
    console.log(sortedPosts);
}

fetchs(handle);
 
//по имени email
function fetchs(callback) {
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error("Error:", error));
}

function handle(data) {
    //console.log("Fetched Data:", data);
    //const sortedPosts = data.sort((a, b) => b.email > a.email);
    //console.log(sortedPosts);
    const sortedPosts = data.sort((a, b) => a.email.localeCompare(b.email));
    console.log(sortedPosts);
   

}

fetchs(handle);
//c помощью промисов users

function getUsersWithFilteredFields() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(users => {
        const filteredUsers = users.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone
        }));
        resolve(filteredUsers);
      })
      .catch(error => {
        reject(error);
      });
  });
}

getUsersWithFilteredFields()
  .then(filteredUsers => {
    console.log('Отфильтрованные пользователи:', filteredUsers);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });


//c помощью промисов todos
function getIncompleteTodos() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(todos => {
       
        const incompleteTodos = todos.filter(todo => !todo.completed);
        resolve(incompleteTodos);
      })
      .catch(error => {
        reject(error);
      });
  });
}


getIncompleteTodos()
  .then(incompleteTodos => {
    console.log('Невыполненные задачи:', incompleteTodos);
    console.log("Найдено"+ incompleteTodos.length+"невыполненных задач");
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

//async a
async function getPostsSortedByTitleLength() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
   
    const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
    
    return sortedPosts;
  } catch (error) {
    throw new Error(`Ошибка при получении постов: ${error.message}`);
  }
}


async function displaySortedPosts() {
  try {
    const sortedPosts = await getPostsSortedByTitleLength();
    console.log('Посты, отсортированные по убыванию длины title:', sortedPosts);
    return sortedPosts;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

displaySortedPosts();
//asinc b
async function getCommentsSortedByAuthor() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const comments = await response.json();
    
  
    const sortedComments = comments.sort((a, b) => 
      a.email.localeCompare(b.email)
    );
    
    return sortedComments;
  } catch (error) {
    throw new Error(`Ошибка при получении комментариев: ${error.message}`);
  }
}


async function displaySortedComments() {
  try {
    const sortedComments = await getCommentsSortedByAuthor();
    console.log('Комментарии, отсортированные по имени автора:', sortedComments);
    return sortedComments;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

displaySortedComments();

