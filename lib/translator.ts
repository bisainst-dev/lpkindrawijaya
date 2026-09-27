// Helper module for automated translation (ID -> JA & EN)
// Uses Google Translate endpoint with fallback and domain dictionary post-processing

const JA_POST_REPLACEMENTS: [RegExp, string][] = [
  [/特殊技能/g, '特定技能'],
  [/特殊食品加工/g, '特定技能・食品製造業'],
  [/特殊介護/g, '特定技能・介護'],
  [/特別介護/g, '特定技能・介護'],
  [/高齢者向け看護師/g, '介護職員'],
  [/老人看護師/g, '介護職員'],
  [/看護師/g, '介護職・看護職'],
  [/実習生/g, '技能実習生'],
  [/研修生/g, '実習生'],
];

export async function translateSingle(text: string, targetLang: 'ja' | 'en'): Promise<string> {
  if (!text || !text.trim()) return '';

  try {
    // If the input already contains Tokutei Ginou, we can pre-normalize to Japanese
    let queryText = text.trim();
    if (targetLang === 'ja') {
      queryText = queryText
        .replace(/tokutei\s*ginou/gi, '特定技能')
        .replace(/ginou\s*jisshuusei/gi, '技能実習生')
        .replace(/ginou\s*jisshuu/gi, '技能実習')
        .replace(/kaigo/gi, '介護')
        .replace(/perawat\s*lansia/gi, '介護職員')
        .replace(/pengolahan\s*makanan/gi, '食品製造業')
        .replace(/pertanian/gi, '農業分野')
        .replace(/konstruksi/gi, '建設分野');
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(queryText)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!res.ok) {
      throw new Error(`Translation failed with status ${res.status}`);
    }

    const data = await res.json();
    let result = '';
    if (Array.isArray(data) && Array.isArray(data[0])) {
      result = data[0].map((item: any) => item[0]).join('');
    }

    // Apply domain replacements for Japanese
    if (targetLang === 'ja' && result) {
      for (const [pattern, replacement] of JA_POST_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
      }
      result = result
        .replace(/ローベナー/g, 'ローベナー')
        .replace(/インドラマユ/g, 'インドラマユ');
    }

    return result.trim() || text;
  } catch (error) {
    console.error(`Translation error to ${targetLang}:`, error);
    return text;
  }
}

export async function translateText(text: string): Promise<{ ja: string; en: string }> {
  if (!text || !text.trim()) return { ja: '', en: '' };

  const [ja, en] = await Promise.all([
    translateSingle(text, 'ja'),
    translateSingle(text, 'en')
  ]);

  return { ja, en };
}

export async function translateList(items: string[]): Promise<{ ja: string[]; en: string[] }> {
  if (!items || items.length === 0) return { ja: [], en: [] };

  const validItems = items.filter(i => i && i.trim().length > 0);
  if (validItems.length === 0) return { ja: [], en: [] };

  const translated = await Promise.all(
    validItems.map(async (item) => {
      const { ja, en } = await translateText(item);
      return { ja, en };
    })
  );

  return {
    ja: translated.map(t => t.ja),
    en: translated.map(t => t.en)
  };
}
