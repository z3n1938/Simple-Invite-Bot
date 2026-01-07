require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ]
});

const GUILD_ID = process.env.GUILD_ID;     // Davet gönderme için sunucu ID
const OWNER_ID = process.env.OWNER_ID;     // Sadece sen kullanabilesin

client.once('ready', () => {
  console.log(`Bot hazır! ${client.user.tag}`);
  console.log('Komutlar aktif: !davetgönder ve !sunucuyagir');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // ====================== !davetgönder KOMUTU ======================
  if (message.content.startsWith('!davetgönder')) {
    if (message.author.id !== OWNER_ID) {
      return message.reply('Bu komutu sadece bot sahibi kullanabilir!');
    }

    const args = message.content.split(' ').slice(1);

    if (args.length !== 3 || !args[0].startsWith('https://discord.gg/')) {
      return message.reply(
        '**Doğru kullanım:**\n' +
        '`!davetgönder <davet_linki> <gecikme_saniye> <rol_id>`\n\n' +
        '**Örnek:** `!davetgönder https://discord.gg/abc123 10 123456789012345678`'
      );
    }

    const inviteLink = args[0];
    const delaySec = parseInt(args[1]);
    const roleId = args[2];

    if (isNaN(delaySec) || delaySec < 5 || delaySec > 60) {
      return message.reply('Gecikme 5-60 saniye arasında olmalı!');
    }

    if (!/^\d{17,19}$/.test(roleId)) {
      return message.reply('Rol ID geçersiz!');
    }

    try {
      const guild = client.guilds.cache.get(GUILD_ID);
      if (!guild) return message.reply('Sunucu bulunamadı! GUILD_ID kontrol et.');

      const role = guild.roles.cache.get(roleId);
      if (!role) return message.reply('Rol bulunamadı!');

      await guild.members.fetch();

      const rawMembers = role.members.filter(m => !m.user.bot);

      if (rawMembers.size === 0) {
        return message.reply('Bu rolde hiç gerçek üye yok.');
      }

      // Tekrar göndermeyi önle
      const alreadySent = new Set();
      const membersToSend = [];
      rawMembers.forEach(member => {
        if (!alreadySent.has(member.user.id)) {
          alreadySent.add(member.user.id);
          membersToSend.push(member);
        }
      });

      const startMsg = await message.reply(
        `Davet gönderme başladı...\n` +
        `Rol: ${role.name} (${membersToSend.length} benzersiz üye)\n` +
        `Rapor sana DM ile gelecek.`
      );

      let successCount = 0;
      let failCount = 0;
      const failedUsers = [];

      for (const [index, member] of membersToSend.entries()) {
        try {
          await member.user.send(
            `Merhaba ${member.displayName}! 👋\n\n` +
            `Sunucumuza özel davet linkin:\n**${inviteLink}**\n\n` +
            `Hemen katıl, seni bekliyoruz! 🎉`
          );
          successCount++;
          console.log(`${index+1}. Gönderildi → ${member.user.tag}`);
        } catch (error) {
          failCount++;
          failedUsers.push(`• ${member.user.tag}`);
          console.log(`${index+1}. Başarısız → ${member.user.tag}`);
        }

        if (index < membersToSend.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delaySec * 1000));
        }
      }

      // Sana özelden rapor
      try {
        const owner = await client.users.fetch(OWNER_ID);
        await owner.send(
          `✅ **Davet Gönderme Raporu**\n\n` +
          `Link: ${inviteLink}\n` +
          `Hedef Rol: ${role.name} (<@&${roleId}>)\n` +
          `Toplam Hedef: ${membersToSend.length} üye\n\n` +
          `✔️ Başarılı: ${successCount}\n` +
          `❌ Başarısız: ${failCount}\n\n` +
          (failCount > 0 ? `**Başarısız olanlar:**\n${failedUsers.join('\n')}` : 'Herkese ulaşıldı! 🎉')
        );
      } catch (e) {
        console.error('Ownera DM atılamadı:', e);
      }

      startMsg.edit(`✅ Gönderme tamamlandı! (${successCount}/${membersToSend.length}) Rapor DM'nde.`);

    } catch (error) {
      console.error(error);
      message.reply('Hata oluştu! Konsola bak.');
    }
  }

  // ====================== !sunucuyagir KOMUTU ======================
  if (message.content.startsWith('!sunucuyagir')) {
    if (message.author.id !== OWNER_ID) {
      return message.reply('Bu komutu sadece bot sahibi kullanabilir!');
    }

    const args = message.content.split(' ').slice(1);
    if (args.length !== 1 || !args[0].startsWith('https://discord.gg/')) {
      return message.reply(
        '**Doğru kullanım:**\n' +
        '`!sunucuyagir <davet_linki>`\n\n' +
        '**Örnek:** `!sunucuyagir https://discord.gg/abc123`'
      );
    }

    const inviteLink = args[0];
    const inviteCode = inviteLink.split('/').pop();

    message.reply(`Sunucuya katılmaya çalışıyorum...\nLink: ${inviteLink}`);

    try {
      const invite = await client.fetchInvite(inviteCode);
      await invite.accept();

      try {
        const owner = await client.users.fetch(OWNER_ID);
        await owner.send(
          `✅ **Sunucuya başarıyla katıldım!**\n\n` +
          `Sunucu: **${invite.guild.name}**\n` +
          `Üye Sayısı: ${invite.guild.memberCount || 'Bilinmiyor'}\n` +
          `Davet: ${inviteLink}`
        );
      } catch (e) {}

      message.reply(`✅ Katıldım: **${invite.guild.name}**`);

    } catch (error) {
      console.error('Katılma hatası:', error);

      let errorMsg = 'Bilinmeyen hata.';
      if (error.message.includes('Unknown Invite')) errorMsg = 'Davet geçersiz veya süresi dolmuş.';
      if (error.message.includes('Max Guilds')) errorMsg = 'Bot 100 sunucu limitine ulaştı.';
      if (error.message.includes('Banned')) errorMsg = 'Bot bu sunucudan banlı.';
      if (error.message.includes('Missing Access')) errorMsg = 'Davete erişim yok.';

      try {
        const owner = await client.users.fetch(OWNER_ID);
        await owner.send(`❌ **Katılamadım!**\nLink: ${inviteLink}\nHata: ${errorMsg}`);
      } catch (e) {}

      message.reply(`❌ Katılma başarısız: ${errorMsg}`);
    }
  }
});

client.login(process.env.TOKEN);