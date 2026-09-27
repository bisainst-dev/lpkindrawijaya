import { NextResponse } from 'next/server';
import { getDatabase, saveTestimonial, deleteTestimonial } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = saveTestimonial(body);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan testimoni' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const deleted = deleteTestimonial(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus testimoni' }, { status: 500 });
  }
}
