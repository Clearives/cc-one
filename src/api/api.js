import axios from 'axios';

const base = '';

export const reqLogin = params => axios.post(`${base}/login`, params).then(res => res.data);
export const getUserList = params => axios.get(`${base}/user/list`, { params });
export const getArticle = params => axios.get(`${base}/getArticle/today`);
export const getArticle2 = params => axios.get(`${base}/getArticle/random`);
