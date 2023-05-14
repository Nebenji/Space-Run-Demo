import Koji from '@withkoji/vcc'

const backend = Koji.config.serviceMap.backend

export const ENDPOINTS = {
    LEADERBOARD: backend + '/leaderboard',
    SUBMIT: backend + '/leaderboard/save'
}
