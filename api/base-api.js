import http from "../common/util/http.js"

export function addShop(data) {
    return http.post('', data)
}