import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import entriesRoutes from "./routes/entriesRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import activitiesRoutes from "./routes/activitiesRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import refreshRoutes from "./routes/refreshRoutes.js";
import logoutRoutes from "./routes/logoutRoutes.js";
import { connectDB } from "./config/db.js";
import verifyJWT from "./middleware/verifyJWT.js";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000




// // middleware

app.use(credentials);

app.use(cors(corsOptions));
// app.use(cors({
//     origin: "http://localhost:5173",
// }));

app.use(express.json());
app.use(cookieParser());
// app.use(rateLimiter);

app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/logout", logoutRoutes);

app.use(verifyJWT);

app.use("/api/entries", entriesRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/activities", activitiesRoutes);





connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT);
    });
});

