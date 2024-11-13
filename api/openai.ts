import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const SUPPORTED_LANGUAGES = [
  "af", // Afrikaans
  "ar", // Arabic
  "hy", // Armenian
  "az", // Azerbaijani
  "be", // Belarusian
  "bs", // Bosnian
  "bg", // Bulgarian
  "ca", // Catalan
  "zh", // Chinese (Mandarin)
  "hr", // Croatian
  "cs", // Czech
  "da", // Danish
  "nl", // Dutch
  "en", // English
  "et", // Estonian
  "fi", // Finnish
  "fr", // French
  "gl", // Galician
  "de", // German
  "el", // Greek
  "he", // Hebrew
  "hi", // Hindi
  "hu", // Hungarian
  "is", // Icelandic
  "id", // Indonesian
  "it", // Italian
  "ja", // Japanese
  "kn", // Kannada
  "kk", // Kazakh
  "ko", // Korean
  "lv", // Latvian
  "lt", // Lithuanian
  "mk", // Macedonian
  "ms", // Malay
  "mr", // Marathi
  "mi", // Māori
  "ne", // Nepali
  "nb", // Norwegian Bokmål
  "fa", // Persian
  "pl", // Polish
  "pt", // Portuguese
  "ro", // Romanian
  "ru", // Russian
  "sr", // Serbian
  "sk", // Slovak
  "sl", // Slovenian
  "es", // Spanish
  "sw", // Swahili
  "sv", // Swedish
  "tl", // Filipino (Tagalog)
  "ta", // Tamil
  "th", // Thai
  "tr", // Turkish
  "uk", // Ukrainian
  "ur", // Urdu
  "vi", // Vietnamese
  "cy", // Welsh
] as const;

export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
