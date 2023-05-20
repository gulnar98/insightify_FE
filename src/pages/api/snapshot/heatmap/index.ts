import { getDatabase } from "@/lib/mongodb";

export default async function handle (req, res) {

    try {
        const db = getDatabase();
        const app = await db.collection('snapshots').findOne({
            
        });
    } catch (err) {

    }

    res.json({});
}