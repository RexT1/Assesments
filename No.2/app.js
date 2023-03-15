class Queue {
  constructor() {
    this.queue = [];
    this.maxQueueSize = 8;
  }

  enqueue(data) {
    if (this.queue.length < this.maxQueueSize) {
      if (data.umur < 15) {
        document.getElementById('message').innerHTML = "Umur dibawah 15 tahun tidak dibolehkan untuk ikut antrian";
        return;
      }
      this.queue.push(data);
      document.getElementById('queue-list').innerHTML = "";
      this.queue.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${data.nama} (${data.umur} tahun)`;
        document.getElementById('queue-list').appendChild(listItem);
      });
      document.getElementById('message').innerHTML = "";
    } else {
      document.getElementById('message').innerHTML = "Antrian sudah penuh";
    }
  }

  dequeue() {
    if (this.queue.length > 0) {
      this.queue.shift();
      document.getElementById('queue-list').innerHTML = "";
      this.queue.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${data.nama} (${data.umur} tahun)`;
        document.getElementById('queue-list').appendChild(listItem);
      });
    }
  }
}

const queue = new Queue();

document.getElementById('add').addEventListener('click', () => {
  const nama = document.getElementById('name').value.trim();
  const umur = parseInt(document.getElementById('age').value);
  if (nama && umur) {
    queue.enqueue({ nama, umur });
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
  } else {
    document.getElementById('message').innerHTML = "Nama dan umur harus diisi";
  }
});

document.getElementById('remove').addEventListener('click', () => {
  queue.dequeue();
});

