console.log("-----Daftar Antrian-----");

let antrian = [];
// Enqueue
function enqueue(nama, umur) {
  if (antrian.length >= 8) {
    console.log("--Maaf, antrian penuh. Silahkan Menunggu, Terimkasih.--");
    return;
  }
  if (umur < 15) {
    console.log("Maaf, umur di bawah 15 tahun tidak diizinkan untuk ikut antrian.");
    return;
  }
  antrian.push({nama, umur});
}

//Contoh Nama
enqueue("Aqmal", 22);
enqueue("Idris", 22);
enqueue("Zarkasih", 12); // Umur Dibawah 15
enqueue("Naufal", 35);
enqueue("Dinis", 25);
enqueue("Dani", 29);
enqueue("Habib", 37);
enqueue("Wahyu", 26);
enqueue("Rafi", 20); 
enqueue("Tarra", 24); // Tidak Dapat Antrian

// Dequeue
function dequeue() {
  if (antrian.length === 0) {
    console.log("Antrian kosong.");
    return;
  }
  const pelanggan = antrian.shift();
  console.log(`${pelanggan.nama} (${pelanggan.umur} tahun) telah dilayani.`);
}

// Antrian Kosong
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
dequeue();
