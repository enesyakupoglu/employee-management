# Employee Management Application 🏢

## 📌 Proje Açıklaması
Bu proje, **LitElement (JavaScript)** kullanılarak geliştirilmiş bir **Çalışan Yönetim Uygulaması**dır.  
HR ekibinin çalışan kayıtlarını yönetmesini kolaylaştıran bir **SPA (Single Page Application)** olarak tasarlanmıştır.

### **🎯 Özellikler**
✅ Çalışanları **listeleme** (Tablo / Liste Görünümü)  
✅ **Çalışan ekleme, düzenleme ve silme**  
✅ **Sayfalama (Pagination) ve Arama (Search)**  
✅ **Türkçe ve İngilizce dil desteği** (`localization.js`)  
✅ **Tarayıcı belleğinde veri saklama** (`store.js`)  
✅ **Yönlendirme (Routing) sistemi** (`router.js`)  
✅ **%85+ test kapsamı ile birim testler**  

---

## 📂 **Proje Dosya Yapısı**
```bash
employee-management/
├── src/
│   ├── assets/                 # Görseller ve statik dosyalar
│   │   ├── ing-logo.svg
│   ├── components/             # Tüm LitElement bileşenleri
│   │   ├── DeleteModal.js       # Çalışan silme modalı
│   │   ├── EmployeeForm.js      # Çalışan ekleme ve düzenleme formu
│   │   ├── EmployeeList.js      # Çalışan listeleme bileşeni
│   │   ├── NavigationMenu.js    # Üst navigasyon menüsü
│   ├── data/
│   │   ├── employees.js         # Statik çalışan verileri (Mock Data)
│   ├── localization/           # Çoklu dil desteği
│   │   ├── localization.js      # Dil değişimi ve çeviriler
│   ├── pages/                  # Sayfa bileşenleri
│   │   ├── EmployeePage.js      # Çalışanları listeleme ve yönetme sayfası
│   │   ├── HomePage.js          # Ana sayfa bileşeni
│   │   ├── SettingsPage.js      # Ayarlar sayfası
│   ├── styles/                 # Tüm stil dosyaları
│   │   ├── DeleteModalStyles.js
│   │   ├── EmployeeFormStyles.js
│   │   ├── EmployeeListStyles.js
│   │   ├── globalStyles.js      # Genel CSS değişkenleri
│   ├── utils/                  # Yardımcı fonksiyonlar ve araçlar
│   │   ├── router.js            # Uygulama yönlendirme (Vaadin Router)
│   │   ├── store.js             # LocalStorage ile veri saklama
│   │   ├── index.js             # Global yardımcı fonksiyonlar
│   ├── tests/                   # Tüm test dosyaları
│   │   ├── DeleteModal_test.js   # DeleteModal testleri
│   │   ├── EmployeeForm_test.js  # EmployeeForm testleri
│   │   ├── EmployeeList_test.js  # EmployeeList testleri
│   ├── index.js                 # Ana giriş noktası
├── coverage/                   # Test kapsam raporları
├── docs/                       # Proje dokümantasyonu
├── node_modules/               # Bağımlılıklar (npm)
├── .vscode/                    # VSCode ayarları
├── .eslintrc                    # ESLint kuralları
├── package.json                 # Bağımlılıklar ve scriptler
├── README.md                    # Proje dokümantasyonu (Bu dosya)

🚀 Kurulum & Çalıştırma
1️⃣ Projeyi Klonla
git clone https://github.com/kullanici-adi/employee-management.git
cd employee-management
2️⃣ Bağımlılıkları Yükle
npm install
3️⃣ Uygulamayı Başlat
npm run dev

📌 Uygulama şurada çalışacak: http://localhost:8000

🧪 Test Çalıştırma & Coverage
Testleri çalıştırmak için:
npx web-test-runner --coverage
✅ Test kapsamı raporunu şu klasörde bulabilirsin: coverage/lcov-report/index.html

🎨 Bileşenler & Açıklamalar
🟢 EmployeeList.js
Çalışanları listeleme, sayfalama, arama, düzenleme ve silme işlemlerini yönetir.

🟢 EmployeeForm.js
Yeni çalışan ekleme ve mevcut çalışanı düzenleme formudur.

🟢 DeleteModal.js
Çalışan silme işlemini onaylayan modal penceredir.

🟢 Localization.js
Uygulamanın Türkçe ve İngilizce dil desteğini yönetir.

🛠 Kullanılan Teknolojiler
LitElement (JavaScript) - Hafif ve performanslı bileşen mimarisi
Vaadin Router - Tek sayfa uygulama yönlendirme
Open Web Components (OWC) - Web bileşeni testleri
Web Test Runner - %85+ test kapsamı için test framework'ü

📌 Geliştirici Notları
Kod yazarken ESLint ve Prettier kurallarına uyulmalıdır.
Bileşenler modüler ve yeniden kullanılabilir şekilde tasarlanmıştır.
Yeni bir sayfa eklemek için /pages/ klasörüne bir bileşen ekleyip router.js içinde yönlendirme yapabilirsin.
