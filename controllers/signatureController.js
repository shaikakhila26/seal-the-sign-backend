import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, } from 'pdf-lib';
import { fileURLToPath } from 'url';
import DocumentModel from '../models/Document.js';
import SignatureModel from '../models/Signature.js';
import { createRequire } from 'module';


const require = createRequire(import.meta.url);
const fontkit = require('@pdf-lib/fontkit');




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add this function in your signatureController.js:
/*
function transformCoordinates(browserX, browserY, pageWidth, pageHeight) {
  // PDF-lib uses bottom-left origin, browser usually top-left
  const pdfX =  browserX;
  const pdfY =  pageHeight - browserY;
  return { pdfX, pdfY };
}  
*/
/*
function transformCoordinates(browserX, browserY, pageWidth, pageHeight) {
  // Clamp to avoid negative positions
  const clampedX = Math.max(0, browserX);
  const clampedY = Math.max(0, browserY);

  //const pdfX = Math.min(pageWidth,clampedX);
  //const pdfY = Math.max(0,pageHeight - clampedY-24);

 /* console.log('Coordinate transform debug:', {
    signatureX: browserX,
    signatureY: browserY,
    clampedX,
    clampedY,
    pageWidth,
    pageHeight,
    pdfX,
    pdfY
  });  */
/*
  return {
    pdfX: clampedX,
    pdfY: pageHeight - clampedY - 24 // shift down for font size height
  };
}  */



export const applySignature = async (req, res) => {
    console.log('👉 applySignature called');
  try {
    
    const { documentId } = req.params;

    const document = await DocumentModel.findById(documentId);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    const signature = await SignatureModel.findOne({ documentId });
    console.log('📄 Signature fetched from DB:', signature);
    if (!signature) return res.status(404).json({ message: 'Signature not found' });

const filePath = path.join(__dirname, '..', document.filePath);
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

pdfDoc.registerFontkit(fontkit);

const fontMap = {
  'Pacifico': 'Pacifico-Regular.ttf',
  'Anton': 'Anton-Regular.ttf',
  'Caveat': 'Caveat-VariableFont_wght.ttf',
  'Comfortaa': 'Comfortaa-VariableFont_wght.ttf',
  'Dancing Script': 'DancingScript-VariableFont_wght.ttf',
  'Fira Sans': 'FiraSans-Regular.ttf',
  'Great Vibes': 'GreatVibes-Regular.ttf',
  'Indie Flower': 'IndieFlower-Regular.ttf',
  'Kalam': 'Kalam-Regular.ttf',
  'Lora': 'Lora-VariableFont_wght.ttf',
  'Nunito': 'Nunito-VariableFont_wght.ttf',
  'Orbitron': 'Orbitron-VariableFont_wght.ttf',
  'Playfair Display': 'PlayfairDisplay-VariableFont_wght.ttf',
  'Quicksand': 'Quicksand-VariableFont_wght.ttf',
  'Raleway': 'Raleway-VariableFont_wght.ttf',
  'Roboto': 'Roboto-VariableFont_wdth,wght.ttf',
  'Shadows Into Light': 'ShadowsIntoLight-Regular.ttf',
  'Signika': 'Signika-VariableFont_GRAD,wght.ttf',
  'Ubuntu': 'Ubuntu-Regular.ttf',
  'Zeyada': 'Zeyada-Regular.ttf',
};



const fontFile = fontMap[signature.font] || 'Roboto-VariableFont_wdth,wght.ttf'; // fallback
const fontPath = path.join(__dirname, '..', 'fonts', fontFile);
const fontBytes = fs.readFileSync(fontPath);
const customFont = await pdfDoc.embedFont(fontBytes, { subset: false });

    
    
    const pageIndex = Math.max(0, (signature.page || 1) - 1);
    const pages = pdfDoc.getPages();
    const page = pages[pageIndex];



    
    /* const height = page.getHeight();
    const width = page.getWidth();

    const safeX = Math.max(0, signature.x);
    const safeY = Math.max(0, signature.y);

    const finalY = height - safeY - 24; // 24 is font size adjustment
*/

 //Then, inside applySignature:

const width = page.getWidth();
const height = page.getHeight();

// Convert browser top-left to PDF bottom-left coordinate system
   // const pdfX = Math.max(0, signature.x);
 //  const pdfY = Math.max(0, signature.y ); // 24 = font size offset

//const { pdfX, pdfY } = transformCoordinates(signature.x, signature.y, width, height);

const fontSize  = signature.fontSize || 24;
console.log('🔎 Coordinate transform debug:', {
  signatureX: signature.x,
  signatureY: signature.y,
  pageWidth: width,
  pageHeight: height,

  
});

if (signature.x == null || signature.y == null) {
  console.error('❌ Signature coordinates missing:', signature);
  return res.status(400).json({ error: 'Invalid signature coordinates' });
}

console.log('✅ Backend signature.x:', signature.x, 'signature.y:', signature.y);
if (signature.x == null || signature.y == null) {
  return res.status(400).json({ error: 'Signature coordinates missing' });
}

// Clamp values inside page
   // const finalX = Math.max(0, Math.min(width, signature.x));
  //  const finalY = Math.max(0, Math.min(height, signature.y));

  const safeX = Math.max(0, signature.x);
const safeY = Math.max(0, signature.y);

const textWidth = customFont.widthOfTextAtSize(signature.name, fontSize);
const centeredX = safeX - textWidth / 2;




// ⬇️ Compute text width based on selected font and size


// ⬇️ Center horizontally and adjust Y slightly for visual match
//const centeredX = signature.x - textWidth / 2;
//const adjustedY = signature.y - fontSize * 0.3; // Shift down for baseline alignment
  console.log('🖊️ Applying signature with fontSize:',  fontSize);

console.log('🧾 Drawing signature:', {
  name: signature.name,
  x: signature.x,
  y: signature.y,
  fontSize,
  font: signature.font,
});




  page.drawText(signature.name, {
    x: centeredX   ,
    y: safeY   ,
    size: fontSize,
    font:customFont,
    color: rgb(0, 0, 0),
  });
  console.log('📏 typeof fontSize:', typeof fontSize);

/*
const signedDir = path.join(__dirname, '..', 'uploads', 'signed');
fs.readdir(signedDir, (err, files) => {
  if (err) {
    console.error('Error reading signed directory:', err);
    return;
  }
  files.forEach(file => {
    fs.unlink(path.join(signedDir, file), err => {
      if (err) console.error('Error deleting file:', err);
      else console.log('Deleted:', filePath);
    });
  });
});


// console.log('📐 Page size:', { width, height });


    const signedPdfBytes = await pdfDoc.save();


    const signedFileName = `signed_${document.fileName}`;
    const signedPath = path.join(__dirname, '..', 'uploads', 'signed', signedFileName);
   // fs.writeFileSync(signedPath, signedPdfBytes);
   try {
  await fs.promises.unlink(signedPath);
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

await fs.promises.writeFile(signedPath, signedPdfBytes);
res.json({ 
      url: `/uploads/signed/${signedFileName}`,
      fileName: signedFileName,
});

  } catch (err) {
    console.error('❌ applysignature Error:', err);
    res.status(500).json({ error: 'Failed to apply signature to PDF' });
    // console.log('📄 Signature applied:', signature);
    // console.log('✅ PDF saved at:', signedPath);

  }
}; 
*/

const signedDir = path.join(__dirname, '..', 'uploads', 'signed');
    await fs.promises.mkdir(signedDir, { recursive: true });

   /*const files = await fs.promises.readdir(signedDir);
    for (const file of files) {
      await fs.promises.unlink(path.join(signedDir, file));
    }*/

    const signedPdfBytes = await pdfDoc.save();
    const signedFileName = `signed_${document.fileName}`;
    const signedPath = path.join(signedDir, signedFileName);
await fs.promises.unlink(signedPath).catch(() => {});
    await fs.promises.writeFile(signedPath, signedPdfBytes);

    res.json({
      url: `/uploads/signed/${signedFileName}`,
      fileName: signedFileName
    });
  } catch (err) {
    console.error('❌ applySignature Error:', err);
    res.status(500).json({ error: 'Failed to apply signature to PDF' });
  }
}; 
  




// ✅ Backend: applySignature (req.body values used)
/*export const applySignature = async (req, res) => {
    console.log('applySignature route hit'); // <-- add this at the very top
    const { x, y, page, name, font } = req.body;
    try{
        console.log('inside try block');
  const { documentId } = req.params;

  const document = await DocumentModel.findById(documentId);
  const pdfPath = path.join(__dirname, '..', document.filePath);
  const pdfBytes = fs.readFileSync(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontPath = path.join(__dirname, '..', 'fonts', `${font}.ttf`);
  const fontBytes = fs.readFileSync(fontPath);
  const customFont = await pdfDoc.embedFont(fontBytes);

  const pageIndex = Math.max(0, (page || 1) - 1);
  const pdfPage = pdfDoc.getPages()[pageIndex];

  const height = pdfPage.getHeight();
  const pdfX = x;
  const pdfY = height - y - 24;

  pdfPage.drawText(name, { x: pdfX, y: pdfY, size: 24, font: customFont, color: rgb(0, 0, 0) });

  const signedDir = path.join(__dirname, '..', 'uploads', 'signed');
  await fs.promises.mkdir(signedDir, { recursive: true });
  const signedFileName = `signed_${document.fileName}`;
  const signedPath = path.join(signedDir, signedFileName);

  const signedPdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(signedPath, signedPdfBytes);

  res.json({ url: `/uploads/signed/${signedFileName}`, fileName: signedFileName });
    }
    catch (err) {
    console.error('❌ applySignature Error:', err);
    res.status(500).json({ error: 'Failed to apply signature to PDF' });
  }
};
*/