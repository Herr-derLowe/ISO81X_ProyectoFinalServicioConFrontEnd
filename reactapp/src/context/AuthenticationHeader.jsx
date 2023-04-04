export default function AuthenticationHeader() {
    const token = sessionStorage.getItem("token");

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}