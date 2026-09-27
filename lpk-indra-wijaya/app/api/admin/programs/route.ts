import { NextResponse } from 'next/server';
import { getDatabase, saveProgram, deleteProgram } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.programs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = saveProgram(body);
    return NextResponse.json({ success: true, program: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan program' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const deleted = deleteProgram(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Program tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus program' }, { status: 500 });
  }
}
