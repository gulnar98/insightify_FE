// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getDatabase} from '../../lib/mongodb';


export default async function handler(req, res) {
  const db = getDatabase();
  res.status(200).json({ name: 'John Doe' })
}
