import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
}))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})