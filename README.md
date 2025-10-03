
![Logo](https://marwan.is-a.dev/discord-api/imgs/favicon.png)


# Discord-server-api

A Basic **FREE** API For Getting Discord Server Info Using Discord Bot Token Without Needing to Host The Bot! **100% Open Source**\
[Discord Bot](https://discord.com/oauth2/authorize?client_id=1418180497191993354&scope=bot&permissions=65536) **MUST** Be In The Server You Want To Lookup. Otherwise it Will Return An Error:
```
{
  "error": "Failed to fetch guild info",
  "details": "{\"message\": \"Unknown Guild\", \"code\": 10004}"
}
```
# FAQ
Q: Why This Happens?\
A: Because The [Bot](https://discord.com/oauth2/authorize?client_id=1418180497191993354&scope=bot&permissions=65536) **Isn't In The Server**. Therefore It Doesnt See The Server.

Q: Is It Fixable?\
A: No. But Let Me Know If You Find a Way!

Q: Is It Safe?\
A: Yes 100%! Just Make Sure **NEVER** Give Admin Or Any Other Dangerous Permission To The Bot Incase It Gets Compromised

Q: What Does The Bot Do?\
A: The Bot Does Absolutly **Nothing** It Has 0 Lines Of Code

Q: Why Have a Discord Bot?\
A: Becuase If The Bot Isnt In The Server You Want to Lookup It Will Return
```
{
  "error": "Failed to fetch guild info",
  "details": "{\"message\": \"Unknown Guild\", \"code\": 10004}"
}
```

## API Reference

#### Get Server Info

```
  GET /api/discord-server-api-js/guild?guild=GUILD_ID
```

#### Get Server Member Info

```
  GET /api/discord-server-api-js/user?guild=GUILD_ID&user=USER_ID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `guild` | `string` | **Required**. Must be In Both User Lookup and Server Lookup |
| `user` | `string` | **Required**. Must be In User Lookup |

## Links

[Documentation](https://marwan.is-a.dev/discord-server-api) / [Discord Bot](https://discord.com/oauth2/authorize?client_id=1418180497191993354&scope=bot&permissions=65536)


## Features

- No Account Needed
- No API Key Required
- Online 24/7 VIA Vercel
- Light/dark mode toggle
- No Hosting Needed
- Easy To Use
- Has Discord Bot (REQUIRED FOR GUILD LOOKUP TO WORK)

## How To Host
1. Host On Vercel (or any other service if you want):
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fitsmarwan%2Fdiscord-server-api&env=DISCORD_BOT_TOKEN&envDescription=Discord%20bot%20token&envLink=https%3A%2F%2Fdiscord.com%2Fdevelopers%2Fdocs%2Fquick-start%2Fgetting-started&project-name=discord-server-api&repository-name=discord-server-api)

2. Get Discord Bot Token From Developer Portal:
https://discord.com/developers/applications

3. Make an .ENV For The Bot Token:
```DISCORD_BOT_TOKEN``` Which Must Have The Bot Token Or an Error Will Appear
```
{
  "error": "Failed to fetch guild info",
  "details": "{\"message\": \"401: Unauthorized\", \"code\": 0}"
}
```

4. The Website Should Host Itself and Be Online!
