import dotenv from 'dotenv';
dotenv.config();// enviromental variables
import mongoose from 'mongoose';
import server from "./app";

mongoose
     .connect(process.env.MONGO_URL as string, {})
     .then((data) => {
        console.log("MongdDB connected succeed");
        const PORT = process.env.PORT ?? 3005;
        server.listen(PORT, function () {
            console.info(`The server is running succesfully on port: ${PORT}`);
            console.info(`Admin project on htpp://localhost:${PORT}/admin \n`);
        })
     })
     .catch((err) => console.log ("ERROR on connection MongoDB", err));

