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
   * 1. DATA MASTER PAKET RAFTING
   * Berisi data paket rafting, deskripsi, dan estimasi harga resmi jika ada.
   * Nilai null pada harga menandakan tarif konfirmasi langsung ke pengelola.
   * ---------------------------------------------------------------------------- */
  const raftingPackages = {
    'pekalen-atas': {
      name: 'Pekalen Atas',
      duration: '± 2-3 Jam (12 KM)',
      price: null, // Hubungi kami untuk penawaran resmi
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

    quickWaBtn.href = `https://wa.me/6285236183600?text=${encodeURIComponent(text)}`;
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

      let waMessage = `Halo Admin Pekalen Rafting, saya ingin mengajukan reservasi wisata arung jeram:\n\n`;
      waMessage += `*DATA RESERVASI:*\n`;
      waMessage += `- *Nama Lengkap:* ${name}\n`;
      waMessage += `- *Nomor WhatsApp:* ${phone}\n`;
      waMessage += `- *Email:* ${email}\n`;
      waMessage += `- *Paket Wisata:* ${packageName}\n`;
      waMessage += `- *Tanggal Kunjungan:* ${dateFormatted}\n`;
      waMessage += `- *Jumlah Peserta:* ${participants} orang\n`;
      waMessage += `- *Catatan Tambahan:* ${notes}\n\n`;
      waMessage += `Mohon konfirmasi ketersediaan jadwal dan estimasi total biayanya. Terima kasih!`;

      const targetUrl = `https://wa.me/6285236183600?text=${encodeURIComponent(waMessage)}`;

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

  // Keyboard navigation untuk Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
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
