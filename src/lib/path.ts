export function getImagePath(path: string): string {
  const repoName = "ecommerce";
  if (process.env.NODE_ENV === "production") {
    return `/${repoName}${path}`;
  }
  return path;
}