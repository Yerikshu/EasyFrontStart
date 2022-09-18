export const apiPost = (url, data) => {
  return request({
    url: url,
    method: "post",
    data: data,
  });
};
