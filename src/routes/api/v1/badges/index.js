import { indexBadge } from "../../../../controllers/index.js";

import { Router } from "express";
const badgeRoutes = Router();

badgeRoutes.get("/:username", indexBadge);

export { badgeRoutes };
