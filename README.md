# napbot
Keep track of your *Age of Empires* Stats and share them with your friends on Discord! 
This Bot uses the [aoe2.net API](https://www.aoe2.net) to gather the data.
## Commands
- **.stats {leaderboard} {name}** --
Select your disired leaderboard and player. If the Bot finds more than one player, you can selected which player you want to see.
- **.version** --
Display the current used version in the chat.
### Leaderboards
- Unranked: **unr**
- 1v1 Deathmatch: **dm**
- Team Deathmatch: **tdm**
- 1v1 Random Map: **rm**
- Team Random Map: **trm**
- 1v1 Empire Wars: **emp**
- Team Empire Wars: **tem**
> Example: .stats rm theViper --> To fetch the data of the legendary snake!
## Token
**You need a Discord Bot and a valid token for this Bot**. Create a JSON file and place it into the root folder. You can create and find your Token and Bot at the [Discord Developer Portal](https://discord.com/developers/docs/intro).
```json
{
    "id": "<Token>"
}
```
## Created by
* derechtenap
## Version
0.0.2