export const handleTokenErrors = (error) => {
    console.log(error);
    if (error.response.data.originalError === "jwt expired") {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
};