const BADGE_FLAGS = {
  1 << 0:  "STAFF",
  1 << 1:  "PARTNER",
  1 << 2:  "HYPESQUAD_EVENTS",
  1 << 3:  "BUG_HUNTER_LEVEL_1",
  1 << 6:  "HYPESQUAD_BRAVERY",
  1 << 7:  "HYPESQUAD_BRILLIANCE",
  1 << 8:  "HYPESQUAD_BALANCE",
  1 << 9:  "EARLY_SUPPORTER",
  1 << 10: "TEAM_USER",
  1 << 12: "SYSTEM",
  1 << 14: "BUG_HUNTER_LEVEL_2",
  1 << 16: "VERIFIED_BOT",
  1 << 17: "EARLY_VERIFIED_BOT_DEVELOPER",
  1 << 18: "DISCORD_CERTIFIED_MODERATOR",
  1 << 19: "BOT_HTTP_INTERACTIONS",
  1 << 22: "ACTIVE_DEVELOPER",
};

function parseBadges(flags) {
  const result = [];
  for (const [bit, name] of Object.entries(BADGE_FLAGS)) {
    const bitInt = Number(bit);
    if ((flags & bitInt) === bitInt) {
      result.push(name);
    }
  }
  return result;
}

export default async function handler(req, res) {
  const { guild, user } = req.query;
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!guild || !user) {
    return res.status(400).json({ error: "Missing guild or user ID (?guild=...&user=...)" });
  }

  try {
    const memberRes = await fetch(
      `https://discord.com/api/v10/guilds/${guild}/members/${user}`,
      { headers: { Authorization: `Bot ${BOT_TOKEN}` } }
    );
    if (!memberRes.ok) {
      const text = await memberRes.text();
      return res
        .status(memberRes.status)
        .json({ error: "User not in guild or cannot access member", details: text });
    }

    const userRes = await fetch(
      `https://discord.com/api/v10/users/${user}`,
      { headers: { Authorization: `Bot ${BOT_TOKEN}` } }
    );
    if (!userRes.ok) {
      const text = await userRes.text();
      return res
        .status(userRes.status)
        .json({ error: "Cannot fetch user info", details: text });
    }

    const userData = await userRes.json();

    const avatarId = userData.avatar;
    const isAvatarAnimated = avatarId && avatarId.startsWith("a_");
    const avatarUrl = avatarId
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${avatarId}${isAvatarAnimated ? ".gif" : ".png"}`
      : null;

    const bannerId = userData.banner;
    const isBannerAnimated = bannerId && bannerId.startsWith("a_");
    const bannerUrl = bannerId
      ? `https://cdn.discordapp.com/banners/${userData.id}/${bannerId}${isBannerAnimated ? ".gif" : ".png"}`
      : null;

    const flags = userData.public_flags || 0;
    const badges = parseBadges(flags);

    const tag = `${userData.username}#${userData.discriminator}`;

    res.status(200).json({
      id: userData.id,
      tag,
      badges,
      avatar: {
        id: avatarId,
        link: avatarUrl,
        is_animated: Boolean(isAvatarAnimated),
      },
      banner: {
        id: bannerId,
        link: bannerUrl,
        is_animated: Boolean(isBannerAnimated),
        color: userData.accent_color ?? null,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
