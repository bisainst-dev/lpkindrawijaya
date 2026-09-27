import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDatabase, saveDatabase } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const contentType = req.headers.get('content-type') || '';
    let logoUrl = '';

    // Handle multipart form data
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: 'Tidak ada file yang diunggah' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Determine extension
      let ext = path.extname(file.name).toLowerCase() || '.png';
      if (!['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext)) {
        ext = '.png';
      }

      const fileName = `logo-${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      logoUrl = `/uploads/${fileName}`;
    } 
    // Handle JSON (e.g. dataUrl / base64)
    else {
      const body = await req.json();
      if (!body.dataUrl) {
        return NextResponse.json({ success: false, error: 'Format data tidak valid' }, { status: 400 });
      }

      const matches = body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ success: false, error: 'Base64 data tidak valid' }, { status: 400 });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      let ext = '.png';
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
      if (mimeType.includes('svg')) ext = '.svg';
      if (mimeType.includes('webp')) ext = '.webp';

      const fileName = `logo-${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      logoUrl = `/uploads/${fileName}`;
    }

    // Update database
    const db = getDatabase();
    db.company.logoUrl = logoUrl;
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      logoUrl,
      message: 'Logo berhasil diunggah dan disimpan!'
    });
  } catch (error: any) {
    console.error('Error uploading logo:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengunggah logo' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const db = getDatabase();
    db.company.logoUrl = '';
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Logo telah dihapus, kembali ke logo standar (badge IW).'
    });
  } catch (error: any) {
    console.error('Error deleting logo:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mereset logo' },
      { status: 500 }
    );
  }
}
