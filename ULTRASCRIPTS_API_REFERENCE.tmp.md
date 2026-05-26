# Temporary Ultrascripts API reference

This file is a working reference for the docs/example cleanup pass. It mirrors the shipped BetterDungeon implementation and should be removed or replaced with a real maintained reference after the examples are aligned.

## Protocol cards

- Heartbeat card: `ultrascripts:heartbeat`
- Request card: `ultrascripts:out`
- Response cards: `ultrascripts:in:<moduleId>`
- State cards: `ultrascripts:state:<name>`

Request envelope:

```json
{
  "v": 1,
  "requests": [
    {
      "id": "unique-request-id",
      "module": "clock",
      "op": "now",
      "args": {},
      "ts": 1737042131428
    }
  ],
  "acks": ["unique-request-id"]
}
```

Response envelope:

```json
{
  "v": 1,
  "responses": {
    "unique-request-id": {
      "status": "ok",
      "data": {},
      "completedAt": 1737042131500,
      "completedLiveCount": 12
    }
  }
}
```

Terminal response statuses are `ok`, `err`, and `timeout`. Pending responses use `status: "pending"`.

## Modules and ops

### `sdk`

- `version({})` returns `{ sdkVersion, betterDungeonVersion, ultrascriptsProtocol, ultrascriptsClient }`
- `config({})` returns feature/module preferences and BetterDungeon config:
  - `features.ultrascripts`
  - `ultrascripts.enabled`
  - `ultrascripts.runtimeEnabled`
  - `ultrascripts.modulePreferences.<moduleId>`
  - `ultrascripts.scriptureDisplay`
  - `ultrascripts.webfetch`
  - `ultrascripts.ai.configured`
  - `ultrascripts.ai.defaultModel`
  - `ultrascripts.ai.costControls`

### `clock`

- `now({ timeZone?, tz?, ts? })`
- `tz({ timeZone?, tz?, ts? })`
- `format({ ts?, timeZone?, tz?, format })`

`now` and `tz` return `{ ts, iso, timeZone, offsetMinutes, offset, offsetCompact, local, date, time, systemTimeZone }`. `tz` also returns `requestedTimeZone`.

`format` returns a string. Supported pattern tokens include `YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`, `A`, `a`, `Z`, and `ZZ`.

### `webfetch`

- `fetch({ url, method?, headers?, timeoutMs?, maxBodyBytes? })`
- `search({ query, maxResults?, timeoutMs?, maxBodyBytes? })`

`fetch` supports only `GET`, `HEAD`, and `OPTIONS`. It returns the background fetch payload plus `request: { url, origin, method, strippedHeaders }`.

### `weather`

- `current({ latitude, longitude, units?, timeoutMs? })`
- `current({ place, units?, timeoutMs? })`
- `forecast({ latitude, longitude, units?, days?, timeoutMs? })`
- `forecast({ place, units?, days?, timeoutMs? })`

Use `latitude`/`longitude`, not `lat`/`lon`. `units` is `metric` or `imperial`.

`current` returns `{ location, units, source, current }`, with `current.weatherCode`, `current.weather`, `current.temperature`, `current.apparentTemperature`, `current.relativeHumidity`, `current.windSpeed`, `current.windDirection`, `current.isDay`, and `current.observedAt`.

`forecast` returns `{ location, units, source, days }`, where each day has `date`, `weatherCode`, `weather`, `temperatureMax`, `temperatureMin`, `precipitationSum`, `precipitationProbabilityMax`, `windSpeedMax`, `sunrise`, and `sunset`.

### `network`

- `status({})`

Returns `{ online, quality, checkedAt, checkedAtIso, connectionSupported, effectiveType, type, downlinkMbps, downlinkMaxMbps, rttMs, saveData }`.

### `system`

- `info({})`
- `power({})`

`info` returns `{ checkedAt, checkedAtIso, deviceClass, platform, browser, locale, screen, hardware, preferences, extension }`.

`deviceClass` is `desktop`, `tablet`, `mobile`, or `unknown`.

`power` returns `{ supported: false }` when unavailable, or `{ supported: true, charging, state, level, levelPercent, chargingTimeSec, dischargingTimeSec }`.

### `geolocation`

- `permission({})`
- `getCurrent({ highAccuracy?, timeoutMs?, maximumAgeMs? })`

`permission` returns `{ supported, permissionState }`.

`getCurrent` returns `{ latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed, timestamp, iso, permissionState }`.

### `ai`

- `chat({ provider?, model?, messages, temperature?, maxTokens?, responseFormat?, stop?, timeoutMs? })`
- `models({ provider?, query?, limit?, timeoutMs? })`
- `testConnection({ provider?, timeoutMs? })`

Use camelCase keys: `maxTokens` and `responseFormat`. Do not use `max_tokens`, `response_format`, or `top_p`.

`responseFormat.type` may be `text`, `json_object`, or `json_schema`.

### `scripture`

Scripture is state-card driven. Write `ultrascripts:state:scripture` with:

```json
{
  "v": 1,
  "manifest": {
    "widgets": [
      { "id": "hp", "type": "bar", "label": "Health", "max": 100 }
    ]
  },
  "history": {
    "12": {
      "hp": 75
    }
  },
  "interactions": {
    "ackSeq": 0
  }
}
```

Allowed widget types are `stat`, `bar`, `text`, `panel`, `custom`, `badge`, `list`, `icon`, `counter`, `button`, `toggle`, `select`, `slider`, `input`, `textarea`, `progress`, `taggroup`, `divider`, `radio`, `stepper`, `confirm`, `chipselect`, `accordion`, `tabs`, `dropdown`, and `sortable`.

Interactive widget events are written by BetterDungeon to `ultrascripts:in:scripture` under `widgetEvents.events`. Acknowledge handled events by writing the highest handled sequence number to `ultrascripts:state:scripture.interactions.ackSeq`.
