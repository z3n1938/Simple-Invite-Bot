content = """# 🚀 Invite Gönder Botu

Belirli bir role otomatik olarak davet linki gönderen Discord botu.
Discord.js v14 ile geliştirilmiştir.

===============================
GENEL ÖZELLİKLER
===============================
- Özel davet linki gönderme
- Rol bazlı DM gönderimi
- Mesajlar arası gecikme (saniye)
- Tek komut sistemi
- Hafif ve sade yapı

===============================
KOMUT KULLANIMI
===============================

Komut Formatı:
!davetgönder <davet_linki> <gecikme_saniye> <rol_id>

Örnek:
!davetgönder https://discord.gg/uV7GMSm3 5 1456748661374455982

Açıklama:
- davet_linki: Gönderilecek Discord davet linki
- gecikme_saniye: Her mesaj arası bekleme süresi (saniye)
- rol_id: Davetin gönderileceği rolün ID'si

===============================
BOT NASIL ÇALIŞIR
===============================
- Belirtilen roldeki üyeleri alır
- Her üyeye DM üzerinden davet linki gönderir
- Mesajlar arasında belirtilen süre kadar bekler
- DM kapalı olan kullanıcıları otomatik geçer
- İşlem sonunda bilgilendirme mesajı verir

===============================
UYARI
===============================
Çok düşük gecikme süreleri spam olarak algılanabilir.
Önerilen minimum gecikme: 3-5 saniye

===============================
KURULUM
===============================
1) npm install
2) .env dosyası oluştur
TOKEN=bot_tokenin_buraya
PREFIX=!

3) node index.js

===============================
LİSANS
===============================
MIT License
Özgürce kullanabilir, değiştirebilir ve paylaşabilirsin.

Made with ❤️ by z3n1938
"""
