const createFormData = (uri: string) => {
  const filename = uri.split("/").pop()!;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append("file", {
    uri,
    name: filename,
    type,
  } as any);

  return formData;
};
export default createFormData;