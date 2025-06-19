# Menggunakan image dasar Node.js versi 20
FROM node:20

# Menentukan direktori kerja di dalam container
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin semua file aplikasi ke dalam direktori kerja
COPY . .

ARG VITE_BACKEND

# Mengatur variabel lingkungan dengan mendukung override dari environment
ENV VITE_BACKEND=http://34.126.178.89:9000

# Build aplikasi setelah environment variables di-set
RUN npm run build

# Menentukan port yang akan diexpose menggunakan variabel PORT
EXPOSE 4000

# Menjalankan aplikasi
CMD ["npm", "start"]