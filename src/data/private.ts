/**
 * Passcode-protected case studies.
 *
 * Values are SHA-256 hashes of the passcode (never the passcode itself).
 * Set or change one with:   npm run set-passcode -- duolingo <your-passcode>
 *
 * Note: like Framer's page passwords, this is a light gate. The page content
 * still ships in the HTML, so it keeps casual visitors out but isn't secure.
 */
export const PRIVATE_PAGES: Record<string, string> = {
  duolingo: 'e3a2cbd99862454e91d997695fb83371cde55f242702d37984315b08a683d1d3', // not set yet: run the command above
};
