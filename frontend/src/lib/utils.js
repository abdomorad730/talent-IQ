export const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
        return "badge-primary";
    case "medium":
        return "badge-warning";
    case "hard":
        return "badge-error";
    default:
        return "badge-ghost";
  }
}