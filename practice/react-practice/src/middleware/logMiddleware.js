const loggerMiddleware = (store) => (next) => (action) => {
  console.log("====== Before Dispatch ======");
  console.log("Action:", action);
  console.log("Previous State:", store.getState());

  // Pass action to the next middleware/reducer
  const result = next(action);

  console.log("====== After Dispatch ======");
  console.log("Current State:", store.getState());

  return result;
};

export default loggerMiddleware;