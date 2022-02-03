const userResolver = {
  Query: {
    users: (parentObj, args, { db }) => Object.values(db.users),
    user: (parentObj, { id }, { db }) => db.users[id],
  },
};

export default userResolver;
