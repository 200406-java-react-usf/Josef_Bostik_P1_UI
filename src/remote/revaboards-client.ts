import axios from 'axios';

export const revaboardsClient = axios.create({
    baseURL: 'http://project1-env-1.eba-mssfhvpm.us-east-2.elasticbeanstalk.com/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});