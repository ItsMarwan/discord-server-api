const BADGE_FLAGS = {
  1: "STAFF",
  2: "PARTNER",
  4: "HYPESQUAD_EVENTS",
  8: "BUG_HUNTER_LEVEL_1",
  64: "HYPESQUAD_BRAVERY",
  128: "HYPESQUAD_BRILLIANCE",
  256: "HYPESQUAD_BALANCE",
  512: "EARLY_SUPPORTER",
  1024: "TEAM_USER",
  4096: "SYSTEM",
  16384: "BUG_HUNTER_LEVEL_2",
  65536: "VERIFIED_BOT",
  131072: "EARLY_VERIFIED_BOT_DEVELOPER",
  262144: "DISCORD_CERTIFIED_MODERATOR",
  524288: "BOT_HTTP_INTERACTIONS",
  4194304: "ACTIVE_DEVELOPER"
};

function parseBadges(flags, memberData = null) {
  const result = [];

  for (const [bit, name] of Object.entries(BADGE_FLAGS)) {
    const bitInt = Number(bit);
    if ((flags & bitInt) === bitInt) {
      if (name === "BUG_HUNTER_LEVEL_1" && (flags & 16384)) {
        result.push("BUG_HUNTER_LEVEL_2");
      } else {
        result.push(name);
      }
    }
  }

  if (memberData?.premium_since) {
    result.push(`BOOSTER since ${new Date(memberData.premium_since).toISOString()}`);
  }

  return result;
}

function getCreationDate(id) {
  if (!id) return null;
  const DISCORD_EPOCH = 1420070400000n;
  const timestamp = Number((BigInt(id) >> 22n) + DISCORD_EPOCH);
  return new Date(timestamp).toISOString();
}

export default async function handler(req, res) {
  const { guild, user } = req.query;
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!user) {
    return res.status(400).json({ error: "Missing user ID (?user=...)" });
  }

  try {
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

    let memberData = null;
    if (guild) {
      const memberRes = await fetch(
        `https://discord.com/api/v10/guilds/${guild}/members/${user}`,
        { headers: { Authorization: `Bot ${BOT_TOKEN}` } }
      );
      if (memberRes.ok) {
        memberData = await memberRes.json();
      }
    }

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
    const badges = parseBadges(flags, memberData);

    res.status(200).json({
      id: userData.id,
      tag: userData.username,
      username: userData.username,
      bot: userData.bot || false,
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
      createdAt: getCreationDate(userData.id),
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
