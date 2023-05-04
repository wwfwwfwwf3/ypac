// ApiService.js
import axios from "axios";

class ApiService {
    constructor() {
        if (ApiService.instance) {
            return ApiService.instance;
        }

        ApiService.instance = this;
    }

    async fetchArticles() {
        const address = "http://localhost:3000/articles";
        try {
            const response = await axios.get(address);
            return response.data;
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    }

    async submitForm(formName) {
        var address = "http://172.20.10.4:8000/denglu/ypac/user_login/";
        this.$refs[formName].validate((valid) => {
            if (valid) {
                axios
                    .post(address, this.loginForm)
                    .then((response) => {
                        console.log("Success");
                        console.log(response.data);
                        this.$router.push({ path: '/' });
                    })
                    .catch((error) => {
                        console.log("Error");
                        console.log(error);
                    });
                console.log("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }
    // Add other API methods here
}

const apiService = new ApiService();
export default apiService;
