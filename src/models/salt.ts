import { randomBytes } from "crypto";

export class Salt {
    saltvalue = randomBytes(16).toString('hex')
}