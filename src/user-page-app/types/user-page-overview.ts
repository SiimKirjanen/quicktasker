type UserPageOverview = {
  assignedTasksCount: number;
  assignableTaskCount: number;
  // Whether the user has been added to any board, or can access every board.
  hasBoards: boolean;
};

export type { UserPageOverview };
