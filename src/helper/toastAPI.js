import toast from "react-hot-toast";
export const displaySuccessMessage = (message) => {
  return toast.success(message);
};

export const displayErrorMessage = (error) => {
  return toast.error(error);
};
