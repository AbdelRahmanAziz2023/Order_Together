type Handler = () => void;
const handlers = new Set<Handler>();

/** Register a handler and return unsubscribe */
export const onCartRefresh = (handler: Handler) => {
  handlers.add(handler);
  return () => handlers.delete(handler);
};

/** Emit refresh to all listeners */
export const emitCartRefresh = () => {
  handlers.forEach((h) => h());
};
