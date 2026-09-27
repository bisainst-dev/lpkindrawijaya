import { NextRequest, NextResponse } from 'next/server';
import { translateText, translateList } from '@/lib/translator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Case 1: Batch bundle of fields (e.g. { title: '...', description: '...', requirements: ['...'] })
    if (body.fields && typeof body.fields === 'object') {
      const jaResults: Record<string, any> = {};
      const enResults: Record<string, any> = {};

      const entries = Object.entries(body.fields);
      await Promise.all(
        entries.map(async ([key, val]) => {
          if (typeof val === 'string' && val.trim()) {
            const { ja, en } = await translateText(val);
            jaResults[key] = ja;
            enResults[key] = en;
          } else if (Array.isArray(val) && val.length > 0) {
            const { ja, en } = await translateList(val);
            jaResults[key] = ja;
            enResults[key] = en;
          } else {
            jaResults[key] = val;
            enResults[key] = val;
          }
        })
      );

      return NextResponse.json({
        success: true,
        translations: {
          ja: jaResults,
          en: enResults
        }
      });
    }

    // Case 2: Array of strings
    if (body.list && Array.isArray(body.list)) {
      const { ja, en } = await translateList(body.list);
      return NextResponse.json({
        success: true,
        ja,
        en
      });
    }

    // Case 3: Single string text
    if (body.text && typeof body.text === 'string') {
      const { ja, en } = await translateText(body.text);
      return NextResponse.json({
        success: true,
        ja,
        en
      });
    }

    return NextResponse.json(
      { success: false, error: 'No text or fields provided' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Translation route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
