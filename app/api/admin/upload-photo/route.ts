import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads');
    const galleryDir = path.join(uploadsDir, 'gallery');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
    }

    const contentType = req.headers.get('content-type') || '';
    let photoUrl = '';

    // Handle multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ success: false, error: 'Tidak ada file foto yang diunggah' }, { status: 400 });
      }

      // Check max size (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: 'Ukuran foto maksimal 10MB' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Determine extension
      let ext = path.extname(file.name).toLowerCase() || '.jpg';
      if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) {
        ext = '.jpg';
      }

      const fileName = `galeri-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;
      const filePath = path.join(galleryDir, fileName);
      fs.writeFileSync(filePath, buffer);

      photoUrl = `/uploads/gallery/${fileName}`;
    }
    // Handle Base64 / dataUrl JSON
    else {
      const body = await req.json();
      if (!body.dataUrl) {
        return NextResponse.json({ success: false, error: 'Format data gambar tidak valid' }, { status: 400 });
      }

      const matches = body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ success: false, error: 'Format base64 foto tidak valid' }, { status: 400 });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      let ext = '.jpg';
      if (mimeType.includes('png')) ext = '.png';
      if (mimeType.includes('webp')) ext = '.webp';
      if (mimeType.includes('gif')) ext = '.gif';

      const fileName = `galeri-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;
      const filePath = path.join(galleryDir, fileName);
      fs.writeFileSync(filePath, buffer);

      photoUrl = `/uploads/gallery/${fileName}`;
    }

    return NextResponse.json({
      success: true,
      url: photoUrl,
      message: 'Foto dokumentasi kegiatan berhasil diunggah!'
    });
  } catch (error: any) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mengunggah foto' },
      { status: 500 }
    );
  }
}
