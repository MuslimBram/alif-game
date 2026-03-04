import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const PROMPTS = {
  shqip: {
    fillestar: `Generate exactly 500 Albanian words for beginner level. These should be common everyday words.
Return a JSON array of objects with these fields:
- word: the word in uppercase with syllable hyphens (e.g. "BU-KË")
- meaning: the plain word in lowercase (e.g. "bukë")
- translation: English translation
- emoji: a relevant emoji
- missing: one letter or digraph that will be blanked out for quiz (e.g. "B")
- category: category like "kafshë", "ushqim", "ngjyra", "familje", "natyra", "veprime", "trup", "veshje", "shtëpia", "shkolla"

Return ONLY the JSON array, no other text.`,
    mesatar: `Generate exactly 2000 Albanian words for intermediate level. Mix of common and educational words.
Return a JSON array of objects with fields: word (uppercase with hyphens), meaning (lowercase), translation (English), emoji, missing (letter for quiz), category.
Return ONLY the JSON array.`,
    avancuar: `Generate exactly 500 advanced Albanian words - academic, professional vocabulary.
Return a JSON array: word, meaning, translation (English), emoji, missing, category. ONLY JSON array.`,
    profesionist: `Generate exactly 200 professional/academic Albanian words - philosophy, science, law, theology.
Return a JSON array: word, meaning, translation (English), emoji, missing, category. ONLY JSON array.`
  },
  anglisht: {
    fillestar: `Generate exactly 500 English beginner words. Common everyday vocabulary.
Return a JSON array: word (uppercase), meaning (same word lowercase), translation (Albanian), emoji, missing (letter for quiz), category. ONLY JSON array.`,
    mesatar: `Generate exactly 2000 English intermediate words. Mix everyday and educational vocabulary.
Return a JSON array: word (uppercase), meaning (lowercase), translation (Albanian), emoji, missing, category. ONLY JSON array.`,
    avancuar: `Generate exactly 500 advanced English words - academic and professional.
Return a JSON array: word (uppercase), meaning (lowercase), translation (Albanian), emoji, missing, category. ONLY JSON array.`,
    profesionist: `Generate exactly 200 professional English words - philosophy, science, law, medicine.
Return a JSON array: word (uppercase), meaning (lowercase), translation (Albanian), emoji, missing, category. ONLY JSON array.`
  },
  arabisht: {
    fillestar: `Generate exactly 500 Arabic beginner words. Common everyday vocabulary.
Return a JSON array with fields:
- word: Arabic word (e.g. "بَيْت")
- meaning: Arabic word without diacritics (e.g. "بيت")  
- translation: Albanian and English translation (e.g. "shtëpi / house")
- emoji: relevant emoji
- missing: one Arabic letter for quiz (e.g. "ب")
- transliteration: romanized transliteration (e.g. "bayt")
- category: category in Albanian

Return ONLY the JSON array.`,
    mesatar: `Generate exactly 2000 Arabic intermediate words. Educational and everyday vocabulary.
Return a JSON array: word (with diacritics), meaning (without diacritics), translation (Albanian/English), emoji, missing (Arabic letter), transliteration, category. ONLY JSON array.`,
    avancuar: `Generate exactly 500 advanced Arabic words - religious, academic, political.
Return a JSON array: word, meaning, translation (Albanian/English), emoji, missing, transliteration, category. ONLY JSON array.`,
    profesionist: `Generate exactly 200 professional Arabic words - Islamic jurisprudence, philosophy, classical Arabic.
Return a JSON array: word, meaning, translation (Albanian/English), emoji, missing, transliteration, category. ONLY JSON array.`
  }
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { language, level, batchSize = 100 } = await req.json();

    if (!PROMPTS[language]?.[level]) {
      return Response.json({ error: 'Invalid language/level' }, { status: 400 });
    }

    const prompt = PROMPTS[language][level];
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          words: {
            type: "array",
            items: {
              type: "object",
              properties: {
                word: { type: "string" },
                meaning: { type: "string" },
                translation: { type: "string" },
                emoji: { type: "string" },
                missing: { type: "string" },
                transliteration: { type: "string" },
                category: { type: "string" }
              }
            }
          }
        }
      }
    });

    const words = result?.words || [];
    
    // Add language and level to each word
    const enriched = words.map(w => ({
      ...w,
      language,
      level,
      missing: w.missing || w.word?.[0] || "A"
    }));

    // Bulk insert in batches
    let inserted = 0;
    for (let i = 0; i < enriched.length; i += batchSize) {
      const batch = enriched.slice(i, i + batchSize);
      await base44.asServiceRole.entities.Word.bulkCreate(batch);
      inserted += batch.length;
    }

    return Response.json({ 
      success: true, 
      inserted,
      total: enriched.length,
      language,
      level
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});