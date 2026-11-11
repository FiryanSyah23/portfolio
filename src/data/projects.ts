import { Project } from "@/types/types";
const dataProjects: Project[] = [
    {
        title: "Website Desa Keuramat",
        slug: "website-desa-keuramat",
        updatedAt: "2026-11-10",
        description:
            "Website resmi desa berbasis WordPress yang menyajikan profil desa, berita, dan informasi layanan masyarakat secara online.",
        longDescription:
            "Website desa Keuramat adalah website profil desa yang dibangun menggunakan WordPress untuk menjadi pusat informasi bagi warga dan pengunjung. Website ini memuat profil dan sejarah desa, struktur pemerintahan, berita dan pengumuman, galeri kegiatan, serta informasi kontak dan lokasi desa. Dengan WordPress sebagai CMS (Content Management System, yaitu sistem pengelola konten), perangkat desa bisa menambah dan mengubah konten sendiri tanpa harus menulis kode. Tampilan dibuat responsif agar nyaman diakses dari ponsel, karena sebagian besar warga mengakses internet lewat smartphone. Proyek ini menunjukkan kemampuan menyiapkan website yang praktis dan mudah dirawat sesuai kebutuhan klien.",
        category: "Website",
        tech: ["WordPress"],
        image: "/imgProject/gp-keuramat/homepage-keuramat.png",
        projectImg: [
            "/imgProject/gp-keuramat/homepage-keuramat.png",
            "/imgProject/gp-keuramat/berita-keuramat.png",
            "/imgProject/gp-keuramat/up-to-date-berita-keuramat.png",
            "/imgProject/gp-keuramat/gmaps-keuramat.png",
        ],
        demo: "https://gampongkeuramat.desa.id/",
        status: "Completed",
        year: "2026",
    },
    {
        title: "MYP",
        slug: "mypos",
        updatedAt: "2026-11-10",
        description:
            "Aplikasi kasir untuk UMKM dan toko kelontong. Bisa dipakai offline untuk transaksi tunai, produk, dan laporan, dengan pembayaran QRIS online lewat Midtrans.",
        longDescription:
            "MYP adalah aplikasi POS (Point of Sale) berbasis mobile yang dibuat untuk pelaku UMKM dan toko kelontong agar bisa mencatat penjualan dengan cepat dan rapi. Fitur utamanya berjalan offline: data produk, stok, dan transaksi disimpan langsung di ponsel menggunakan SQLite, sehingga kasir, pengelolaan produk, dan laporan tetap bisa dipakai tanpa koneksi internet. Halaman Kasir memungkinkan pemilihan produk berdasarkan kategori lengkap dengan harga dan sisa stok, serta pembayaran tunai dengan tombol nominal cepat seperti uang pas, Rp 20.000, Rp 50.000, dan Rp 100.000. Untuk pembayaran non-tunai, aplikasi menyediakan QRIS yang diproses secara online melalui Midtrans sebagai payment gateway, sehingga pembayaran jenis ini membutuhkan koneksi internet. Halaman Produk digunakan untuk mengelola barang dan stok, sedangkan halaman Laporan menampilkan omzet, jumlah transaksi, dan item terjual per hari, bulan, maupun tahun, dilengkapi grafik omzet 7 hari terakhir.",
        category: "Mobile App",
        tech: ["React Native", "Expo", "SQLite", "TypeScript"],
        image: "/imgProject/POS/thumbnail_aplikasi_kasir.png",
        projectImg: [
            "/imgProject/POS/thumbnail_aplikasi_kasir.png",
            "/imgProject/POS/gallery_pembayaran.png",
            "/imgProject/POS/gallery_laporan.png",
        ],
        demo: "",
        status: "Completed",
        year: "2026",
    },
    {
        title: "Digital Twins GUI",
        slug: "digital-twins-2",
        updatedAt: "2025-09-10",
        description:
            "Aplikasi ini dirancang untuk pengontrol panel surya. Itu dapat memantau dan menampilkan parameter listrik seperti tegangan, arus, dan daya.",
        longDescription:
            "Digital Twins GUI adalah aplikasi pemantauan real-time yang dikembangkan untuk mensimulasikan dan memvisualisasikan perilaku sistem panel surya. Aplikasi dibangun menggunakan Python dengan antarmuka GUI kustom, terhubung ke mikrokontroler Arduino melalui komunikasi serial (protokol UART) untuk mengumpulkan data sensor langsung. Ini menampilkan parameter listrik utama termasuk tegangan (V), arus (A), dan daya (W) secara real-time dengan grafik dinamis dan pembacaan numerik. Sistem ini dirancang mengikuti konsep Digital Twin — menciptakan representasi virtual dari pengaturan panel surya fisik — sehingga berguna untuk observasi, analisis, dan pembelajaran akademis. Proyek ini aktif digunakan di Laboratorium Teknik Elektro UIN Ar-Raniry sebagai sarana pendidikan untuk membantu mahasiswa memahami sistem energi surya dan akuisisi data. Firmware ditulis dalam C++ untuk sisi Arduino, menangani pembacaan sensor ADC dan transmisi data serial, sementara Python menangani penguraian data, pemrosesan, dan rendering GUI.",
        category: "Desktop App",
        tech: ["Python", "Arduino", "C/C++"],
        fit: "contain",
        image: "/imgProject/digitalTwins/digitalTwins.png",
        projectImg: ["/imgProject/digitalTwins/digitalTwins.png"],
        demo: "",
        status: "Completed",
        year: "2025",
    },
    {
        title: "WEDLX",
        slug: "wedlx",
        updatedAt: "2024-10-13",
        description:
            "WEDLX adalah platform undangan pernikahan digital yang sepenuhnya responsif yang dirancang untuk menggantikan undangan cetak tradisional dengan pengalaman web yang modern dan interaktif.",
        longDescription:
            "WEDLX adalah platform undangan pernikahan digital yang sepenuhnya responsif yang dirancang untuk menggantikan undangan cetak tradisional dengan pengalaman web yang modern dan interaktif. Dibangun menggunakan JavaScript vanilla dengan fokus pada interaksi UI yang lancar, platform ini memberi pasangan cara elegan untuk berbagi hari istimewa mereka dengan tamu di semua perangkat. Fitur utama termasuk penghitung waktu mundur real-time ke tanggal pernikahan, galeri foto interaktif yang menampilkan momen pasangan, formulir RSVP yang berfungsi penuh untuk konfirmasi tamu, Google Maps yang tertanam untuk lokasi venue, dan animasi pembuka yang indah untuk kesan pertama yang mengesankan. Desainnya mengutamakan keanggunan dan keterbacaan dengan tipografi dan palet warna yang dipilih dengan cermat. Situs web ini ringan, memuat cepat, dan dioptimalkan untuk perangkat seluler — memastikan para tamu yang menggunakan ponsel cerdas mendapatkan pengalaman yang lancar. Proyek ini menunjukkan kemampuan untuk menghadirkan produk yang sempurna dan siap untuk klien dengan memperhatikan estetika dan fungsionalitas.",
        category: "Website",
        tech: ["Javascript"],
        image: "/imgProject/wedlx/wedLX.png",
        projectImg: [
            "/imgProject/wedlx/wedLX.png",
            "/imgProject/wedlx/homepage.png",
            "/imgProject/wedlx/info-acara.png",
            "/imgProject/wedlx/story.png",
            "/imgProject/wedlx/gallery.png",
            "/imgProject/wedlx/rsvp.png",
            "/imgProject/wedlx/gift.png",
        ],
        demo: "https://firyansyah23.github.io/Wedlx/",
        status: "Completed",
        year: "2024",
    },
    {
        title: "Personal Portfolio",
        slug: "personal-portfolio",
        updatedAt: "2026-06-22",
        description:
            "Situs web portofolio pribadi modern yang menampilkan proyek, keterampilan, dan perjalanan saya sebagai pengembang. Dibangun dengan fokus pada UI yang bersih, interaksi yang lancar, dan desain responsif.",
        longDescription:
            "Situs web portofolio pribadi ini dibangun sepenuhnya dari awal menggunakan Next.js App Router, React, dan Tailwind CSS — dengan fokus kuat pada performa, aksesibilitas, dan standar UI modern. Proyek ini berfungsi sebagai pusat untuk memamerkan keterampilan teknis, pekerjaan proyek, dan perjalanan profesional saya sebagai pengembang. Transisi halaman yang mulus dan interaksi mikro diterapkan menggunakan Framer Motion, memberikan situs ini kesan halus seperti aplikasi. Tata letaknya sepenuhnya responsif, dioptimalkan untuk semua ukuran layar mulai dari tampilan seluler hingga desktop besar. Performa diprioritaskan melalui pengoptimalan Gambar bawaan Next.js, pemuatan lambat, dan konfigurasi metadata yang tepat untuk SEO. Portofolio menampilkan bagian khusus untuk proyek (dengan halaman studi kasus terperinci menggunakan perutean dinamis), ikhtisar keterampilan, bagian tentang, dan formulir kontak. Setiap halaman proyek secara dinamis merender konten dari sumber data terpusat, sehingga mudah untuk dipelihara dan diskalakan. Situs ini diterapkan di Vercel dengan CI/CD otomatis pada setiap dorongan ke cabang utama, yang mencerminkan praktik penerapan dunia nyata yang digunakan dalam lingkungan profesional.",
        category: "Website",
        tech: [
            "Next.js",
            "React",
            "JavaScript",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "Vercel",
        ],
        image: "/imgProject/portfolio/homepage.png",
        projectImg: [
            "/imgProject/portfolio/homepage.png",
            "/imgProject/portfolio/aboutpage.png",
            "/imgProject/portfolio/experiencepage.png",
            "/imgProject/portfolio/skillspage.png",
            "/imgProject/portfolio/portfoliopage.png",
            "/imgProject/portfolio/contactpage.png",
        ],
        demo: "https://firyansyah.my.id",
        status: "Completed",
        year: "2026",
    },
];

export default dataProjects;
