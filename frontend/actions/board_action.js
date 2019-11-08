import * as BoardAPIUtil from "../util/board_api_util";

export const RECEIVE_BOARDS = "RECEIVE_BOARDS";
export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const RECEIVE_BOARD_ERRORS = "RECEIVE_BOARD_ERRORS";
export const CLEAR_BOARD_ERRORS = "CLEAR_BOARD_ERRORS";

export const receiveBoards = boards => ({
  type: RECEIVE_BOARDS,
  boards
});

export const receiveBoard = board => ({
  type: RECEIVE_BOARD,
  board
});

export const removeBoard = board => ({
  type: REMOVE_BOARD,
  board
});

export const receiveBoardErrors = errors => ({
  type: RECEIVE_BOARD_ERRORS,
  errors
});

export const clearBoardErrors = () => ({
  type: CLEAR_BOARD_ERRORS
});

export const fetchAllBoards = () => dispatch => {
  return BoardAPIUtil.fetchBoards().then(boards =>
    dispatch(receiveBoards(boards))
  );
};

export const fetchUserBoards = userId => dispatch => {
  return BoardAPIUtil.fetchUserBoards(userId).then(boards =>
    dispatch(receiveBoards(boards))
  );
};

export const fetchBoard = id => dispatch => {
  return BoardAPIUtil.fetchBoard(id).then(board =>
    dispatch(receiveBoard(board))
  );
};

export const createBoard = board => dispatch => {
  return BoardAPIUtil.createBoard(board).then(
    board => dispatch(receiveBoard(board)),
    err => dispatch(receiveBoardErrors(err.responseJSON))
  );
};

export const updateBoard = board => dispatch => {
  return BoardAPIUtil.updateBoard(board).then(
    board => dispatch(receiveBoard(board)),
    err => dispatch(receiveBoardErrors(err.responseJSON))
  );
};

export const deleteBoard = boardId => dispatch => {
  return BoardAPIUtil.deleteBoard(boardId).then(() =>
    dispatch(removeBoard(boardId))
  );
};