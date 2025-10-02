export default async function handler(req, res) {
  const { guild } = req.query;
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!guild) {
    return res.status(400).json({ error: "Missing guild ID (use ?guild=SERVER_ID)" });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guild}?with_counts=true`,
      { headers: { Authorization: `Bot ${BOT_TOKEN}` } }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch guild info" });
    }

    const data = await response.json();
    res.status(200).json({
      id: data.id,
      name: data.name,
      memberCount: data.approximate_member_count,
      presenceCount: data.approximate_presence_count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
