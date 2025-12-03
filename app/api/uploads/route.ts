import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large' },
        { status: 400 }
      );
    }

    const fileUrl = `https://example.com/uploads/${Date.now()}-${file.name}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}