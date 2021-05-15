export const compositeFields: CompositeFields = {
  url_path: {
    parse (path: string) {
      return Object.fromEntries(new URL(path, "http://localhost").searchParams)
    },
  },
}
