//导入axios实例
import http from "@/network/http";
export function apiGetRecommend() {
        return http({
            url: '/system/recommend/list',
            method: 'get',
        })
    }
export function turnStatus(data) {
        return http({
            url: '/system/recommend',
            method: 'put',
            data
    })
}

export function deleteRec(param) {
    return http({
        url: '/system/recommend/'+param,
        method: 'delete',
        param
})
}


