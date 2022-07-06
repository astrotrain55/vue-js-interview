import users from '@/api/users';

export default {
  getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.then(resolve);
      }, 1000);
    });
  },
};
