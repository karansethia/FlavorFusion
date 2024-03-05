import {auth} from 'express-oauth2-jwt-bearer'
import 'dotenv/config'

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL,
    tokenSigningAlg: 'RS256'
});