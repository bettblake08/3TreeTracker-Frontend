import axios, { axiosRefresh, axiosProtected } from "./config";
import AuthenticationAPIMock from "./mock/authenticationAPI";
import { MOCK } from "./config";

class AuthenticationAPI {
    static adminLogin(loginDetails) {
        if (MOCK) return AuthenticationAPIMock.login();

        return axios.post(`/admin/login`, {
            username: loginDetails.username,
            password: loginDetails.password
        }).then((response) => {

            switch (response.status) {
                case 200: {
                    return ({
                        success: true,
                        user: {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                        },
                        userType: "admin"
                    });
                }
            }

        }).catch((error) => {
            if (error.response.status != 200) {
                return ({
                    success: false,
                    error: {
                        status: error.response.status,
                    }
                });
            }
        });

    }

    static longrichAccountLogin(loginDetails) {

        return axios({
            url: `account/loginAuth`,
            method: "POST",
            data: {
                usernameType: loginDetails.usernameType,
                username: loginDetails.username,
                password: loginDetails.password
            }
        }).then((response) => {

            if(response.status === 200){
                return ({ success: true });
            }

        }).catch((response) => {
            if (response.response.status != 200) {
                return ({
                    error: {
                        status: response.response.status,
                    }
                });
            }
        });
    }

    static refreshToken() {
        if (MOCK) return AuthenticationAPIMock.login();

        return axiosRefresh(`token/refresh`).then((response) => {
            if(response.status === 200){
                return ({
                    success: true,
                    accessToken: response.data.access_token
                });
            }
        }).catch((response) => {
            if (response.response.status !== 200) {
                return ({
                    success: false,
                    error: {
                        status: response.response.status,
                    }
                });
            }
        });
    }


    static logout() {
        if (MOCK) return AuthenticationAPIMock.logout();

        return axiosProtected(`admin/logout`).then((response) => {
            if (response.status == 200) {
                return ({ success: true });
            }
        }).catch((response) => {
            if(response.response.status !== 200){
                return ({
                    error: {
                        status: response.response.status,
                        message: "Error accessing server. Please try again later."
                    }
                });
            }
        });

    }
}

export default AuthenticationAPI;
