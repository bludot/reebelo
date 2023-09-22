"use client";

import {AuthClient} from "@/api/queries";
import {RefreshTokensMutation} from "@/gql/graphql";
import {refreshTokensMutation} from "@/api/graphql/queries";

let interval: NodeJS.Timeout | null = null

export class HandleRefresh {
    private static instance: HandleRefresh;

     constructor() {
    }

    static getInstance() {
        if (!HandleRefresh.instance) {
            HandleRefresh.instance = new HandleRefresh();
        }
        return HandleRefresh.instance;
    }

    getInterval() {
        return interval
    }

    start() {
        // 30 seconds
        interval = setInterval(refreshTokenProcess, 30000)
    }

    stop() {
        clearInterval(interval as NodeJS.Timeout)
        interval = null
    }
}

function refreshTokenProcess() {
    if (typeof window === 'undefined') {
        return
    }
    const exp = localStorage.getItem('exp')
    const refreshToken = localStorage.getItem('refreshToken')
    AuthClient.request<RefreshTokensMutation>(refreshTokensMutation, {refreshToken}).then((data) => {
        localStorage.setItem("jwt", data.refreshToken.token)
        localStorage.setItem("refreshToken", data.refreshToken.refreshToken)
        localStorage.setItem("exp", data.refreshToken.exp.toString())
        AuthClient.setHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`)
    }).catch(() => {
        clearInterval(interval as NodeJS.Timeout)
        localStorage.removeItem('jwt')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('exp')
    })
}