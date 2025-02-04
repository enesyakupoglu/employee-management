const translations = {
  en: {
    employeeList: {
      title: 'Employee List',
      searchPlaceholder: 'Search employees...',
      addButton: 'Add Employee',
      editButton: 'Edit',
      deleteButton: 'Delete',
      confirmDelete: 'Are you sure you want to delete this employee?',
      firstName: 'First Name',
      lastName: 'Last Name',
      position: 'Position',
      tableView: 'Table View',
      listView: 'List View',
      previous: 'Previous',
      next: 'Next',
      employmentDate: 'Employment Date',
      birthDate: 'Birth Date',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      actions: 'Actions',
    },
    employeeForm: {
      firstName: 'First Name',
      lastName: 'Last Name',
      employmentDate: 'Employment Date',
      birthDate: 'Birth Date',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      selectDepartment: 'Select Department',
      selectPosition: 'Select Position',
      save: 'Save',
      cancel: 'Cancel',
      analytics: 'Analytics',
      tech: 'Tech',
      junior: 'Junior',
      medior: 'Medior',
      senior: 'Senior',
      validation: {
        fillRequiredFields: 'Please fill in all required fields correctly!',
        confirmUpdate: 'Are you sure you want to update this employee?',
        invalidName: 'Names must only contain letters!',
        invalidPhone: 'Invalid phone number format!',
        invalidEmail: 'Invalid email address format!',
        duplicateEmail:
          'This email is already registered! Please use a different email.',
        selectDepartment: 'Please select a department!',
        selectPosition: 'Please select a position!',
      },
    },
    deleteModal: {
      areYouSure: 'Are you sure?',
      confirmMessage:
        'Selected employee record of {name} {surname} will be deleted.',
      proceed: 'Proceed',
      cancel: 'Cancel',
    },
    navigationMenu: {
      home: 'Home',
      employees: 'Employees',
      settings: 'Settings',
      languageSelector: 'Language',
    },
    settings: {
      language: 'Language',
      theme: 'Theme',
      enableDarkMode: 'Enable Dark Mode',
      enableLightMode: 'Enable Light Mode',
    },
    general: {
      title: 'Employee Management Application',
      save: 'Save',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
    },
  },
  tr: {
    employeeList: {
      title: 'Çalışan Listesi',
      searchPlaceholder: 'Çalışanları ara...',
      addButton: 'Çalışan Ekle',
      editButton: 'Düzenle',
      deleteButton: 'Sil',
      confirmDelete: 'Bu çalışanı silmek istediğinize emin misiniz?',
      firstName: 'Ad',
      lastName: 'Soyad',
      position: 'Pozisyon',
      tableView: 'Tablo Görünümü',
      listView: 'Liste Görünümü',
      previous: 'Önceki',
      next: 'Sonraki',
      employmentDate: 'İşe Giriş Tarihi',
      birthDate: 'Doğum Tarihi',
      phone: 'Telefon',
      email: 'E-posta',
      department: 'Departman',
      actions: 'İşlemler',
    },
    employeeForm: {
      firstName: 'Ad',
      lastName: 'Soyad',
      employmentDate: 'İşe Giriş Tarihi',
      birthDate: 'Doğum Tarihi',
      phone: 'Telefon',
      email: 'E-posta',
      department: 'Departman',
      position: 'Pozisyon',
      selectDepartment: 'Departman Seç',
      selectPosition: 'Pozisyon Seç',
      save: 'Kaydet',
      cancel: 'İptal',
      analytics: 'Analitik',
      tech: 'Teknoloji',
      junior: 'Junior',
      medior: 'Medior',
      senior: 'Senior',
      validation: {
        fillRequiredFields: 'Lütfen tüm alanları doğru şekilde doldurun!',
        confirmUpdate: 'Bu çalışanı güncellemek istediğinizden emin misiniz?',
        invalidName: 'İsimler sadece harf içermelidir!',
        invalidPhone: 'Geçersiz telefon numarası formatı!',
        invalidEmail: 'Geçersiz e-posta adresi formatı!',
        duplicateEmail:
          'Bu e-posta adresi zaten kayıtlı! Lütfen farklı bir e-posta kullanın.',
        selectDepartment: 'Lütfen bir departman seçin!',
        selectPosition: 'Lütfen bir pozisyon seçin!',
      },
    },
    deleteModal: {
      areYouSure: 'Emin misiniz?',
      confirmMessage: '{name} {surname} çalışan kaydı silinecek.',
      proceed: 'Devam',
      cancel: 'İptal',
    },
    navigationMenu: {
      home: 'Ana Sayfa',
      employees: 'Çalışanlar',
      settings: 'Ayarlar',
      languageSelector: 'Dil',
    },
    settings: {
      language: 'Dil',
      theme: 'Tema',
      enableDarkMode: 'Koyu Modu Etkinleştir',
      enableLightMode: 'Açık Modu Etkinleştir',
    },
    general: {
      title: 'Çalışan Yönetimi Uygulaması',
      save: 'Kaydet',
      cancel: 'İptal',
      yes: 'Evet',
      no: 'Hayır',
    },
  },
};

export function getLocalizedText(key) {
  const lang = document.documentElement.lang || 'en';
  return key.split('.').reduce((obj, i) => obj?.[i], translations[lang]) || key;
}

window.addEventListener('language-changed', () => {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = getLocalizedText(key);
    }
  });
});
