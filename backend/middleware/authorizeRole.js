export const authorizeRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(403).json({
                error: true,
                message: `Access denied. Requires ${requiredRole} role.`
            })
        }
        next();
    }
}