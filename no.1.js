const postListUrl = 'https://jsonplaceholder.typicode.com/posts';
const userListUrl = 'https://jsonplaceholder.typicode.com/users';

const filteredCompanies = ['ABC Company 1', 'ABC Company 2'];
// Ambil Data PostList
fetch(postListUrl)
  .then(response => response.json())
  .then(posts => {
    // Filter postlist
    const filteredPosts = posts.filter(post => post.id >= 1 && post.id <= 100);

    // Ambil data Userlist
    fetch(userListUrl)
      .then(response => response.json())
      .then(users => {
        // Filter Data User yang tidak termasuk pada data filteredCompanies
        const filteredUsers = users.filter(user => !filteredCompanies.includes(user.company.name));

        // Gabung Berdasarkan userId
        const mergedData = filteredPosts.map(post => {
          const user = filteredUsers.find(user => user.id === post.userId);
          return {
            ...post,
            user: user
          };
        });

        // Show Data Derdasarkan Postlist Id
        const sortedData = mergedData.sort((a, b) => a.id - b.id);
        console.log(sortedData);
      });
  });
