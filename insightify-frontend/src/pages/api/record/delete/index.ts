import { getDatabase } from "@/lib/mongodb";

export default async function handle (req, res) {

    try {
        const {ids} = req.body;
        const db = getDatabase();

        await db.collection('records_sessions').deleteMany({
            sessionId: {
                $in: ids
            }
        });

        await db.collection('records').deleteMany({
            sessionId: {
                $in: ids
            }
        });

        res.json({});
    } catch {
        res.status(500).json({});
    }
}