const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// ── Cloudinary config ──
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER = 'jsx_viewer';

// ── Middleware ──
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── API: List all files (newest first) ──
app.get('/api/files', async (req, res) => {
  try {
    const files = await prisma.file.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(files);
  } catch (e) {
    console.error('GET /api/files error:', e);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// ── API: Get single file ──
app.get('/api/files/:id', async (req, res) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (e) {
    console.error('GET /api/files/:id error:', e);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
});

// ── API: Upload file(s) ──
app.post('/api/files', upload.array('files', 10), async (req, res) => {
  try {
    const results = [];

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (!['.jsx', '.js', '.tsx', '.ts'].includes(ext)) continue;

      const publicId = FOLDER + '/' + file.originalname;
      const content = file.buffer.toString('utf-8');

      // Upload to Cloudinary (server-side, secure)
      const cloudResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw', public_id: publicId, overwrite: true, invalidate: true },
          (err, result) => err ? reject(err) : resolve(result)
        );
        stream.end(file.buffer);
      });

      // Upsert in DB (replace if same filename)
      const dbFile = await prisma.file.upsert({
        where: { cloudinaryId: publicId },
        update: {
          size: cloudResult.bytes,
          url: cloudResult.secure_url,
          updatedAt: new Date(),
        },
        create: {
          filename: file.originalname,
          title: '',
          description: '',
          size: cloudResult.bytes,
          url: cloudResult.secure_url,
          cloudinaryId: publicId,
        },
      });

      results.push(dbFile);
    }

    res.json(results);
  } catch (e) {
    console.error('POST /api/files error:', e);
    res.status(500).json({ error: 'Upload failed: ' + e.message });
  }
});

// ── API: Update file metadata (title, description) ──
app.patch('/api/files/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;

    const file = await prisma.file.update({ where: { id: req.params.id }, data });
    res.json(file);
  } catch (e) {
    console.error('PATCH /api/files/:id error:', e);
    res.status(500).json({ error: 'Update failed' });
  }
});

// ── API: Delete file ──
app.delete('/api/files/:id', async (req, res) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });
    if (!file) return res.status(404).json({ error: 'File not found' });

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: 'raw' });
    } catch (e) {
      console.warn('Cloudinary delete failed (non-blocking):', e.message);
    }

    // Delete from DB
    await prisma.file.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/files/:id error:', e);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ── API: Fetch file content (proxy to Cloudinary) ──
app.get('/api/files/:id/content', async (req, res) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });
    if (!file) return res.status(404).json({ error: 'File not found' });

    const response = await fetch(file.url);
    if (!response.ok) throw new Error('Cloudinary fetch failed: ' + response.status);
    const content = await response.text();
    res.type('text/plain').send(content);
  } catch (e) {
    console.error('GET /api/files/:id/content error:', e);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// ── SPA fallback ──
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ──
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`JSX Viewer running on port ${PORT}`));
