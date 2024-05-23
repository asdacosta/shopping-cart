import { v4 as uuid } from "uuid";

const ids = Array.from({ length: 4 }, () => uuid());

export { ids };
