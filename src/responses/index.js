export const successResponse = (data) => {
  return {
    error: false,
    code: 200,
    data,
  };
};

export const badRequestResponse = (data) => {
  return {
    error: true,
    code: 400,
    data,
  };
};

export const serverErrorResponse = (data) => {
  return {
    error: true,
    code: 500,
    data,
  };
};
