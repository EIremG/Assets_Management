# 📦 Pavza Assets Management System

Full-stack asset management application built with **Spring Boot** (Backend) + **React TypeScript** (Frontend) + **MongoDB** (Database).

---

## 🛠️ Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| **Backend** | Java 21, Spring Boot 3.2, Maven |
| **Database** | MongoDB 7.0 |
| **Frontend** | React 18, TypeScript |
| **UI Library** | Material-UI (MUI) v5 |
| **HTTP Client** | Axios |

---

## 📋 Gereksinimler (Kurulu Olması Gerekenler)

Projeyi çalıştırmadan önce şunların kurulu olması gerekiyor:

### 1. Java 21
- İndir: https://www.oracle.com/java/technologies/downloads/#java21
- Kontrol: `java -version`

### 2. Node.js (v18+)
- İndir: https://nodejs.org/
- Kontrol: `node -v` ve `npm -v`

### 3. MongoDB Community Edition
- İndir: https://www.mongodb.com/try/download/community
- Kurulumda **"Install MongoDB as a Service"** seçeneğini işaretle!
- Kontrol: `Get-Service MongoDB`

### 4. VS Code (Önerilen IDE)
- İndir: https://code.visualstudio.com/
- Eklentiler:
  - Extension Pack for Java
  - Spring Boot Extension Pack
  - ES7+ React/Redux/React-Native snippets

---

## 🚀 İlk Kurulum (Sadece 1 Kere)

### Backend Paketleri
Maven bağımlılıkları otomatik indirilir. İlk çalıştırmada internet bağlantısı gereklidir.

### Frontend Paketleri
```powershell
cd C:\Users\90505\Downloads\assets\frontend
npm install
```

Bu komut şu paketleri kurar:
- `axios` - API istekleri
- `@mui/material` - UI bileşenleri
- `@emotion/react` `@emotion/styled` - MUI bağımlılıkları
- `@mui/icons-material` - İkonlar
- `react-toastify` - Toast bildirimleri
- `xlsx` - Excel export
- `file-saver` - Dosya indirme
- `@types/file-saver` - TypeScript desteği

---

## ▶️ Her Seferinde Çalıştırma (Sırayla!)

### Adım 1: MongoDB'yi Başlat
```powershell
net start MongoDB
```

### Adım 2: Backend'i Başlat
VS Code'da:
1. `assets/src/main/java/com/java/assets/AssetsApplication.java` dosyasını aç
2. `main` metodunun üstündeki **▶ Run** butonuna tıkla
3. Şunu görene kadar bekle:
```
Started AssetsApplication in X seconds
Tomcat started on port(s): 8080
```

### Adım 3: Frontend'i Başlat
```powershell
cd C:\Users\90505\Downloads\assets\frontend
npm start
```

Tarayıcıda otomatik açılır: **http://localhost:3000** 🎉

---

## 🛑 Kapatma

### Frontend Durdur:
Terminal'de `Ctrl + C`

### Backend Durdur:
VS Code'da ▶ butonunun yanındaki **⬛ Stop** butonuna tıkla

### MongoDB Durdur (İsteğe bağlı):
```powershell
net stop MongoDB
```

---

## 🔗 URL'ler

| Servis | URL |
|--------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:8080/api/assets |
| **MongoDB** | mongodb://localhost:27017 |
| **MongoDB Compass** | mongodb://localhost:27017 |

---

## 📡 API Endpoints

| Method | URL | Açıklama |
|--------|-----|----------|
| `GET` | `/api/assets` | Tüm asset'leri listele |
| `POST` | `/api/assets` | Yeni asset ekle |
| `PUT` | `/api/assets/{id}` | Asset güncelle |
| `DELETE` | `/api/assets/{id}` | Asset sil |
| `GET` | `/api/assets/{id}` | Tek asset getir |
| `GET` | `/api/assets/paginated?page=0&size=10` | Sayfalı liste |

---

## 🗄️ MongoDB

- **Database:** `pavza_assets`
- **Collection:** `assets`
- **Compass ile görüntüle:** `mongodb://localhost:27017` → `pavza_assets` → `assets`

---

## 📁 Proje Yapısı

```
C:\Users\90505\Downloads\assets\
│
├── assets\                          ← Backend (Spring Boot)
│   ├── src\main\java\com\java\assets\
│   │   ├── aspect\
│   │   │   └── LoggingAspect.java   ← AOP Loglama
│   │   ├── controller\
│   │   │   └── AssetController.java ← REST Endpoints
│   │   ├── exception\
│   │   │   └── DuplicateSerialNoException.java
│   │   ├── model\
│   │   │   └── Asset.java           ← MongoDB Model
│   │   ├── repository\
│   │   │   └── AssetRepository.java ← MongoDB Repository
│   │   ├── service\
│   │   │   └── AssetService.java    ← Business Logic
│   │   └── AssetsApplication.java   ← Ana Uygulama
│   ├── src\main\resources\
│   │   └── application.properties   ← MongoDB Bağlantısı
│   └── pom.xml                      ← Maven Bağımlılıkları
│
└── frontend\                        ← Frontend (React)
    ├── src\
    │   ├── components\
    │   │   ├── AssetCard.tsx        ← Asset Kartı
    │   │   ├── AssetDetailModal.tsx ← Detay Modal
    │   │   └── Dashboard.tsx        ← İstatistikler
    │   ├── services\
    │   │   └── assetService.ts      ← API Çağrıları
    │   ├── types\
    │   │   └── Asset.ts             ← TypeScript Types
    │   ├── utils\
    │   │   └── exportUtils.ts       ← Excel/PDF Export
    │   ├── App.tsx                  ← Ana Component
    │   ├── App.css                  ← Stiller
    │   └── index.tsx                ← Giriş Noktası
    └── package.json                 ← npm Bağımlılıkları
```

---

## ✨ Özellikler

### Backend
- ✅ REST API (GET, POST, PUT, DELETE)
- ✅ MongoDB entegrasyonu
- ✅ Unique serialNo validasyonu
- ✅ CORS yapılandırması
- ✅ AOP ile loglama
- ✅ Pagination endpoint
- ✅ Exception handling

### Frontend
- ✅ Asset listeleme (kart görünümü)
- ✅ Asset ekleme / düzenleme / silme
- ✅ Arama ve filtreleme
- ✅ Kategori sistemi (6 kategori)
- ✅ Dashboard istatistikleri
- ✅ Pagination (sayfalama)
- ✅ Excel ve PDF export
- ✅ Dark / Light mode
- ✅ Asset detay modal
- ✅ Toast bildirimleri
- ✅ Responsive tasarım

---

## 🧪 API Test Komutları (PowerShell)

```powershell
# Tüm asset'leri listele
Invoke-RestMethod -Uri "http://localhost:8080/api/assets"

# Yeni asset ekle
Invoke-RestMethod -Uri "http://localhost:8080/api/assets" -Method POST -ContentType "application/json" -Body '{"name":"Laptop Dell XPS","serialNo":"SN001","assignDate":"2026-02-17","category":"Computer"}'

# Asset sil
Invoke-RestMethod -Uri "http://localhost:8080/api/assets/ASSET_ID_BURAYA" -Method DELETE

# Sayfalı liste
Invoke-RestMethod -Uri "http://localhost:8080/api/assets/paginated?page=0&size=6"
```

---

## ⚠️ Sık Karşılaşılan Sorunlar

### Backend başlamıyor?
```powershell
# MongoDB çalışıyor mu kontrol et
Get-Service MongoDB
# Çalışmıyorsa başlat
net start MongoDB
```

### Frontend açılmıyor?
```powershell
# node_modules eksik olabilir
cd C:\Users\90505\Downloads\assets\frontend
npm install
npm start
```

### Port 8080 kullanımda?
```powershell
# Portu kullanan uygulamayı bul ve kapat
netstat -ano | findstr :8080
```

### MongoDB bağlantı hatası?
- MongoDB Compass'tan `mongodb://localhost:27017` ile bağlandığınızı doğrulayın
- `net start MongoDB` komutunu çalıştırın

---

## 👤 Geliştirici

**Pavza Assets Management**
- Backend: Java Spring Boot + MongoDB
- Frontend: React TypeScript + Material-UI
- Versiyon: 1.0.0
- Tarih: Şubat 2026