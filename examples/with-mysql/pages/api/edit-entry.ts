import Filter from 'bad-words'
import { query, db } from "../../lib/db";

const filter = new Filter()

export default async (req, res) => {
  const { id, title, content } = req.body;
  try {
    if (!id || !title || !content) {
      return res
        .status(400)
        .json({ message: "`id`,`title`, and `content` are all required" });
    }

    const results = await query(
      `
      UPDATE entries 
      SET title = ?, content = ?
      WHERE id = ?
      `,
      [filter.clean(title), filter.clean(content), id]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  res.end("hi");
};
