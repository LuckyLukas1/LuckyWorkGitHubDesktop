export function formatRelativeTime(date: Date) {
  const now = new Date();

  //räknar ut från millisekund till dagar
  const diffInDays = Math.floor(
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "Publicerat idag";
  } else if (diffInDays === 1) {
    return "Publicerat för 1 dag sedan";
  } else {
    return `Publicerat ${diffInDays} dagar sedan`;
  }
}
