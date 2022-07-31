![GitHub package.json version](https://img.shields.io/github/package-json/v/klutzybubbles/nodejs-tools) [![codecov](https://codecov.io/gh/KlutzyBubbles/nodejs-tools/branch/main/graph/badge.svg?token=J39IKAI2GF)](https://codecov.io/gh/KlutzyBubbles/nodejs-tools) ![GitHub](https://img.shields.io/github/license/klutzybubbles/nodejs-tools)

# @klutzybubbles/nodejs-tools
 Collection of tools used for majority of my nodejs projects

## Overview

### Logger

Logger is a simple wrapper around the winston logger that handles
 - Object formatting
 - silly-error log levels
 - Cluster detection for pm2
 - Daily rotating log file

``` typescript
import {
  resetLoggers, // Closes all active loggers
  getAllLoggers, // Lists all active loggers
  getConfig, // Useful for manual winston logger creation
  getLogger,
  getCurrentLogger,
  getForkName
} from '@klutzybubbles/nodejs-tools'

var logger = getCurrentLogger('logger-name')
// Same as
var logger = getLogger(getForkName(cluster.isMaster, process.env.name, process.env.FORK_ID))
```


### Debugger

Debugger is just a level emitter to help seperating logs inside of objects instead of global logger objects

``` typescript
import { Debugger } from '@klutzybubbles/nodejs-tools'

var debuggerObj = new Debugger()
debuggerObj.level = debuggerObj.getLevelFromName('warn')

debuggerObj.on('warn', (obj) => {
  // Do something with it
  console.error(obj)
})

```
