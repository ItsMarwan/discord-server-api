
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

- Light/dark mode toggle
- No Hosting Needed
- Easy To Use
- Has Discord Bot (REQUIRED FOR GUILD LOOKUP TO WORK)

