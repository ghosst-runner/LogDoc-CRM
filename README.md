# 🚚 LogiDocs Pro

> A comprehensive web portal for creating, managing, and tracking logistics documents with advanced features including user management, audit logging, Excel import, and real-time analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![React](https://img.shields.io/badge/React-18.0-61dafb.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Demo Accounts](#-demo-accounts)
- [Document Types](#-document-types)
- [Project Structure](#-project-structure)
- [Important Notes](#-important-notes)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login system with role-based access control (RBAC)
- 4 user roles: **Admin**, **Manager**, **Operator**, **Viewer**
- Session management with auto-logout
- Password reset functionality

### 👥 User Management
- Create, edit, and delete users (Admin only)
- Role assignment and permissions
- User blocking/unblocking
- Custom avatars and profile colors
- Comprehensive user activity tracking

### 📄 Document Management
- Create and manage 6 types of logistics documents
- Advanced filtering by status, type, and date
- Full-text search across all documents
- Document editing and deletion
- Auto-generated document numbers
- Status workflow management

### 📥 Excel/CSV Import
- **Drag & Drop** file upload (`.xlsx`, `.xls`, `.csv`)
- Automatic column recognition (Russian & English)
- Data preview before import
- Downloadable template files
- Bulk document creation

### 📊 Advanced Analytics
- Real-time dashboard with KPIs
- Interactive charts and graphs
- Document distribution by type and status
- Summary tables with totals
- Export reports to CSV

### 🔔 Notifications System
- Real-time toast notifications
- Notification center with history
- Badge counters for unread items
- Customizable alerts

### 📋 Audit Logging
- Complete activity log of all system actions
- Filter by event type, user, and date
- Search functionality
- Export audit trail to CSV
- Compliance-ready tracking

### 🗂️ Kanban Board
- Visual drag & drop task management
- Status-based columns
- Quick document status updates
- Intuitive workflow visualization

### 📅 Calendar View
- Documents organized by date
- Delivery deadline tracking
- Monthly/weekly navigation
- Visual status indicators

### 🎨 UI/UX Features
- 🌙 **Dark Mode** toggle
- 📱 Responsive design (mobile-friendly)
- 🎭 Smooth animations and transitions
- 🍞 Toast notifications for user feedback
- ♿ Accessibility considerations

### 🌐 Internationalization
- Primary language: Russian
- English-ready interface elements
- Multi-language document support

---

## 🖼️ Screenshots

### Login Page
<details>
<summary>Click to view</summary>

```
┌─────────────────────────────────────┐
│         🚚 LogiDocs Pro             │
│                                     │
│   [Email Input]                     │
│   [Password Input]                  │
│   [Login Button]                    │
│                                     │
│   Quick Login Demo Accounts ↓       │
└─────────────────────────────────────┘
```
</details>

### Dashboard
<details>
<summary>Click to view</summary>

```
┌─────────────────────────────────────┐
│  📊 Statistics Cards                │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐           │
│  │255│ │ 89│ │127│ │ 39│           │
│  └───┘ └───┘ └───┘ └───┘           │
│                                     │
│  📈 Charts & Recent Documents       │
└─────────────────────────────────────┘
```
</details>

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Babel Standalone** - JSX transformation
- **SheetJS (xlsx)** - Excel file parsing
- **Vanilla CSS** - Styling (no dependencies)

### Data Storage
- **localStorage** - Client-side data persistence
- ⚠️ **Note**: This is a frontend-only solution. For multi-user production use, backend integration is required.

### Deployment Ready
- Single `index.html` file
- No build process required
- Works with any static web server
- Compatible with GitHub Pages, Netlify, Vercel

---

## 🚀 Getting Started

### Option 1: Direct Usage (Recommended)
Simply open `index.html` in any modern web browser or use Live Server:

```bash
# Using Live Server (VS Code extension)
right-click index.html → "Open with Live Server"

# Or just open the file
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Option 2: Using Vite Dev Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Option 3: Deploy to Web Server
Upload `index.html` to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any Apache/Nginx server

---

## 👤 Demo Accounts

The system comes with 4 pre-configured demo accounts:

| Email | Password | Role | Permissions | Status |
|-------|----------|------|-------------|--------|
| `admin@logidocs.ru` | `admin123` | **Administrator** | Full access to all features | ✅ Active |
| `manager@logidocs.ru` | `manager123` | **Manager** | Create, edit, view documents & reports | ✅ Active |
| `operator@logidocs.ru` | `op123` | **Operator** | Create, view documents | ✅ Active |
| `viewer@logidocs.ru` | `view123` | **Viewer** | Read-only access | 🔒 Blocked |

### Role Permissions Matrix

| Feature | Admin | Manager | Operator | Viewer |
|---------|-------|---------|----------|--------|
| View Documents | ✅ | ✅ | ✅ | ✅ |
| Create Documents | ✅ | ✅ | ✅ | ❌ |
| Edit Documents | ✅ | ✅ | ❌ | ❌ |
| Delete Documents | ✅ | ❌ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ✅ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| View Audit Log | ✅ | ✅ | ❌ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ |

---

## 📦 Document Types

LogiDocs supports 6 standard logistics document types:

1. **TTN** (Товарно-транспортная накладная) - Consignment Note
2. **Invoice** (Счёт-фактура) - Tax Invoice
3. **Manifest** (Грузовой манифест) - Cargo Manifest
4. **Customs** (Таможенная декларация) - Customs Declaration
5. **Packing** (Упаковочный лист) - Packing List
6. **Bill of Lading** (Коносамент) - Bill of Lading

Each document includes:
- Auto-generated document number
- Sender/Recipient/Carrier information
- Cargo details (description, weight, volume)
- Route information (from/to)
- Delivery dates
- Status tracking
- Cost calculation

---

## 📁 Project Structure

```
logidocs-pro/
├── index.html          # Main application file (single-page app)
├── package.json        # NPM dependencies (for Vite dev server)
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── README.md           # This file
└── src/                # Source files (for Vite build)
    ├── App.tsx
    └── main.tsx
```

### Key Components Inside `index.html`

```javascript
// Main Application Components
- AuthPage          // Login/authentication
- Dashboard         // Main overview with statistics
- DocumentList      // Document table with filters
- DocumentForm      // Create/edit documents
- Tracking          // Shipment tracking
- Counterparties    // Sender/recipient/carrier management
- Reports           // Analytics and charts
- UserManagement    // Admin user management
- AuditLog          // System activity log
- KanbanBoard       // Visual workflow board
- Calendar          // Date-based document view
- Settings          // System configuration
```

---

## ⚠️ Important Notes

### Data Persistence
- **All data is stored in browser's `localStorage`**
- Each user's browser has **independent data**
- Data is **NOT synchronized** between users
- Clearing browser data will **delete all documents**

### Production Use
This is a **frontend-only demonstration**. For production deployment with multiple users, you need:

1. **Backend Server** (Node.js, Python, PHP, etc.)
2. **Database** (PostgreSQL, MySQL, MongoDB)
3. **API** for data synchronization
4. **Authentication** server-side validation
5. **File Storage** for document attachments

### Current Use Cases
✅ **Perfect for:**
- Demonstrations and presentations
- UI/UX prototyping
- Single-user personal use
- Educational purposes
- Feature showcase

❌ **NOT suitable for:**
- Multi-user production environments (without backend)
- Shared team collaboration (data not synchronized)
- Mission-critical document storage (localStorage can be cleared)

---

## 🗺️ Roadmap

### Planned Features
- [ ] Backend API integration (Node.js/Express)
- [ ] Database integration (PostgreSQL)
- [ ] Real-time collaboration (WebSocket)
- [ ] Document templates
- [ ] PDF generation and export
- [ ] E-signature integration
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Multi-language support (full i18n)
- [ ] Document versioning
- [ ] Advanced search with filters
- [ ] Backup/restore functionality
- [ ] Two-factor authentication (2FA)

### Version History
- **v2.0.0** (Current) - Full-featured frontend with user management, Excel import, audit log
- **v1.0.0** - Initial release with basic document management

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow
```bash
# Clone the repository
git clone https://github.com/yourusername/logidocs-pro.git

# Navigate to directory
cd logidocs-pro

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 LogiDocs Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/logidocs-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/logidocs-pro/discussions)
- **Email**: support@logidocs.example.com

---

## 🌟 Acknowledgments

- React team for the amazing library
- SheetJS for Excel parsing capabilities
- All contributors and testers

---

<div align="center">

**Made with ❤️ for the logistics industry**

[⬆ Back to Top](#-logidocs-pro)

</div>
