export const UserData = {
  async getUsersData() {
    try {
      const response = await fetch("http://172.20.10.9/react-laravel/react-laravel-dashboard-backend/public/api/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data_response = await response.json();
      return data_response;
    } catch (error) {
      console.log("Error:", error.message);
    }
  },

  getUsers() {
    return Promise.resolve(this.getUsersData());
  },
};
