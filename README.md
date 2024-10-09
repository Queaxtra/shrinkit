![Banner](https://www.upload.ee/image/17219970/Yeni_Proje.png)

# Shrinkit
Shrinkit is a fast, secure and user-friendly image compression application. Users can upload an unlimited number of files, reduce the size of those files and download the compressed image when the process is complete.

## Features
- Unlimited file uploads
- No registration required
- Automatic compression of file size
- Automatic deletion of uploaded files
- Support for common image formats such as JPEG, PNG, GIF

## Installation

#### Requirements
- Node.js
- SvelteKit
- Sharp
- File-Type
- Stream
- Path

#### Start
1. **Go to Project Folder**
   ```bash
   cd shrinkit
   ```
2. **Install Required Packages**
   ```bash
   npm install
   ```
3. **Start Server**
   ```bash
   npm run dev
   ```
4. Open in your browser Go to `http://localhost:5173` in your browser.

## Usage
1. **File Upload:** Upload by clicking the “Choose File” button on the application interface or by dragging and dropping your file.
2. **Compress:** Once the file is uploaded, the application automatically starts the compression process.
3. **View Results:** The compressed image and file sizes will be displayed in the application interface.
4. **Download:** Click the “Download Compressed Image” button to download the compressed image.

## API
`/api/upload`
This API is used to load and compress image files.
- Method: `POST`
- Parameters
   - `file`: Image file to upload.

## Contribution
If you would like to contribute, please send a pull request or send your suggestions!

## License
This project is licensed by `MIT`.

