export function clean_name(name: string) {
  return titleCase(name).replace(/[^a-zA-Z\s]/g, "");
}

function titleCase(t: string) {
  return t
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
