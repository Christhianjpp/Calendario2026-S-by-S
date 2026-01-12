import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Assuming local connection for now as per user prompt context ("use mcp of mongo", usually implies local)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/planificador';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema
const metricSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
});

const Metric = mongoose.model('Metric', metricSchema);

// Initialize counter if not exists
const initCounter = async () => {
    try {
        const exists = await Metric.findOne({ name: 'downloads' });
        if (!exists) {
            await Metric.create({ name: 'downloads', count: 0 });
            console.log('Initialized download counter');
        }
    } catch (error) {
        console.error('Error initializing counter:', error);
    }
};
initCounter();

// Routes
app.get('/api/download', async (req, res) => {
    try {
        const metric = await Metric.findOne({ name: 'downloads' });
        res.json({ count: metric ? metric.count : 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching count' });
    }
});

app.post('/api/download', async (req, res) => {
    try {
        const metric = await Metric.findOneAndUpdate(
            { name: 'downloads' },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );
        res.json({ count: metric.count });
    } catch (error) {
        res.status(500).json({ error: 'Error incrementing count' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
