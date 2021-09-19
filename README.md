BOT para ejecutar compras recurrentes en el exchange orionx


### ToDo
- [x] Config json file
- [x] CRON scheduler
- [x] OrionX SDK
- [ ] Command-line options
- [ ] Binance SDK

## Como usar:
Idealmente configurando transferencias automaticas a orionx y seteando el bot para que haga compras cada x tiempo de algun monto y monedas especificos. p

Para configurarlo debemos seguir los siguientes pasos:

- Generar **apiKey** en https://app.orionx.com/developers/keys con permisos de **trade y stats**.
- Configurar **config.json** con la informacion del exchange y de inversion.

Luego para correr el bot en el terminal puedes simplemente ejecutar:  
```
  npm start
```


Pero se recomienda dejar corriendo en pm2 o similar
```
npm install pm2@latest -g
```

Generar build
```
npm run build
```
Correr  en pm2
```
pm2 run dist/src/app.ts --name dca-bot
```





#### Config.json example

```json

{
  "app_name": "orionx_dca",
  "log_level": "debug",
  "date_format": "DD-MM-YYYY HH:mm:ss",
  "exchanges": [...],
  "investments": [...]
}
```
#### Exchange example

```json
{
  "name": "orionx-1",
  "type": "ORIONX",
  "apiKey": "-----",
  "secretKey": "------",
  "apiUri": "https://api2.orionx.com/graphql"
}
```
#### Investment example

```json
{
  "name": "daily-xrp",
  "exchange": "orionx-1",  // exchange name
  "cron": "0 0 10 * * *",
  "market": "ETHCLP",
  "amount": 10000
}
```

La configuración anterior va a realizar compras de 10000clp de Ethereum todos los dias a las 10am.
