export const fetchBoards = userId => {
  return $.ajax({
    method: "GET",
    url: "/api/boards",
    data: { userId }
  });
};

export const fetchUserBoards = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/boards/${userId}`
  });
};

export const fetchBoard = id => {
  return $.ajax({
    method: "GET",
    url: `/api/boards/${id}`
  });
};

export const createBoard = board => {
  return $.ajax({
    method: "POST",
    url: "/api/boards",
    data: { board }
  });
};

export const updateBoard = board => {
  return $.ajax({
    method: "PATCH",
    url: `/api/boards/${board.id}`,
    data: { board }
  });
};

export const deleteBoard = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/boards/${id}`
  });
};
