import { NextResponse } from 'next/server';
import { getDatabase, saveJobOrder, deleteJobOrder } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.jobOrders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const saved = saveJobOrder(body);
    return NextResponse.json({ success: true, job: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan data lowongan' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const deleted = deleteJobOrder(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Lowongan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus lowongan' }, { status: 500 });
  }
}
