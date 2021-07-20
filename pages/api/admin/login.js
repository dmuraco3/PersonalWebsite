import {sha3_512} from 'js-sha3';

const sendUserIdCookie = (userId, res) => {
    const oneDayToSeconds = 24 * 60 * 60;
    res.cookie('userId', userId, 
    {
        maxAge: oneDayToSeconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true: false
    });
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        const Email = req.body.Email
        const Password  = req.body.Email
        console.log(Email,':', Password)
        res.status(200).json({ping: 'pong'})
    } else {
        // Handle any other HTTP metho
    }
}
  