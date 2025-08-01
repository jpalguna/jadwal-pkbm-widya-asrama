document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const btn = dropdown.querySelector(".dropdown-btn");
  const list = dropdown.querySelector(".dropdown-content");
  const arrow = dropdown.querySelector(".arrow");
  const selectedText = dropdown.querySelector(".selected-text"); // ✅ sudah pakai class!

  btn.addEventListener("click", () => {
    list.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });

  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      selectedText.innerText = item.innerText;
      list.classList.remove("active");
      arrow.classList.remove("rotate");

      // Tambahan filter logic
      if (dropdown.id === "dropdownHari") {
        filters.hari = item.innerText;
      } else if (dropdown.id === "dropdownKelas") {
        filters.kelas = item.innerText;
      } else if (dropdown.id === "dropdownTutor") {
        filters.tutor = item.innerText.trim();
      }

      // Tampilkan hasil filter
      tampilkanKartu(filterData());
    });
  });

  // Menutup dropdown jika klik di luar
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      list.classList.remove("active");
      arrow.classList.remove("rotate");
    }
  });
});

// fetch("data.json")
//   .then((response) => response.json())
//   .then((dataArray) => {
//     const container = document.getElementById("card-container");

//     dataArray.forEach((data) => {
//       const card = document.createElement("div");
//       card.className = "card";
//       card.innerHTML = `
//         <h3>${data.mapel}</h3>
//         <div class="card-items">
//         <img src="icon/icon-hari.svg"/>
//         <p>${data.hari}</p>
//         </div>
//         <div class="card-items">
//         <img src="icon/icon-kelas.svg"/>
//         <p>${data.kelas}</p>
//         </div>
//         <div class="card-items">
//         <img src="icon/icon-guru.svg"/>
//         <p>${data.tutor}</p>
//         </div>
//         <div class="card-items">
//         <img src="icon/icon-jam.svg"/>
//         <p>${data.waktu}</p>
//         </div>
//       `;
//       container.appendChild(card);
//     });
//   })
//   .catch((error) => {
//     console.error("Gagal memuat data:", error);
//   });

// Ambil data dari file JSON
fetch("data.json")
  .then((response) => response.json())
  .then((dataArray) => {
    semuaData = dataArray; // Simpan ke variabel global
    tampilkanKartu(semuaData); // Tampilkan awal
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
  });

let semuaData = []; // ⬅️ Menyimpan semua data dari JSON
const filters = {
  hari: null,
  kelas: null,
  tutor: null,
};

// Menampilkan kartu berdasarkan data hasil filter
function tampilkanKartu(dataArray) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  if (dataArray.length === 0) {
    container.innerHTML = "<p>Tidak ada data ditemukan.</p>";
    return;
  }

  dataArray.forEach((data) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${data.mapel}</h3>
      <div class="card-items">
        <img src="icon/icon-hari.svg"/> 
        <p>${data.hari}</p>
      </div>
      <div class="card-items">
        <img src="icon/icon-kelas.svg"/> 
        <p>${data.kelas}</p>
      </div>
      <div class="card-items">
        <img src="icon/icon-guru.svg"/> 
        <p>${data.tutor}</p>
      </div>
      <div class="card-items">
        <img src="icon/icon-jam.svg"/> 
        <p>${data.waktu}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Fungsi untuk filter data berdasarkan filters yang aktif
function filterData() {
  return semuaData.filter((data) => {
    const cocokHari = !filters.hari || data.hari === filters.hari;
    const cocokKelas = !filters.kelas || data.kelas === filters.kelas;
    const cocokTutor = !filters.tutor || data.tutor === filters.tutor;
    return cocokHari && cocokKelas && cocokTutor;
  });

  const cocokTutor =
    !filters.tutor ||
    data.tutor.trim().toLowerCase() === filters.tutor.trim().toLowerCase();
}
