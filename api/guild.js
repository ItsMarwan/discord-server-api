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
      const text = await response.text();
      return res.status(response.status).json({
        error: "Failed to fetch guild info",
        details: text
      });
    }

    const data = await response.json();

    const iconUrl = data.icon
      ? `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=1024`
      : null;
    const bannerUrl = data.banner
      ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.png?size=1024`
      : null;
    const splashUrl = data.splash
      ? `https://cdn.discordapp.com/splashes/${data.id}/${data.splash}.png?size=1024`
      : null;
    const discoverySplashUrl = data.discovery_splash
      ? `https://cdn.discordapp.com/discovery-splashes/${data.id}/${data.discovery_splash}.png?size=1024`
      : null;

    res.status(200).json({
      id: data.id,
      name: data.name,
      description: data.description || null,
      icon: iconUrl,
      banner: bannerUrl,
      splash: splashUrl,
      discoverySplash: discoverySplashUrl,
      vanityURL: data.vanity_url_code || null,
      verificationLevel: data.verification_level,
      explicitContentFilter: data.explicit_content_filter,
      mfaLevel: data.mfa_level,
      nsfwLevel: data.nsfw_level,
      features: data.features || [],
      premiumTier: data.premium_tier,
      premiumSubscriptionCount: data.premium_subscription_count || 0,
      approximateMemberCount: data.approximate_member_count || 0,
      approximatePresenceCount: data.approximate_presence_count || 0,
      ownerId: data.owner_id || null,
      joinedAt: data.joined_at || null,
      afkTimeout: data.afk_timeout,
      maxMembers: data.max_members || null,
      maxPresences: data.max_presences || null,
      preferredLocale: data.preferred_locale,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
