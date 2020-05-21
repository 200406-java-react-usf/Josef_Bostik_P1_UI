import axios from 'axios';

export const p1Client = axios.create({
    //baseURL: 'http://project1-env-1.eba-mssfhvpm.us-east-2.elasticbeanstalk.com/',
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});