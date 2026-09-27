import { NextResponse } from 'next/server';
import { getDatabase, updateCompanyProfile, updateAdminPassword } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json({
    company: db.company,
    adminUsername: db.adminUser.username
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, newPassword } = body;

    if (company) {
      updateCompanyProfile(company);
    }

    if (newPassword && newPassword.trim().length >= 6) {
      updateAdminPassword(newPassword.trim());
    }

    const updatedDb = getDatabase();
    return NextResponse.json({ 
      success: true, 
      company: updatedDb.company,
      message: 'Pengaturan berhasil diperbarui' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui pengaturan' }, { status: 500 });
  }
}
