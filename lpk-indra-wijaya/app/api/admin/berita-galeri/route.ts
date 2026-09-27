import { NextResponse } from 'next/server';
import { getDatabase, saveArticleGallery, deleteArticleGallery } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.articlesAndGallery);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = saveArticleGallery(body);
    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan artikel/galeri' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const deleted = deleteArticleGallery(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Item tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus item' }, { status: 500 });
  }
}
