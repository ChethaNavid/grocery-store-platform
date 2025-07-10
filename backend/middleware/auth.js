import jwt from 'jsonwebtoken';

const authenticateToken = ((req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({ error: "Token missing" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({ error: "Invalid or expired token" });
        req.user = user;
        next();
    })
});

export default authenticateToken;