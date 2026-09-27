import { NextResponse } from 'next/server';
import { getDatabase, addPartnerInquiry, updatePartnerInquiryStatus } from '@/lib/store';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db.partnerInquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName,
      organizationType,
      country,
      contactPerson,
      position,
      email,
      phone,
      sectorNeeded,
      candidateCountNeeded,
      targetArrivalPeriod,
      message
    } = body;

    if (!companyName || !contactPerson || !email) {
      return NextResponse.json({ error: 'Data inkuiri belum lengkap' }, { status: 400 });
    }

    const newInquiry = addPartnerInquiry({
      companyName,
      organizationType: organizationType || '監理団体 (Supervising Org)',
      country: country || '日本 (Japan)',
      contactPerson,
      position: position || '',
      email,
      phone: phone || '',
      sectorNeeded: sectorNeeded || '介護 (Caregiver)',
      candidateCountNeeded: Number(candidateCountNeeded) || 5,
      targetArrivalPeriod: targetArrivalPeriod || '',
      message: message || '',
      status: 'baru'
    });

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengirim inkuiri' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID dan status wajib disertakan' }, { status: 400 });
    }

    const updated = updatePartnerInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Data inkuiri tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memperbarui status' }, { status: 500 });
  }
}
