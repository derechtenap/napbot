# napbot
Mit dem *napbot* können Statistken des Videospiels *Age of Empires II: Definitive Edition* ausgegeben werden. Der Bot greift hierfür auf die API von [aoe2.net](https:/www.aoe2.net) zu und gibt diese in einem beliebigen Discord-Channel aus.
## Befehle
Der Prefix des Bots ist standardmäßig ein Punkt ("**.**"). Mit Hilfe der *config.json* kann dieser allerdings bearbeitet werden. Der Bot reagiert auf die folgenden Befehle:
* .ladder {ladder_id} {name} - Gibt den Platz innerhalb einer Rangliste sowie Statistiken des Spielers aus.
* .top {ladder_id} - Gibt die besten Spieler einer Rangliste aus.
* .server {} - Gibt eine Rangliste, mit allen Spielern des Servers aus.
* .help {} - Zeigt alle Verfügbren Befehle an.
* .version {} - Gibt die Version des Bots aus.
### Parameter: 
* ladder_id - 0,1,2,3,4 **ODER** UNR, DM, TDM, RM und TRM
* name - Gewünschter Spielername
>(UNR = Unranked, DM = Deathmatch, TDM = Team Deathmatch, RM = Random Map und TRM = Team Random Map)
## Voraussetzungen
1. Eigener Bot, mit Token (Token muss in einer *token.json* gespeichert werden)
```json
{
    "id": "<Token>";
}
```
2. [DiscordJS](https://github.com/discordjs) und seine Voraussetzungen (Siehe DiscordJS-ReadMe)
3. [XMLHttpRequest](https://www.npmjs.com/package/xmlhttprequest)
## Autor
* derechtenap
## Aktuelle Version
v0.2.1