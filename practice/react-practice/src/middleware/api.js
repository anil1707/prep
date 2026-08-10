const api = ({ dispatch, getState }) => (next) => (action) => {
  // Let the original action continue
  next(action);

  // Dispatch a debugging action
  console.log("hello")
  dispatch({
    type: "api/call",
    payload: {
      originalAction: action.type,
      time: new Date().toISOString(),
    },
  });
};

export default api;