import mongoose from 'mongoose';

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        // Use env var or default to local for dev
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/planificador';

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Model (Definition needs to be inside or checked to avoid OverwriteModelError)
const metricSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
});

const Metric = mongoose.models.Metric || mongoose.model('Metric', metricSchema);

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            const metric = await Metric.findOne({ name: 'downloads' });
            return res.status(200).json({ count: metric ? metric.count : 0 });
        }

        if (req.method === 'POST') {
            const metric = await Metric.findOneAndUpdate(
                { name: 'downloads' },
                { $inc: { count: 1 } },
                { new: true, upsert: true }
            );
            return res.status(200).json({ count: metric.count });
        }

        res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
