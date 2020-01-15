---
title: Portal my thing to some place
date: "2020-01-02T11:45:00"
description: "Portal my thing to some place..."
---

## React portals

Hello, today I will show you how to create helper component for moving appearance of things with `React.createPortal`


`Portal.js`
```javascript
import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, container }) => {
  return createPortal(children, container);
};

export default Portal;

```

`PortalTo.js`
```javascript
import React, { useEffect, useState } from "react";
import Portal from "./Portal";

const PortalTo = props => {
  const [container, setContainer] = useState(null);
  useEffect(() => {
      if(true) {
          setContainer(document.querySelector(props.cls));
      } else {
        setContainer(props.container.current);
      }
  }, [props.container]);
  return (
    <div>
      {container && <Portal container={container}>{props.children}</Portal>}
    </div>
  );
};

export default PortalTo;
```

use it like that

`App.js`
```javascript
<PortalTo cls=".some-class-to-portal-to">
    <span style={{ color: "red" }}>This span will be portaled to different place</span>
</PortalTo>
```

