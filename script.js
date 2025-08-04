document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMEN DOM ---
  const checkboxes = document.querySelectorAll(".day-checkbox");
  const labels = document.querySelectorAll(".schedule-list label");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const pointsDisplay = document.getElementById("pointsDisplay");
  const gachaButton = document.getElementById("gachaButton");
  const completeMissionButton = document.getElementById(
    "completeMissionButton"
  );
  const missionTextElement = document.getElementById("missionText");
  const claimRewardButton = document.getElementById("claimRewardButton");
  const resetButton = document.getElementById("resetButton");
  const dateOverrideInput = document.getElementById("date-override");

  // --- KONSTANTA & DATA ---
  const totalDays = checkboxes.length;
  const REWARD_COST = 20;
  const MAX_ROLLS = 2;
  const missions = [
    // --- Misi Cepat (1-2 Menit) ---
    "Lakukan 20 detik plank SEKARANG.",
    "Tutup mata & fokus pada napas selama 60 detik penuh.",
    "Rapikan 5 benda terdekat yang ada di sekitarmu saat ini.",
    "Kirim satu pesan apresiasi singkat ke seorang teman atau anggota keluarga.",
    "Minum segelas penuh air putih sekarang juga.",
    "Sebutkan satu tujuanmu hari ini dengan suara keras.",
    "Berdiri dan lakukan peregangan ringan selama 2 menit.",
    "Buang satu barang tidak terpakai dari mejamu atau lacimu.",
    "Sebutkan 3 hal yang kamu syukuri hari ini dengan suara keras.",
    "Lakukan 10 'jumping jacks' atau lompat bintang.",
    "Ucapkan terima kasih pada dirimu sendiri di depan cermin.",
    "Perbaiki postur dudukmu agar tegak selama 10 menit ke depan.",
    "Hapus 3 foto tidak penting dari galeri HP-mu.",
    "Tulis satu kata yang paling menggambarkan perasaanmu saat ini.",

    // --- Misi Sedang (5-10 Menit) ---
    "Balas satu email atau pesan yang selama ini kamu tunda.",
    "Rencanakan dan siapkan pakaian yang akan kamu kenakan besok.",
    "Unsubscribe dari 5 newsletter email yang tidak pernah kamu baca.",
    "Tonton satu video edukasi singkat (5-10 menit) di YouTube.",
    "Baca satu artikel berita atau blog sampai selesai.",
    "Jalan kaki di luar ruangan selama 10 menit tanpa melihat HP.",
    "Tulis satu paragraf di jurnal tentang perasaanmu saat ini.",
    "Dengarkan satu lagu favoritmu dengan saksama, tanpa melakukan hal lain.",
    "Lakukan satu tugas kecil yang akan meringankan beban orang lain di rumah.",
    "Bersihkan layar utama (desktop/homescreen) HP atau komputermu.",
    "Pelajari 5 kata baru dari bahasa asing yang kamu minati.",
    "Dengarkan satu lagu dari genre yang belum pernah kamu coba.",
    "Berikan 5 menit untuk merapikan satu area kecil (satu laci, satu rak buku).",
    "Ikuti satu video meditasi terpandu selama 5 menit.",
    "Cari tahu arti dari satu kata yang tidak kamu ketahui.",
    "Lap bersih layar HP dan keyboard komputermu.",
    "Atur ulang aplikasi di layar utama HP-mu.",
    "Rencanakan jadwalmu untuk besok secara detail.",
    "Tulis satu ulasan positif untuk bisnis lokal atau produk yang kamu suka.",
    "Pelajari 3 keyboard shortcut baru untuk komputermu.",
    "Cari dan simpan satu resep makanan sehat yang ingin kamu coba.",

    // --- Misi Fisik (Menguras Keringat) ---
    "Lakukan '7 minute workout' dari YouTube.",
    "Lakukan 15 'squat jumps'.",
    "Coba lakukan 5 'burpees' dengan teknik yang benar.",
    "Lakukan 'high knees' (lari di tempat lutut tinggi) secepat mungkin selama 30 detik.",
    "Lakukan 'push-up' semampunya dalam 1 menit.",
    "Naik turun tangga selama 3 menit tanpa henti (jika memungkinkan).",
    "Lakukan 'mountain climbers' selama 45 detik.",
    "Coba 'shadow boxing' (tinju bayangan) dengan intensitas tinggi selama 1 menit penuh.",
    "Lakukan 20 'lunges' (10 per kaki).",
    "Tahan posisi plank selama 45 detik.",
    "Ikuti satu video peregangan seluruh tubuh (full body stretch) 5-10 menit.",
    "Lakukan lompat tali (atau lompat di tempat) selama 3 menit.",
    "Jogging di tempat dengan intensitas sedang selama 5 menit.",

    // --- Misi 'Apes' (Tidak Beruntung tapi Bermanfaat) ---
    "Rapikan folder 'Downloads' di komputermu selama 10 menit.",
    "Hapus 10 kontak tidak penting dari HP-mu.",
    "Review pengeluaranmu selama 3 hari terakhir.",
    "Matikan semua notifikasi media sosial selama 1 jam ke depan.",
    "Keluarkan semua isi dompetmu dan bersihkan dari struk-struk lama.",
    "Identifikasi satu kebiasaan buruk dan tulis satu cara spesifik untuk mengatasinya.",
    "Bayar satu tagihan atau urus satu administrasi yang sudah lama tertunda.",
    "Buat rencana kasar berisi 3 tugas penting yang harus diselesaikan minggu ini.",
    "Hapus 15 screenshot lama dari galeri HP-mu.",
    "Bersihkan sepasang sepatu yang paling sering kamu pakai.",
    "Kosongkan 'Recycle Bin' atau 'Trash' di komputermu dan HP-mu.",
    "Cuci semua piring kotor yang ada di wastafel sekarang juga.",
    "Pisahkan cucian kotor berdasarkan warna.",
  ];
  const selfRewards = [
    // --- Reward Ringan ---
    "Bikin secangkir teh/kopi spesial favoritmu",
    "Nonton 1 episode serial TV tanpa gangguan",
    "30 menit main game tanpa rasa bersalah",
    "Baca 1 bab buku fiksi untuk bersantai",
    "Dengarkan 1 album musik dari awal sampai akhir",
    "Mandi air hangat lebih lama dari biasanya",
    "Tidur siang selama 20 menit",
    "Telepon seorang teman untuk ngobrol santai",

    // --- Reward Sedang (Lebih Spesial & Tetap Hemat) ---
    "Jajan street food favoritmu",
    "Coba satu resep masakan atau kue baru yang simpel",
    "Nonton film di rumah dengan suasana bioskop (matikan lampu, siapkan cemilan)",
    "Beli satu item kecil pendukung hobimu (misal: stiker, alat tulis, senar gitar)",
    "Kunjungi taman kota atau ruang terbuka hijau terdekat",
    "Dedikasikan 1 jam penuh untuk 'me time' tanpa diganggu sama sekali",
    "Lakukan perawatan diri sederhana di rumah (contoh: masker wajah)",
    "Tata ulang playlist musikmu atau buat yang baru sesuai mood",
    "Download atau pinjam satu e-book gratis",
    "Cetak satu foto kenangan favoritmu dan pajang di kamar",
    "Kunjungi perpustakaan atau toko buku untuk mencari inspirasi",
    "Bersepeda atau jogging di rute yang berbeda dari biasanya",
    "Tata ulang tata letak perabotan di kamarmu",
    "Beli satu tanaman hias kecil untuk ditaruh di meja",
    "Mulai proyek declutter satu area kecil (seperti laci meja atau rak buku)",
    "Ikuti satu tutorial baru di YouTube yang berhubungan dengan hobimu",
    "Buat scrapbook digital sederhana dari 10 foto favoritmu",
  ];

  // --- FUNGSI HELPER UNTUK TANGGAL ---
  function getCurrentDate() {
    const simulatedDateString = localStorage.getItem("simulatedDate");
    if (simulatedDateString) {
      const parts = simulatedDateString.split("-");
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return new Date();
  }

  // --- FUNGsi-FUNGSI UTAMA ---
  function lockDaysBasedOnDate() {
    const startDateString = localStorage.getItem("challengeStartDate");

    if (!startDateString) {
      checkboxes.forEach((checkbox, index) => {
        checkbox.disabled = index !== 0;
        labels[index].classList.toggle("locked", index !== 0);
      });
      return;
    }

    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0);

    const today = getCurrentDate();
    today.setHours(0, 0, 0, 0);

    const diffTime = today - startDate;
    const currentChallengeDay =
      Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    checkboxes.forEach((checkbox, index) => {
      const dayNumber = index + 1;
      const isLocked = dayNumber !== currentChallengeDay;
      checkbox.disabled = isLocked;
      labels[index].classList.toggle("locked", isLocked);
    });
  }

  function updatePointsUI() {
    const currentPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    pointsDisplay.textContent = `Poin: ${currentPoints}`;
    if (currentPoints >= REWARD_COST) {
      claimRewardButton.disabled = false;
      claimRewardButton.textContent = `Gacha Self-Reward! (${REWARD_COST} Poin)`;
    } else {
      claimRewardButton.disabled = true;
      claimRewardButton.textContent = `Gacha Reward (Butuh ${REWARD_COST} Poin)`;
    }
  }

  function addPoints(amount) {
    let currentPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    currentPoints += amount;
    localStorage.setItem("userPoints", currentPoints);
    updatePointsUI();
  }

  function updateProgress() {
    const checkedDays = document.querySelectorAll(
      ".day-checkbox:checked"
    ).length;
    const percentage = Math.round((checkedDays / totalDays) * 100);
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Selesai`;
  }

  function saveProgress(event) {
    const startDate = localStorage.getItem("challengeStartDate");
    if (!startDate && event.target.id === "day-1" && event.target.checked) {
      localStorage.setItem(
        "challengeStartDate",
        getCurrentDate().toISOString()
      );
      lockDaysBasedOnDate();
    }

    const progress = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        progress.push(checkbox.id);
      }
    });
    localStorage.setItem("pmoChallengeProgress", JSON.stringify(progress));

    const missionPoints = localStorage.getItem("missionPoints")
      ? parseInt(localStorage.getItem("missionPoints"))
      : 0;
    const totalPoints = progress.length + missionPoints;
    localStorage.setItem("userPoints", totalPoints);

    updateProgress();
    updatePointsUI();
  }

  function loadProgress() {
    const savedProgress = JSON.parse(
      localStorage.getItem("pmoChallengeProgress")
    );
    if (savedProgress) {
      savedProgress.forEach((id) => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = true;
      });
    }
  }

  function gachaReward() {
    let currentPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    if (currentPoints >= REWARD_COST) {
      currentPoints -= REWARD_COST;
      localStorage.setItem("userPoints", currentPoints);
      const reward =
        selfRewards[Math.floor(Math.random() * selfRewards.length)];
      alert(
        `Selamat! Kamu mendapatkan self-reward:\n\n🎉 "${reward}" 🎉\n\nPoinmu telah dikurangi ${REWARD_COST}. Nikmati hadiahmu!`
      );
      updatePointsUI();
    }
  }

  function initializeGacha() {
    const today = getCurrentDate().toISOString().slice(0, 10);
    const lastGachaDate = localStorage.getItem("gachaDate");

    if (lastGachaDate !== today) {
      localStorage.setItem("gachaDate", today);
      localStorage.setItem("gachaRollsUsed", "0");
      localStorage.removeItem("lockedMission");
      localStorage.removeItem("lockedMissionIndex");
      localStorage.removeItem("lastRolledMission");
      localStorage.setItem("missionCompletedToday", "false");
      localStorage.setItem("missionPoints", "0");
    }
    updateGachaUI();
  }

  function updateGachaUI() {
    const rollsUsed = parseInt(localStorage.getItem("gachaRollsUsed")) || 0;
    const lockedMission = localStorage.getItem("lockedMission");
    const missionCompleted =
      localStorage.getItem("missionCompletedToday") === "true";
    const rollsLeft = MAX_ROLLS - rollsUsed;

    if (lockedMission) {
      missionTextElement.textContent = lockedMission;
      gachaButton.disabled = true;
      gachaButton.textContent = "Misi Terkunci!";
      completeMissionButton.disabled = missionCompleted;
    } else {
      const lastMission = localStorage.getItem("lastRolledMission");
      missionTextElement.textContent =
        rollsUsed > 0
          ? lastMission
          : "Klik tombol untuk mendapatkan misimu hari ini!";
      gachaButton.textContent = `Gacha Misi! (Sisa ${rollsLeft}x)`;
      gachaButton.disabled = rollsLeft <= 0;
      completeMissionButton.disabled = !lastMission || missionCompleted;
      if (rollsLeft <= 0) {
        gachaButton.textContent = "Kesempatan Habis!";
      }
    }
  }

  function rollGacha() {
    let rollsUsed = parseInt(localStorage.getItem("gachaRollsUsed")) || 0;
    if (rollsUsed < MAX_ROLLS) {
      rollsUsed++;
      localStorage.setItem("gachaRollsUsed", rollsUsed.toString());
      missionTextElement.classList.remove("rolling");
      void missionTextElement.offsetWidth;
      missionTextElement.classList.add("rolling");
      const completedIndices =
        JSON.parse(localStorage.getItem("completedMissionIndices")) || [];
      let availableMissions = missions
        .map((text, index) => ({ text, index }))
        .filter((mission) => !completedIndices.includes(mission.index));
      if (availableMissions.length === 0) {
        alert(
          "Hebat! Anda telah menyelesaikan semua variasi misi. Siklus direset kembali dari awal."
        );
        localStorage.setItem("completedMissionIndices", "[]");
        availableMissions = missions.map((text, index) => ({ text, index }));
      }
      const randomMission =
        availableMissions[Math.floor(Math.random() * availableMissions.length)];
      localStorage.setItem("lastRolledMission", randomMission.text);
      localStorage.setItem("lastRolledMissionIndex", randomMission.index);
      if (rollsUsed >= MAX_ROLLS) {
        localStorage.setItem("lockedMission", randomMission.text);
        localStorage.setItem("lockedMissionIndex", randomMission.index);
      }
      updateGachaUI();
    }
  }

  function completeMission() {
    if (localStorage.getItem("missionCompletedToday") !== "true") {
      localStorage.setItem("missionCompletedToday", "true");
      const lockedMissionIndex = parseInt(
        localStorage.getItem("lockedMissionIndex")
      );
      if (!isNaN(lockedMissionIndex)) {
        const completedIndices =
          JSON.parse(localStorage.getItem("completedMissionIndices")) || [];
        if (!completedIndices.includes(lockedMissionIndex)) {
          completedIndices.push(lockedMissionIndex);
          localStorage.setItem(
            "completedMissionIndices",
            JSON.stringify(completedIndices)
          );
        }
      }
      addPoints(1);
      localStorage.setItem("missionPoints", "1");
      alert("Kerja bagus! +1 Poin telah ditambahkan. 🚀");
      updateGachaUI();
    }
  }

  function resetAllProgress() {
    const isConfirmed = confirm(
      "Apakah Anda yakin ingin mereset semua progres? Ini akan menghapus semua centang, poin, dan progres misi Anda."
    );
    if (isConfirmed) {
      localStorage.removeItem("challengeStartDate");
      localStorage.removeItem("pmoChallengeProgress");
      localStorage.removeItem("userPoints");
      localStorage.removeItem("missionPoints");
      localStorage.removeItem("completedMissionIndices");
      localStorage.removeItem("gachaDate");
      localStorage.removeItem("gachaRollsUsed");
      localStorage.removeItem("lockedMission");
      localStorage.removeItem("lockedMissionIndex");
      localStorage.removeItem("lastRolledMission");
      localStorage.removeItem("missionCompletedToday");
      location.reload();
    }
  }

  // --- EVENT LISTENERS ---
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", saveProgress)
  );
  gachaButton.addEventListener("click", rollGacha);
  completeMissionButton.addEventListener("click", completeMission);
  claimRewardButton.addEventListener("click", gachaReward);
  resetButton.addEventListener("click", resetAllProgress);
  dateOverrideInput.addEventListener("change", (event) => {
    const newDate = event.target.value;
    if (newDate) {
      localStorage.setItem("simulatedDate", newDate);
    } else {
      localStorage.removeItem("simulatedDate");
    }
    location.reload();
  });

  // --- INITIAL LOAD ---
  function initializeApp() {
    const savedSimulatedDate = localStorage.getItem("simulatedDate");
    if (savedSimulatedDate) {
      dateOverrideInput.value = savedSimulatedDate;
    }
    loadProgress();
    updateProgress();
    initializeGacha();
    updatePointsUI();
    lockDaysBasedOnDate();
  }

  initializeApp();
});
