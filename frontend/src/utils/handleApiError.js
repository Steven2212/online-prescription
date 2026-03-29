import toast from "react-hot-toast";

const handleApiError = (err) => {
  if (err.response) {
    const { statusCode, message } = err.response.data;

    if (statusCode === 500) {
      toast.error("Something went wrong on our end. Please try again later.");
    } else {
      toast.error(message || "An error occurred.");
    }
  } else if (err.request) {
    toast.error("Network error. Please check your connection.");
  } else {
    toast.error("Something went wrong. Please try again.");
  }
};

export default handleApiError;