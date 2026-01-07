content = """# 🚀 Invite Gönder Botu

**Modern, sade ve tek amaçlı Discord davet gönderme botu**
Discord.js v14 ile geliştirilmiştir. Belirli bir role, belirlenen gecikme süresiyle otomatik olarak davet linki gönderir.

![Discord.js] Discord.js v14
![Node.js] Node.js >= 18
![License] MIT

------------------------------------------------------------

## ✨ Genel Özellikler

- 🔗 **Davet Linki Gönderme**
- 👥 **Rol Bazlı Üye Seçimi**
- ⏱ **Gecikmeli Gönderim (Anti-Spam)**
- 📩 **Özel Mesaj (DM) ile Gönderim**
- ⚙️ **Tek Komutla Kullanım**
- ⚡ **Hafif ve Stabil Yapı**
- 🧩 **Kolay Özelleştirilebilir**

------------------------------------------------------------

## 📤 Davet Gönderme Sistemi

- Belirtilen davet linkini kullanır
- Belirtilen roldeki üyelere gönderir
- Her mesaj arasında ayarlanabilir gecikme uygular
- DM kapalı olan kullanıcıları otomatik atlar
- İşlem sonunda bilgilendirme mesajı verir

------------------------------------------------------------

## 🛠 Komut Sistemi

### Komut Formatı
!davetgönder <davet_linki> <gecikme_saniye> <rol_id>

### Örnek Kullanım
!davetgönder https://discord.gg/uV7GMSm3 5 1456748661374455982

### Parametreler
- davet_linki      : Gönderilecek Discord davet linki
- gecikme_saniye   : Her kullanıcıya mesaj gönderme aralığı (saniye)
- rol_id           : Davetin gönderileceği rolün ID'si

------------------------------------------------------------

## 🛠 Komut Yapısı (Örnek)

module.exports = {
  name: \"davetgönder\",
  execute(client, message, args) {
    // davet gönderme kodları
  }
};

------------------------------------------------------------

## 📦 Kurulum

### 1️⃣ Repo’yu klonla
git clone https://github.com/KULLANICIADIN/Invite-Gonder-Botu.git
cd Invite-Gonder-Botu

### 2️⃣ Gerekli paketleri yükle
npm install

### 3️⃣ .env dosyasını oluştur
TOKEN=bot_tokenin_buraya
PREFIX=!

### 4️⃣ Botu başlat
node index.js

------------------------------------------------------------

## 🔐 Gerekli Yetkiler

- View Channels
- Send Messages
- Create Instant Invite

------------------------------------------------------------

## ⚠️ Uyarı

Çok düşük gecikme süreleri Discord tarafından spam olarak algılanabilir.
Önerilen minimum gecikme süresi: **3–5 saniye**

------------------------------------------------------------

## 📄 Lisans

Bu proje MIT License ile lisanslanmıştır.
Özgürce kullanabilir, değiştirebilir ve paylaşabilirsin.

Made with ❤️ by z3n1938
"""
