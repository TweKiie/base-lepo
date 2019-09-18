
exports.run = (client, message, level) => {
  
  
// Tosend = recup des guilds
      let tosend = [];
    client.guilds.forEach((guild, number) => {
      
        tosend.push(`• ${guild.name} :: ${guild.memberCount} membres`)
    })

// Les pages
      let pages = [];
    for (let i = 0; i < tosend.length;) {
        if ((i + (10)) > tosend.length) {
            pages.push(tosend.slice(i, (i + (10)) - ((i + (10)) - tosend.length)).join("\n"));
            break;
        } else {
            pages.push(tosend.slice(i, i + (10)).join("\n"));
            i += (10)
        };
    }
    let page = 1;
  
  // Contruction du message.
  

  let base = `= SERVEURLIST = 

${pages[page - 1]}

[Total :: ${client.guilds.size.toLocaleString()} Guilds]
[Page  :: ${page}/${pages.length}]
`
   message.channel.send(base, {code:"asciidoc"}).then(msg => {
        if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return;
     
     msg.react("⏪").then(r => { //:arrow_backward:
            msg.react("⏩") //:arrow_forward:

            const backF = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id; //:arrow_backward:
            const ForF = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id; //:arrow_forward:

            const back = msg.createReactionCollector(backF, {
                time: 180000
            });
            const For = msg.createReactionCollector(ForF, {
                time: 180000
            });
       
                   back.on('collect', async r => {
                r.remove(message.author.id)
                if (page === 1) return r.remove(message.author.id);
                page--;

                msg.edit(`= SERVEURLIST = 

${pages[page - 1]}

[Total :: ${client.guilds.size.toLocaleString()} Guilds]
[Page  :: ${page}/${pages.length}]
`,{code:"asciidoc"});
            });
            For.on('collect', async r => {
                r.remove(message.author.id)
                if (page === pages.length) return r.remove(message.author.id);
                page++;
 
                msg.edit(`= SERVEURLIST = 

${pages[page - 1]}

[Total :: ${client.guilds.size.toLocaleString()} Guilds]
[Page  :: ${page}/${pages.length}]
`,{code:"asciidoc"});
            });
        });
     
   })
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sl", "listserv"],
  permLevel: "Utilisateur"
};

exports.help = {
  name: "serveurliste",
  category: "Informations",
  description: "Liste des serveurs",
  usage: "serveurliste"
};

/*
const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
    });
    
const array = [];
      
*/