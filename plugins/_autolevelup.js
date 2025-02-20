let handler = m => m
let levelling = require('../lib/levelling')
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup) return
    if (m.sender === global.conn.user.jid) return
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let str = `
╭───◪ 〔 𝗟 𝗘 𝗩 𝗘 𝗟   𝗨 𝗣 〕
┃⬡ Name : @${m.sender.split`@`[0]}
┃⬡ Level : *${before}* ➳ *${user.level}*
╰────────⬣
⬣ Terus berinteraksi dengan bot 
⬣ supaya naik level selanjutnya...
╭─────────────────
│𝗡𝗢𝗧𝗘: 𝗚𝗼𝘂𝗿𝗮𝘃 𝘽𝙊𝙏
│➥
╰──────────────────
`.trim()
        conn.send2Button(m.chat, str, footer, 'PROFILE', '#profile', 'MENU', '#menu', false, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
    }
    return true
}
 
module.exports = handler
