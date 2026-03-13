
export const getAccessToken = () => localStorage.getItem("accessToken")

export const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId")
}