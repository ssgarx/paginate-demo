export function range(start, end) {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
export function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage)
}
export function joinClassNames(...classes) {
  const classList = classes.map((className) =>
    className ? className.trim() : ""
  )
  return classList.join(" ")
}
