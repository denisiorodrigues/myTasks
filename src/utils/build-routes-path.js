export function buildRoutesPath(path) {
  const routeParametersregex = /:([a-zA-Z]+)/g;

  console.log(Array.from(path.matchAll(routeParametersregex)));
}
