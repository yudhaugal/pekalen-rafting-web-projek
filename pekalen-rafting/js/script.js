/**
 * ==============================================================================
 * PEKALEN RAFTING - SCRIPT.JS
 * Logika & Interaktivitas Website Reservasi Wisata Pekalen Rafting, Probolinggo
 * Teknologi: Pure Vanilla JavaScript (Tanpa Framework / Library Eksternal)
 * Ramah bagi mahasiswa & pemula untuk dipelajari
 * ==============================================================================
 */

// Menjalankan kode setelah seluruh dokumen DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------------
   * 0. KONFIGURASI UTAMA WHATSAPP
   * Nomor WhatsApp resmi pengelola Pekalen Rafting (mudah diubah sewaktu-waktu)
   * ---------------------------------------------------------------------------- */
  const OFFICIAL_WHATSAPP = '6285236183600';

  // Generator tautan pemesanan WhatsApp otomatis sesuai format baku
  function createWhatsAppServiceLink(serviceName) {
    const text = `Halo Pekalen Rafting, saya ingin bertanya dan melakukan pemesanan layanan ${serviceName}. Mohon informasi mengenai harga, fasilitas, dan jadwal yang tersedia.`;
    return `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  /* ----------------------------------------------------------------------------
   * 1. DATA MASTER PRODUK & AKTIVITAS WISATA (6 LAYANAN UTAMA)
   * Data lengkap untuk kartu layanan, modal detail, dan pemesanan WhatsApp
   * ---------------------------------------------------------------------------- */
  const servicesData = {
    'rafting': {
      id: 'rafting',
      name: 'Rafting',
      tagline: 'Sensasi Petualangan Arung Jeram Sungai Pekalen Probolinggo',
      categoryBadge: 'Petualangan Air',
      image: 'images/service-rafting.jpg',
      duration: '± 2 - 3 Jam (10 - 12 KM)',
      suitable: 'Keluarga, Sahabat, Komunitas & Outing Perusahaan',
      location: 'Sungai Pekalen, Desa Pesawahan, Tiris',
      shortDesc: 'Petualangan menyusuri Sungai Pekalen dengan arus sungai, jeram, dan panorama alam yang menarik.',
      fullDesc: 'Nikmati petualangan arung jeram yang memadukan tantangan, kebersamaan, dan keindahan alam Sungai Pekalen di Probolinggo, Jawa Timur. Terkenal dengan tebing-tebing batu alami eksotis, air terjun alami yang mengalir langsung ke bibir sungai, serta jeram dinamis grade II hingga IV yang siap menguji adrenalin secara aman didampingi pemandu berpengalaman.',
      highlights: [
        'Pilihan rute Pekalen Atas (±12 KM) dan Pekalen Bawah (±10 KM)',
        'Melintasi pemandangan air terjun alami dan tebing batuan purba',
        'Didampingi instruktur sungai bersertifikat & tim rescue',
        'Perlengkapan standar keselamatan: perahu karet, helm, & pelampung (life jacket)',
        'Transportasi lokal basecamp ke titik start dan sajian kuliner tradisional'
      ]
    },
    'paintball': {
      id: 'paintball',
      name: 'Paintball',
      tagline: 'Aktivitas Permainan Strategi & Team Building di Alam Terbuka',
      categoryBadge: 'Team Building',
      image: 'images/service-paintball.jpg',
      duration: '± 1 - 2 Jam (Sesuai skenario)',
      suitable: 'Gathering Kantor, Komunitas, Outing, Mahasiswa & Teman',
      location: 'Outdoor Jungle Arena Basecamp Pekalen',
      shortDesc: 'Aktivitas permainan strategi dan kerja sama tim yang cocok untuk kegiatan kelompok, komunitas, gathering, dan outing.',
      fullDesc: 'Aktivitas simulasi pertempuran taktis luar ruangan yang dirancang khusus untuk meningkatkan kekompakan, kepemimpinan, dan komunikasi kelompok. Berlatar alam tropis yang rimbun dan asri, peserta akan terlibat dalam beragam skenario permainan taktis menarik dengan panduan wasit profesional dan standar peralatan keselamatan yang terjamin.',
      highlights: [
        'Arena pertempuran outdoor alami dengan barikade dan rintangan kayu taktis',
        'Peralatan lengkap: Google mask standar, rompi pelindung (vest), dan marker semi-otomatis',
        'Peluru cat biodegradable yang ramah lingkungan dan aman bagi peserta',
        'Didampingi wasit (marshal) dan instruktur pengarah strategi permainan',
        'Sangat pas dikombinasikan dengan paket rafting dan agenda gathering'
      ]
    },
    'canyoning': {
      id: 'canyoning',
      name: 'Canyoning',
      tagline: 'Jelajah Ngarai, Tebing Curam & Air Terjun Alami Pekalen',
      categoryBadge: 'Eksplorasi Ngarai',
      image: 'images/service-canyoning.jpg',
      duration: '± 2 - 4 Jam',
      suitable: 'Pencinta Adrenalin, Komunitas Outdoor & Petualang Alam',
      location: 'Ngarai Sungai & Air Terjun Pekalen, Tiris',
      shortDesc: 'Aktivitas petualangan menjelajahi aliran sungai, tebing, dan air terjun dengan perlengkapan serta pendampingan keselamatan yang sesuai.',
      fullDesc: 'Jelajahi keindahan tersembunyi ngarai sungai Pekalen melalui petualangan canyoning yang memacu adrenalin. Paduan seru antara menuruni tebing air terjun alami (waterfall abseiling/rappelling), menyusuri ngarai berbatu, meluncur di perosotan batuan alami, dan berenang di kolam alami yang jernih. Semua dilakukan dengan perlengkapan standar keselamatan internasional.',
      highlights: [
        'Menuruni tebing air terjun alami dengan teknik rappelling yang aman',
        'Menyusuri celah batuan tebing alami dan kolam pegunungan yang eksotis',
        'Peralatan teknis profesional: harness, carabiner, helm, & pelampung',
        'Briefing keselamatan intensif & pendampingan pemandu ahli',
        'Spot foto petualangan ekstrem dengan latar ngarai sungai yang memukau'
      ]
    },
    'penginapan': {
      id: 'penginapan',
      name: 'Penginapan',
      tagline: 'Fasilitas Menginap Nyaman dengan Nuansa Alami Pedesaan',
      categoryBadge: 'Akomodasi Nyaman',
      image: 'images/service-penginapan.jpg',
      duration: 'Check-in 14:00 • Check-out 12:00',
      suitable: 'Keluarga, Rombongan Perusahaan, Wisatawan Luar Kota',
      location: 'Kawasan Basecamp Pekalen Rafting, Pesawahan, Tiris',
      shortDesc: 'Fasilitas menginap untuk wisatawan yang ingin beristirahat dan menikmati suasana alam Pekalen lebih lama.',
      fullDesc: 'Fasilitas menginap yang nyaman dan sejuk bagi wisatawan yang ingin beristirahat sebelum atau setelah berarung jeram. Mengusung konsep villa dan cottage bernuansa alami pedesaan dengan pemandangan hijau asri, menghadirkan ketenangan maksimal untuk melepas penat dari hiruk-pikuk perkotaan.',
      highlights: [
        'Kamar tidur bersih, rapi, dan sejuk alami khas pegunungan',
        'Kamar mandi dalam dengan pasokan air bersih pegunungan',
        'Gazebo dan area teras santai untuk berkumpul bersama keluarga/rombongan',
        'Akses sangat dekat dengan titik kumpul dan basecamp rafting',
        'Tersedia layanan sajian hidangan tradisional lokal pedesaan'
      ]
    },
    'camping-ground': {
      id: 'camping-ground',
      name: 'Camping Ground',
      tagline: 'Berkemah di Bawah Langit Terbuka Tepi Sungai Pekalen',
      categoryBadge: 'Outdoor Camping',
      image: 'images/service-camping.jpg',
      duration: 'Paket Menginap 2 Hari 1 Malam (2D1N)',
      suitable: 'Komunitas, Mahasiswa, Reuni, Pramuka & Keluarga Petualang',
      location: 'Riverside Campsite Pekalen, Tiris',
      shortDesc: 'Area berkemah di alam terbuka yang cocok untuk kegiatan bersama teman, keluarga, komunitas, dan kegiatan outdoor.',
      fullDesc: 'Area berkemah di alam terbuka berumput hijau tepat di tepi aliran sungai yang menyejukkan. Sangat pas untuk menghabiskan malam kebersamaan bersama sahabat, keluarga, atau komunitas pecinta alam dengan suasana api unggun, udara segar perbukitan, dan suara aliran air yang menentramkan jiwa.',
      highlights: [
        'Area ground lapang, bersih, datar, dan aman di pinggir alam terbuka',
        'Tenda dome berkualitas lengkap dengan matras dan alas tidur nyaman',
        'Area api unggun khusus untuk malam keakraban dan kegiatan santai',
        'Fasilitas toilet serta sarana MCK bersih di dekat area ground',
        'Pengawasan dan pendampingan petugas basecamp 24 jam'
      ]
    },
    'glamping-ground': {
      id: 'glamping-ground',
      name: 'Glamping Ground',
      tagline: 'Pengalaman Menginap Elegan & Nyaman di Tengah Alam Asri',
      categoryBadge: 'Glamorous Camp',
      image: 'images/service-glamping.jpg',
      duration: 'Paket Menginap 2 Hari 1 Malam (2D1N)',
      suitable: 'Pasangan, Keluarga Modern, Staycation & Healing Alam',
      location: 'Exclusive Hill & Riverside Zone Pekalen',
      shortDesc: 'Pengalaman menginap di tengah alam dengan konsep tenda yang lebih nyaman dan fasilitas yang lebih praktis dibandingkan camping biasa.',
      fullDesc: 'Pengalaman menginap eksklusif di alam bebas dengan memadukan keindahan panorama Sungai Pekalen dan kenyamanan fasilitas modern. Dilengkapi tenda safari premium dengan kasur empuk, stopkontak listrik, pencahayaan estetik, dan deck teras pribadi. Solusi sempurna untuk menikmati sensasi bermalam di alam tanpa mengorbankan kenyamanan istirahat.',
      highlights: [
        'Tenda safari glamping eksklusif dengan tempat tidur nyaman & sprei bersih',
        'Pencahayaan estetik, colokan listrik untuk pengisian gadget, & fasilitas pendukung',
        'Deck kayu privat dengan pemandangan alam terbuka yang asri dan estetik',
        'Akses kamar mandi modern yang higienis dan terawat',
        'Suasana tenang, privat, dan sangat cocok untuk foto dokumentasi liburan'
      ]
    }
  };

  /* ----------------------------------------------------------------------------
   * 2. DATA MASTER PAKET RAFTING & LAYANAN BOOKING
   * Berisi seluruh paket dan aktivitas untuk sinkronisasi ringkasan formulir
   * ---------------------------------------------------------------------------- */
  const raftingPackages = {
    // 6 Layanan Utama
    'rafting': {
      name: 'Rafting Sungai Pekalen',
      duration: '± 2-3 Jam (10-12 KM)',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Grade II - IV',
      highlight: 'Air Terjun & Tebing Alami'
    },
    'paintball': {
      name: 'Paintball War Game Outdoor',
      duration: '± 1-2 Jam',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Strategi & Outing',
      highlight: 'Jungle Arena & Safety Gear'
    },
    'canyoning': {
      name: 'Canyoning & Waterfall Rappelling',
      duration: '± 2-4 Jam',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Petualangan Ngarai',
      highlight: 'Air Terjun & Standard Pro'
    },
    'penginapan': {
      name: 'Penginapan Villa / Cottage',
      duration: 'Check-in 14:00 • Check-out 12:00',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Akomodasi Nyaman',
      highlight: 'Villa Asri & Suasana Sejuk'
    },
    'camping-ground': {
      name: 'Camping Ground Tepi Sungai',
      duration: '2 Hari 1 Malam (2D1N)',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Outdoor Camping',
      highlight: 'Tenda Dome & Api Unggun'
    },
    'glamping-ground': {
      name: 'Glamping Ground Mewah',
      duration: '2 Hari 1 Malam (2D1N)',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Glamorous Camping',
      highlight: 'Safari Tent & Deck Pribadi'
    },
    // Paket Jalur Rafting Spesifik
    'pekalen-atas': {
      name: 'Pekalen Atas',
      duration: '± 2-3 Jam (12 KM)',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Grade II - IV',
      highlight: 'Air Terjun & Tebing Alami'
    },
    'pekalen-bawah': {
      name: 'Pekalen Bawah',
      duration: '± 2-3 Jam (10 KM)',
      price: null,
      priceText: 'Hubungi Kami',
      grade: 'Grade II - III',
      highlight: 'Jeram Menantang & Alami'
    },
    'paket-rombongan': {
      name: 'Paket Rombongan / Outing',
      duration: '± 2-3 Jam',
      price: null,
      priceText: 'Harga Khusus Grup',
      grade: 'Disesuaikan',
      highlight: 'Family, Komunitas & Corporate'
    }
  };

  /* ----------------------------------------------------------------------------
   * 2. NAVBAR SCROLL EFFECT & STICKY STATE
   * Menambahkan class 'scrolled' pada navbar saat user menggulir halaman ke bawah
   * ---------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Jalankan sekali saat inisialisasi

  /* ----------------------------------------------------------------------------
   * 3. HAMBURGER MENU (MOBILE NAVIGATION)
   * Mengatur buka-tutup menu mobile dengan dukungan aksesibilitas (aria-expanded)
   * ---------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navbarMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-link, .nav-action-btn');

  if (hamburgerBtn && navbarMenu) {
    // Toggle menu saat tombol hamburger diklik
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navbarMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Menutup menu mobile saat link diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Menutup menu jika user mengklik area di luar menu
    document.addEventListener('click', (event) => {
      if (navbarMenu.classList.contains('is-open')) {
        const isClickInside = navbarMenu.contains(event.target) || hamburgerBtn.contains(event.target);
        if (!isClickInside) {
          closeMobileMenu();
        }
      }
    });

    // Menutup menu jika tombol Escape ditekan
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbarMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navbarMenu.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navbarMenu.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  /* ----------------------------------------------------------------------------
   * 4. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
   * Menandai menu navigasi aktif sesuai bagian (section) yang sedang dilihat
   * ---------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.navbar-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ----------------------------------------------------------------------------
   * 5. PEMILIHAN PAKET DARI KARTU PAKET KE FORMULIR BOOKING
   * Tombol "Pilih Paket" langsung memilih opsi pada dropdown & scroll ke form
   * ---------------------------------------------------------------------------- */
  const selectPackageBtns = document.querySelectorAll('.btn-select-package');
  const packageSelectInput = document.getElementById('package-select');
  const bookingSection = document.getElementById('booking');

  selectPackageBtns.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const packageId = button.getAttribute('data-package');

      if (packageSelectInput && packageId) {
        packageSelectInput.value = packageId;
        // Pemicu event change manual agar ringkasan ter-update
        packageSelectInput.dispatchEvent(new Event('change'));
      }

      // Scroll halus ke formulir booking
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        // Beri fokus ke nama pemesan setelah scroll
        setTimeout(() => {
          const nameInput = document.getElementById('booking-name');
          nameInput?.focus();
        }, 500);
      }
    });
  });

  /* ----------------------------------------------------------------------------
   * 6. VALIDASI & FORMULIR RESERVASI BOOKING
   * Menangani input interaktif, ringkasan real-time, validasi tanggal, dan WhatsApp
   * ---------------------------------------------------------------------------- */
  const bookingForm = document.getElementById('booking-form');
  const nameInput = document.getElementById('booking-name');
  const phoneInput = document.getElementById('booking-phone');
  const emailInput = document.getElementById('booking-email');
  const dateInput = document.getElementById('booking-date');
  const participantsInput = document.getElementById('booking-participants');
  const notesInput = document.getElementById('booking-notes');

  // Elemen tampilan ringkasan
  const summaryName = document.getElementById('summary-name');
  const summaryPackage = document.getElementById('summary-package');
  const summaryDate = document.getElementById('summary-date');
  const summaryParticipants = document.getElementById('summary-participants');
  const summaryTotal = document.getElementById('summary-total');
  const bookingAlert = document.getElementById('booking-alert');
  const quickWaBtn = document.getElementById('btn-quick-wa');

  // Set tanggal minimal pemesanan ke hari ini (tidak boleh tanggal lampau)
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Format tanggal ke Bahasa Indonesia (Contoh: "15 Oktober 2026")
  function formatDateIndo(dateString) {
    if (!dateString) return '-';
    try {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return `${day} ${months[month]} ${year}`;
      }
      return dateString;
    } catch {
      return dateString;
    }
  }

  // Update ringkasan secara real-time
  function updateBookingSummary() {
    // 1. Nama
    if (summaryName) {
      summaryName.textContent = nameInput?.value.trim() || '-';
    }

    // 2. Paket
    const selectedPkgKey = packageSelectInput?.value;
    const pkgData = raftingPackages[selectedPkgKey];
    if (summaryPackage) {
      summaryPackage.textContent = pkgData ? pkgData.name : '-';
    }

    // 3. Tanggal
    if (summaryDate) {
      summaryDate.textContent = formatDateIndo(dateInput?.value);
    }

    // 4. Jumlah Peserta
    const participantsVal = parseInt(participantsInput?.value, 10);
    if (summaryParticipants) {
      if (participantsVal && participantsVal > 0) {
        summaryParticipants.textContent = `${participantsVal} Orang`;
      } else {
        summaryParticipants.textContent = '-';
      }
    }

    // 5. Total Estimasi Biaya
    if (summaryTotal) {
      if (pkgData) {
        if (pkgData.price && participantsVal && participantsVal > 0) {
          const totalCost = pkgData.price * participantsVal;
          summaryTotal.textContent = `Rp ${totalCost.toLocaleString('id-ID')}`;
        } else {
          summaryTotal.textContent = 'Konfirmasi via WhatsApp';
        }
      } else {
        summaryTotal.textContent = '-';
      }
    }

    // Update link quick WhatsApp dengan data terisi
    updateQuickWaLink();
  }

  // Memperbarui tombol chat WA langsung di sebelah ringkasan
  function updateQuickWaLink() {
    if (!quickWaBtn) return;
    const name = nameInput?.value.trim() || 'Tamu Pekalen';
    const pkg = raftingPackages[packageSelectInput?.value]?.name || 'Paket Rafting';
    const date = formatDateIndo(dateInput?.value);
    const count = participantsInput?.value || '-';

    let text = `Halo Admin Pekalen Rafting, saya ingin bertanya tentang reservasi:\n`;
    text += `- Nama: ${name}\n`;
    text += `- Paket: ${pkg}\n`;
    text += `- Tanggal Kunjungan: ${date}\n`;
    text += `- Jumlah Peserta: ${count} orang\n\n`;
    text += `Mohon informasi ketersediaan jadwal. Terima kasih!`;

    quickWaBtn.href = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  // Tambahkan event listener untuk update live
  [nameInput, phoneInput, emailInput, packageSelectInput, dateInput, participantsInput, notesInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', updateBookingSummary);
      elem.addEventListener('change', updateBookingSummary);
    }
  });

  // Validasi field input
  function validateField(inputElement) {
    if (!inputElement) return true;
    let isValid = true;
    const value = inputElement.value.trim();

    if (inputElement.hasAttribute('required')) {
      if (!value) {
        isValid = false;
      }
    }

    // Validasi khusus nomor WhatsApp / telepon
    if (inputElement === phoneInput && value) {
      // Hanya izinkan angka, tanda tambah, atau minus, min 9 digit
      const cleanPhone = value.replace(/[\s\-\+]/g, '');
      if (!/^\d{9,15}$/.test(cleanPhone)) {
        isValid = false;
      }
    }

    // Validasi jumlah peserta (harus bilangan bulat positif >= 1)
    if (inputElement === participantsInput && value) {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 1 || num > 500) {
        isValid = false;
      }
    }

    // Validasi tanggal tidak boleh kosong atau di masa lalu
    if (inputElement === dateInput && value) {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        isValid = false;
      }
    }

    if (!isValid) {
      inputElement.classList.add('is-invalid');
    } else {
      inputElement.classList.remove('is-invalid');
    }

    return isValid;
  }

  // Event blur untuk validasi langsung saat meninggalkan input
  [nameInput, phoneInput, packageSelectInput, dateInput, participantsInput].forEach(input => {
    if (input) {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    }
  });

  // Handler Submit Formulir Reservasi
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Cek semua field wajib
      const isNameValid = validateField(nameInput);
      const isPhoneValid = validateField(phoneInput);
      const isPackageValid = validateField(packageSelectInput);
      const isDateValid = validateField(dateInput);
      const isParticipantsValid = validateField(participantsInput);

      if (!isNameValid || !isPhoneValid || !isPackageValid || !isDateValid || !isParticipantsValid) {
        // Tampilkan peringatan error
        if (bookingAlert) {
          bookingAlert.className = 'booking-alert error';
          bookingAlert.textContent = 'Mohon periksa kembali formulir Anda. Pastikan semua data wajib terisi dengan benar.';
          bookingAlert.style.display = 'block';
          bookingAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Siapkan pesan reservasi WhatsApp
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput?.value.trim() || '-';
      const packageKey = packageSelectInput.value;
      const packageName = raftingPackages[packageKey]?.name || packageKey;
      const dateFormatted = formatDateIndo(dateInput.value);
      const participants = participantsInput.value.trim();
      const notes = notesInput?.value.trim() || '-';

      let waMessage = `Halo Admin Pekalen Rafting, saya ingin mengajukan reservasi wisata arung jeram & outdoor:\n\n`;
      waMessage += `*DATA RESERVASI:*\n`;
      waMessage += `- *Nama Lengkap:* ${name}\n`;
      waMessage += `- *Nomor WhatsApp:* ${phone}\n`;
      waMessage += `- *Email:* ${email}\n`;
      waMessage += `- *Layanan/Paket:* ${packageName}\n`;
      waMessage += `- *Tanggal Kunjungan:* ${dateFormatted}\n`;
      waMessage += `- *Jumlah Peserta:* ${participants} orang\n`;
      waMessage += `- *Catatan Tambahan:* ${notes}\n\n`;
      waMessage += `Mohon informasi jadwal ketersediaan dan detail resminya. Terima kasih!`;

      const targetUrl = `https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

      // Tampilkan notifikasi sukses di halaman
      if (bookingAlert) {
        bookingAlert.className = 'booking-alert success';
        bookingAlert.innerHTML = `<strong>Permintaan Reservasi Siap!</strong><br>Membuka WhatsApp untuk mengirim rincian ke Admin Pekalen Rafting... Jika tidak terbuka otomatis, <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="color: #065F46; font-weight: bold; text-decoration: underline;">klik di sini untuk membuka WhatsApp</a>.`;
        bookingAlert.style.display = 'block';
      }

      // Buka tautan WhatsApp di tab baru
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ----------------------------------------------------------------------------
   * 6b. PRODUK & AKTIVITAS WISATA (FILTER TAB, MODAL DETAIL & ORDER WA)
   * Mengatur filter kategori, modal info lengkap, dan tombol pesan WhatsApp
   * ---------------------------------------------------------------------------- */
  const serviceFilterTabs = document.querySelectorAll('.services-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceDetailBtns = document.querySelectorAll('.btn-service-detail');

  // Elemen modal detail layanan
  const serviceModal = document.getElementById('service-modal');
  const serviceModalBackdrop = document.getElementById('service-modal-backdrop');
  const serviceModalClose = document.getElementById('service-modal-close');
  const modalServiceImg = document.getElementById('modal-service-img');
  const modalServiceBadge = document.getElementById('modal-service-badge');
  const modalServiceTitle = document.getElementById('modal-service-title');
  const modalServiceTagline = document.getElementById('modal-service-tagline');
  const modalServiceDuration = document.getElementById('modal-service-duration');
  const modalServiceSuitable = document.getElementById('modal-service-suitable');
  const modalServiceLocation = document.getElementById('modal-service-location');
  const modalServiceDesc = document.getElementById('modal-service-desc');
  const modalServiceHighlights = document.getElementById('modal-service-highlights');
  const modalServiceWaBtn = document.getElementById('modal-service-wa-btn');
  const modalServiceBookingBtn = document.getElementById('modal-service-booking-btn');

  // 1. Filter Kategori Produk & Aktivitas (Semua, Adventure, Stay)
  serviceFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-service-filter');
      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Fungsi Buka Modal Detail Layanan
  function openServiceModal(serviceKey) {
    const service = servicesData[serviceKey];
    if (!service || !serviceModal) return;

    if (modalServiceImg) {
      modalServiceImg.src = service.image;
      modalServiceImg.alt = `${service.name} - Pekalen Rafting`;
    }
    if (modalServiceBadge) modalServiceBadge.textContent = service.categoryBadge;
    if (modalServiceTitle) modalServiceTitle.textContent = service.name;
    if (modalServiceTagline) modalServiceTagline.textContent = service.tagline;
    if (modalServiceDuration) modalServiceDuration.textContent = service.duration;
    if (modalServiceSuitable) modalServiceSuitable.textContent = service.suitable;
    if (modalServiceLocation) modalServiceLocation.textContent = service.location;
    if (modalServiceDesc) modalServiceDesc.textContent = service.fullDesc;

    if (modalServiceHighlights) {
      modalServiceHighlights.innerHTML = service.highlights
        .map(item => `<li><span class="highlight-icon">&#10003;</span><span>${item}</span></li>`)
        .join('');
    }

    // Tombol WhatsApp resmi di dalam modal dengan pesan otomatis
    if (modalServiceWaBtn) {
      modalServiceWaBtn.href = createWhatsAppServiceLink(service.name);
    }

    // Tombol untuk mengarahkan ke form booking
    if (modalServiceBookingBtn) {
      modalServiceBookingBtn.onclick = () => {
        closeServiceModal();
        if (packageSelectInput) {
          packageSelectInput.value = serviceKey;
          packageSelectInput.dispatchEvent(new Event('change'));
        }
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            document.getElementById('booking-name')?.focus();
          }, 450);
        }
      };
    }

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // 3. Fungsi Tutup Modal Detail Layanan
  function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listener tombol "Lihat Detail" di setiap kartu layanan
  serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      openServiceModal(serviceKey);
    });
  });

  // Event listener penutup modal
  if (serviceModalClose) serviceModalClose.addEventListener('click', closeServiceModal);
  if (serviceModalBackdrop) serviceModalBackdrop.addEventListener('click', closeServiceModal);

  // 4. Navigasi Khusus ke Penginapan (#penginapan)
  const penginapanNavLinks = document.querySelectorAll('a[href="#penginapan"]');
  penginapanNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Pastikan kategori penginapan tampak jika sedang difilter ke adventure
      const activeTab = document.querySelector('.services-tab-btn.active');
      if (activeTab && activeTab.getAttribute('data-service-filter') === 'adventure') {
        const allTab = document.querySelector('.services-tab-btn[data-service-filter="all"]');
        allTab?.click();
      }

      const penginapanCard = document.getElementById('penginapan');
      if (penginapanCard) {
        penginapanCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        penginapanCard.classList.remove('pulse-highlight');
        void penginapanCard.offsetWidth; // Trigger reflow
        penginapanCard.classList.add('pulse-highlight');
        setTimeout(() => {
          penginapanCard.classList.remove('pulse-highlight');
        }, 2200);
      }
    });
  });

  /* ----------------------------------------------------------------------------
   * 7. GALLERY FILTER & LIGHTBOX MODAL
   * Fitur penyaringan kategori galeri dan pembesaran gambar (lightbox)
   * ---------------------------------------------------------------------------- */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  // Filter Kategori Galeri
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update daftar item yang sedang aktif/tampak
      activeGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  // Buka Lightbox saat gambar galeri diklik
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = activeGalleryItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });

    // Dukungan navigasi keyboard (Enter / Spasi)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = activeGalleryItems.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || !activeGalleryItems.length) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Mencegah scrolling halaman saat lightbox aktif
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = activeGalleryItems[currentGalleryIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-title')?.textContent || 'Dokumentasi Pekalen Rafting';
    const cat = item.querySelector('.gallery-item-category')?.textContent || 'Galeri';

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = cat;
  }

  function showNextImage() {
    if (!activeGalleryItems.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % activeGalleryItems.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    if (!activeGalleryItems.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
    updateLightboxContent();
  }

  // Event listener Lightbox
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', showNextImage);
  }
  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', showPrevImage);
  }

  // Tutup jika mengklik latar belakang gelap
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation untuk Modal & Lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (serviceModal && serviceModal.classList.contains('active')) {
        closeServiceModal();
      }
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    }
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  /* ----------------------------------------------------------------------------
   * 8. TAHUN COPYRIGHT OTOMATIS
   * Menampilkan tahun berjalan secara dinamis pada bagian footer
   * ---------------------------------------------------------------------------- */
  const copyrightYearElem = document.getElementById('copyright-year');
  if (copyrightYearElem) {
    copyrightYearElem.textContent = new Date().getFullYear();
  }

});
