export const handleTokenErrors = (error) => {
  if (error.response.data.originalError === "jwt expired") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};
