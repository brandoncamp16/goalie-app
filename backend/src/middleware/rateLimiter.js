import ratelimit from "../config/upstash.js";

const rateLimter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("global-limit"); // Change global limit to user limit using thier ID

        if(!success) {
            return res.status(429).json({message:"Too many requests, please try again later"});
        }

        next();
    }   catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
};

export default rateLimter;