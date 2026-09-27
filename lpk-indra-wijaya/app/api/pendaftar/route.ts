import { NextResponse } from 'next/server';
import { getDatabase, addApplicant, updateApplicantStatus, deleteApplicant } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.applicants);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      gender, 
      birthDate, 
      phoneWhatsapp, 
      email, 
      originDistrict, 
      originRegency, 
      lastEducation, 
      heightCm, 
      weightKg, 
      interestedProgram, 
      japaneseLevel, 
      notes 
    } = body;

    if (!fullName || !phoneWhatsapp) {
      return NextResponse.json({ error: 'Nama dan nomor WhatsApp wajib diisi' }, { status: 400 });
    }

    // calculate age
    let age = 22;
    if (birthDate) {
      const birth = new Date(birthDate);
      const diff = Date.now() - birth.getTime();
      age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    const newApplicant = addApplicant({
      fullName,
      gender: gender || 'Laki-laki',
      birthDate: birthDate || '2004-01-01',
      age: age || 22,
      phoneWhatsapp,
      email: email || '',
      originDistrict: originDistrict || 'Indramayu',
      originRegency: originRegency || 'Indramayu',
      lastEducation: lastEducation || 'SMK Sederajat',
      heightCm: Number(heightCm) || 165,
      weightKg: Number(weightKg) || 58,
      interestedProgram: interestedProgram || 'prog-ssw-kaigo',
      japaneseLevel: japaneseLevel || 'Belum Pernah',
      notes: notes || '',
      status: 'baru'
    });

    return NextResponse.json({ success: true, applicant: newApplicant }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan data pendaftaran' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID dan status wajib disertakan' }, { status: 400 });
    }

    const updated = updateApplicantStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: 'Data pendaftar tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID wajib disertakan' }, { status: 400 });
    }

    const deleted = deleteApplicant(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Data pendaftar tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
