import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(500).send({"error": "No Token Provided"})
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(decoded)
        if(!decoded) return res.status(500).send("authentication Fails...")
            req.user = decoded;

        next();
    } catch (error) {
        res.status(500).send({"error": error.message})
    }
}