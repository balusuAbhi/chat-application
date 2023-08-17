let users = [];
const addUser = ({ id, username, roomID }) => {
  const userName = username.trim().toLowerCase();
  const roomId = roomID.trim().toLowerCase();

  // checking for username and userid
  if (!userName || !roomId) {
    return {
      error: "username and roomid is required",
    };
  }

  //validate user name
  const userexsits = users.some((user) => {
    return user.username === userName && user.roomid === roomId;
  });

  //if user exsits return error message
  if(userexsits) {
    return {
      error: "username already in use please use another username",
    };
  }else {
    const user = {
      roomid: roomId,
      username: userName,
      id: id,
    };
    users.push(user);

    return {user};
  }
};

const removeUser = (id) =>{
    const afterRemovingUser = users.filter((user)=>{
        return user.id !== id;
    });
   users = [...afterRemovingUser];
}

const getUserdata = ()=>{
  const usernames = users.map((eachUser)=>{
    return eachUser.username;
  })
  return usernames;
}

module.exports = {
  addUser,removeUser,getUserdata
};
