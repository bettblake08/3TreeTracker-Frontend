import BACK__11 from "../assets/images/back--11.jpg";
import MAIN_LOGO from "../assets/images/3TreeTracker.png";
import USER_50 from "../assets/images/user_50.jpg";
import USER_150 from "../assets/images/user_150.jpg";
import USER_200 from "../assets/images/user_200.jpg";
import LANDING_PAGE_BACKGROUND from "../assets/images/home.jpg";
import REGISTRATION_FORM from "../assets/images/form.png";
import LADDER from "../assets/images/ladder.jpg";

const WEB_URL = "http://localhost:5000/";
const SOCKET_URL = "ws://localhost:8080/";
const API_URL = `${WEB_URL}api/v1/`;

//let SOCKET_URL = "wss://900bbd6f.ngrok.io:8080/";
//let WEB_URL = "https://900bbd6f.ngrok.io/";

const DEFAULT_USER_PIC = [
	USER_50,
	USER_150,
	USER_200
];

const DEFAULT_PRODUCT_COVER_PIC = BACK__11;

const ADMIN_LOGIN_BACKGROUND = BACK__11;

export {
	WEB_URL,
	API_URL,
	SOCKET_URL,
	DEFAULT_PRODUCT_COVER_PIC,
	LANDING_PAGE_BACKGROUND,
	DEFAULT_USER_PIC,
	MAIN_LOGO,
	REGISTRATION_FORM,
	ADMIN_LOGIN_BACKGROUND,
	LADDER
};